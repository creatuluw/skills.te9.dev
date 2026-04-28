#!/usr/bin/env python3
"""
analyze-coverage.py - Analyze domain knowledge coverage in a skill directory.

This script scans all markdown files in a skill directory and produces a
structured report on the completeness of domain knowledge coverage. It
identifies gaps and provides actionable recommendations.

Usage:
    python analyze-coverage.py --skill-path /path/to/skill
    python analyze-coverage.py --skill-path /path/to/skill --output-format text
    python analyze-coverage.py --skill-path /path/to/skill --output-format json

Exit Codes:
    0 - Success
    1 - Error (invalid arguments, missing path, etc.)

Dependencies:
    Python 3.6+ (stdlib only)
"""

import argparse
import json
import os
import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Expected directories in a well-structured skill
EXPECTED_DIRS = {
    "product",
    "methods",
    "design",
    "conventions",
    "scripts",
    "sources",
    "assets",
}

# Patterns used for heuristic content detection
METHOD_PATTERNS = [
    re.compile(r"^#{1,3}\s+.*method", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*approach", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*technique", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*procedure", re.IGNORECASE | re.MULTILINE),
    re.compile(r"##\s+methodology", re.IGNORECASE | re.MULTILINE),
]

PRINCIPLE_PATTERNS = [
    re.compile(r"^#{1,3}\s+.*principle", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*guideline", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*rule", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*tenet", re.IGNORECASE | re.MULTILINE),
]

CONVENTION_PATTERNS = [
    re.compile(r"^#{1,3}\s+.*convention", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*standard", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*style", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*naming", re.IGNORECASE | re.MULTILINE),
]

PATTERN_PATTERNS = [
    re.compile(r"^#{1,3}\s+.*pattern", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*anti-pattern", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*idiom", re.IGNORECASE | re.MULTILINE),
]

GOTCHA_PATTERNS = [
    re.compile(r"^#{1,3}\s+.*gotcha", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*pitfall", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*common mistake", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*trap", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*warning", re.IGNORECASE | re.MULTILINE),
    re.compile(r"caution[:\s]", re.IGNORECASE),
    re.compile(r"danger[:\s]", re.IGNORECASE),
    re.compile(r"beware[:\s]", re.IGNORECASE),
]

GOOD_EXAMPLE_PATTERNS = [
    re.compile(r"good\s+example", re.IGNORECASE),
    re.compile(r"✓", re.MULTILINE),
    re.compile(r"correct\s+(approach|way|usage|pattern)", re.IGNORECASE),
    re.compile(r"recommended", re.IGNORECASE),
    re.compile(r"best\s+practice", re.IGNORECASE),
    re.compile(r"do:", re.IGNORECASE),
]

BAD_EXAMPLE_PATTERNS = [
    re.compile(r"bad\s+example", re.IGNORECASE),
    re.compile(r"✗", re.MULTILINE),
    re.compile(r"incorrect\s+(approach|way|usage|pattern)", re.IGNORECASE),
    re.compile(r"anti-?pattern", re.IGNORECASE),
    re.compile(r"avoid", re.IGNORECASE),
    re.compile(r"don't:", re.IGNORECASE),
    re.compile(r"do not:", re.IGNORECASE),
]

RATIONALE_PATTERNS = [
    re.compile(r"(why|reason|rationale|because|since|explain)", re.IGNORECASE),
    re.compile(r"^#{1,3}\s+.*why", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*rationale", re.IGNORECASE | re.MULTILINE),
    re.compile(r"^#{1,3}\s+.*motivation", re.IGNORECASE | re.MULTILINE),
]


# ---------------------------------------------------------------------------
# Helper Functions
# ---------------------------------------------------------------------------


def find_markdown_files(skill_path: Path) -> List[Path]:
    """Find all markdown files in the skill directory."""
    md_files = []
    for root, _, files in os.walk(skill_path):
        for f in files:
            if f.lower().endswith(".md"):
                md_files.append(Path(root) / f)
    return sorted(md_files)


def read_file_content(filepath: Path) -> Optional[str]:
    """Read file content with error handling."""
    try:
        with open(filepath, "r", encoding="utf-8", errors="replace") as f:
            return f.read()
    except (IOError, OSError) as e:
        print(f"Warning: Could not read {filepath}: {e}", file=sys.stderr)
        return None


def count_pattern_matches(content: str, patterns: List[re.Pattern]) -> int:
    """Count the number of unique matches for a set of patterns."""
    count = 0
    for pattern in patterns:
        matches = pattern.findall(content)
        count += len(matches)
    return count


def has_pattern_match(content: str, patterns: List[re.Pattern]) -> bool:
    """Check if any pattern matches."""
    return any(pattern.search(content) for pattern in patterns)


def extract_headings(content: str) -> List[Tuple[int, str]]:
    """Extract headings from markdown content. Returns list of (level, text)."""
    headings = []
    for match in re.finditer(r"^(#{1,6})\s+(.+)$", content, re.MULTILINE):
        level = len(match.group(1))
        text = match.group(2).strip()
        headings.append((level, text))
    return headings


def count_sections_with_pattern(
    content: str, section_patterns: List[re.Pattern]
) -> int:
    """Count distinct sections that match any of the given patterns."""
    headings = extract_headings(content)
    count = 0
    for _, text in headings:
        for pattern in section_patterns:
            # Check if the heading text matches (without the ^ anchor)
            if re.search(pattern.pattern.replace("^", ""), text, pattern.flags):
                count += 1
                break
    return count


# ---------------------------------------------------------------------------
# Analysis Functions
# ---------------------------------------------------------------------------


def analyze_file_counts(skill_path: Path) -> Dict:
    """Analyze file counts by directory."""
    file_counts = {
        "root": {"count": 0, "files": []},
        "total_files": 0,
        "total_md_files": 0,
        "directories": {},
    }

    # Count root-level files
    for item in skill_path.iterdir():
        if item.is_file():
            file_counts["root"]["count"] += 1
            file_counts["root"]["files"].append(item.name)
            file_counts["total_files"] += 1
            if item.suffix.lower() == ".md":
                file_counts["total_md_files"] += 1

    # Count files in each expected directory
    for dir_name in EXPECTED_DIRS:
        dir_path = skill_path / dir_name
        dir_info = {"exists": dir_path.exists(), "count": 0, "files": [], "md_count": 0}

        if dir_path.exists() and dir_path.is_dir():
            for item in dir_path.iterdir():
                if item.is_file():
                    dir_info["count"] += 1
                    dir_info["files"].append(item.name)
                    file_counts["total_files"] += 1
                    if item.suffix.lower() == ".md":
                        dir_info["md_count"] += 1
                        file_counts["total_md_files"] += 1

        file_counts["directories"][dir_name] = dir_info

    return file_counts


def analyze_content(skill_path: Path, md_files: List[Path]) -> Dict:
    """Analyze content across all markdown files."""
    analysis = {
        "methods_documented": 0,
        "principles_listed": 0,
        "conventions_defined": 0,
        "patterns_catalogued": 0,
        "gotchas_identified": 0,
        "good_example_count": 0,
        "bad_example_count": 0,
        "good_bad_pairs": 0,
        "principles_with_rationale": 0,
        "files_with_examples": 0,
        "files_with_rationale": 0,
        "per_file": {},
        "total_lines": 0,
        "total_words": 0,
    }

    for filepath in md_files:
        content = read_file_content(filepath)
        if content is None:
            continue

        rel_path = filepath.relative_to(skill_path)
        lines = content.split("\n")
        words = content.split()

        file_analysis = {
            "lines": len(lines),
            "words": len(words),
            "methods": count_sections_with_pattern(content, METHOD_PATTERNS),
            "principles": count_sections_with_pattern(content, PRINCIPLE_PATTERNS),
            "conventions": count_sections_with_pattern(content, CONVENTION_PATTERNS),
            "patterns": count_sections_with_pattern(content, PATTERN_PATTERNS),
            "gotchas": count_sections_with_pattern(content, GOTCHA_PATTERNS),
            "has_good_examples": has_pattern_match(content, GOOD_EXAMPLE_PATTERNS),
            "has_bad_examples": has_pattern_match(content, BAD_EXAMPLE_PATTERNS),
            "has_rationale": has_pattern_match(content, RATIONALE_PATTERNS),
        }

        analysis["per_file"][str(rel_path)] = file_analysis
        analysis["total_lines"] += file_analysis["lines"]
        analysis["total_words"] += file_analysis["words"]

        # Aggregate counts
        analysis["methods_documented"] += file_analysis["methods"]
        analysis["principles_listed"] += file_analysis["principles"]
        analysis["conventions_defined"] += file_analysis["conventions"]
        analysis["patterns_catalogued"] += file_analysis["patterns"]
        analysis["gotchas_identified"] += file_analysis["gotchas"]

        if file_analysis["has_good_examples"]:
            analysis["good_example_count"] += 1
            analysis["files_with_examples"] += 1
        if file_analysis["has_bad_examples"]:
            analysis["bad_example_count"] += 1
        if file_analysis["has_good_examples"] and file_analysis["has_bad_examples"]:
            analysis["good_bad_pairs"] += 1
        if file_analysis["has_rationale"]:
            analysis["files_with_rationale"] += 1
            if file_analysis["principles"] > 0:
                analysis["principles_with_rationale"] += file_analysis["principles"]

    return analysis


def identify_gaps(
    file_counts: Dict, content_analysis: Dict, skill_path: Path
) -> List[Dict]:
    """Identify gaps in the skill's coverage."""
    gaps = []

    # Check for missing directories
    for dir_name, dir_info in file_counts.get("directories", {}).items():
        if not dir_info["exists"]:
            gaps.append(
                {
                    "type": "missing_directory",
                    "severity": "medium",
                    "location": dir_name,
                    "description": f"Directory '{dir_name}/' does not exist.",
                    "recommendation": f"Create the '{dir_name}/' directory with relevant content.",
                }
            )
        elif dir_info["count"] == 0:
            gaps.append(
                {
                    "type": "empty_directory",
                    "severity": "medium",
                    "location": dir_name,
                    "description": f"Directory '{dir_name}/' exists but is empty.",
                    "recommendation": f"Add content files to '{dir_name}/' directory.",
                }
            )
        elif dir_info["md_count"] == 0 and dir_name in [
            "methods",
            "conventions",
            "design",
        ]:
            gaps.append(
                {
                    "type": "no_documentation",
                    "severity": "medium",
                    "location": dir_name,
                    "description": f"Directory '{dir_name}/' has no markdown documentation files.",
                    "recommendation": f"Add .md files documenting {dir_name} to the '{dir_name}/' directory.",
                }
            )

    # Check for missing SKILL.md
    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        gaps.append(
            {
                "type": "missing_file",
                "severity": "high",
                "location": "SKILL.md",
                "description": "Required file 'SKILL.md' is missing.",
                "recommendation": "Create SKILL.md with proper YAML frontmatter and skill documentation.",
            }
        )

    # Check for methods without examples
    for file_path, file_data in content_analysis.get("per_file", {}).items():
        if file_data["methods"] > 0 and not file_data["has_good_examples"]:
            gaps.append(
                {
                    "type": "methods_without_examples",
                    "severity": "medium",
                    "location": file_path,
                    "description": f"Methods documented but no good examples found.",
                    "recommendation": "Add 'Good Example' sections to demonstrate proper method usage.",
                }
            )
        if file_data["methods"] > 0 and not file_data["has_bad_examples"]:
            gaps.append(
                {
                    "type": "methods_without_bad_examples",
                    "severity": "low",
                    "location": file_path,
                    "description": f"Methods documented but no bad examples/anti-patterns found.",
                    "recommendation": "Add 'Bad Example' sections to highlight common mistakes.",
                }
            )

    # Check for principles without rationale
    for file_path, file_data in content_analysis.get("per_file", {}).items():
        if file_data["principles"] > 0 and not file_data["has_rationale"]:
            gaps.append(
                {
                    "type": "principles_without_rationale",
                    "severity": "low",
                    "location": file_path,
                    "description": f"Principles listed but no rationale/justification found.",
                    "recommendation": "Add 'Why' or 'Rationale' sections to explain the reasoning behind principles.",
                }
            )

    # Overall content gaps
    if content_analysis["methods_documented"] == 0:
        gaps.append(
            {
                "type": "no_methods",
                "severity": "high",
                "location": "methods/",
                "description": "No methods or approaches documented.",
                "recommendation": "Document at least 3-5 core methods or approaches in the methods/ directory.",
            }
        )

    if content_analysis["principles_listed"] == 0:
        gaps.append(
            {
                "type": "no_principles",
                "severity": "medium",
                "location": "conventions/",
                "description": "No principles or guidelines documented.",
                "recommendation": "Document core principles and guidelines in the conventions/ directory.",
            }
        )

    if content_analysis["good_bad_pairs"] == 0:
        gaps.append(
            {
                "type": "no_examples",
                "severity": "medium",
                "location": "methods/",
                "description": "No good/bad example pairs found.",
                "recommendation": "Add paired good and bad examples to demonstrate correct vs incorrect approaches.",
            }
        )

    return gaps


def calculate_coverage_score(file_counts: Dict, content_analysis: Dict) -> Dict:
    """Calculate an overall coverage score (0-100)."""
    score = 0
    max_score = 100
    details = {}

    # --- Structure (30 points) ---
    structure_score = 0

    # SKILL.md exists (5 points)
    skill_md_exists = file_counts.get("root", {}).get(
        "count", 0
    ) > 0 and "SKILL.md" in file_counts.get("root", {}).get("files", [])
    if skill_md_exists:
        structure_score += 5
    details["skill_md_exists"] = skill_md_exists

    # Key directories exist and have content (25 points, ~4 each)
    key_dirs = ["methods", "conventions", "design"]
    for dir_name in key_dirs:
        dir_info = file_counts.get("directories", {}).get(dir_name, {})
        if dir_info.get("exists") and dir_info.get("md_count", 0) > 0:
            structure_score += 4
        elif dir_info.get("exists"):
            structure_score += 1
        details[f"{dir_name}_dir_score"] = structure_score

    # Other directories (bonus)
    other_dirs = ["product", "scripts", "sources", "assets"]
    other_score = 0
    for dir_name in other_dirs:
        dir_info = file_counts.get("directories", {}).get(dir_name, {})
        if dir_info.get("exists") and dir_info.get("count", 0) > 0:
            other_score += 2
        elif dir_info.get("exists"):
            other_score += 1
    structure_score += min(other_score, 13)  # Cap bonus

    score += min(structure_score, 30)
    details["structure_score"] = min(structure_score, 30)

    # --- Content Depth (40 points) ---
    content_score = 0

    # Methods documented (15 points)
    methods = content_analysis.get("methods_documented", 0)
    if methods >= 5:
        content_score += 15
    elif methods >= 3:
        content_score += 10
    elif methods >= 1:
        content_score += 5
    details["methods_score"] = min(15, methods * 3)

    # Principles documented (10 points)
    principles = content_analysis.get("principles_listed", 0)
    if principles >= 3:
        content_score += 10
    elif principles >= 1:
        content_score += 5
    details["principles_score"] = min(10, principles * 3)

    # Conventions documented (5 points)
    conventions = content_analysis.get("conventions_defined", 0)
    if conventions >= 2:
        content_score += 5
    elif conventions >= 1:
        content_score += 3
    details["conventions_score"] = min(5, conventions * 2)

    # Gotchas identified (5 points)
    gotchas = content_analysis.get("gotchas_identified", 0)
    if gotchas >= 2:
        content_score += 5
    elif gotchas >= 1:
        content_score += 3
    details["gotchas_score"] = min(5, gotchas * 2)

    # Patterns catalogued (5 points)
    patterns = content_analysis.get("patterns_catalogued", 0)
    if patterns >= 2:
        content_score += 5
    elif patterns >= 1:
        content_score += 3
    details["patterns_score"] = min(5, patterns * 2)

    score += min(content_score, 40)
    details["content_score"] = min(content_score, 40)

    # --- Examples & Quality (30 points) ---
    quality_score = 0

    # Good/bad example pairs (15 points)
    pairs = content_analysis.get("good_bad_pairs", 0)
    if pairs >= 3:
        quality_score += 15
    elif pairs >= 2:
        quality_score += 10
    elif pairs >= 1:
        quality_score += 5
    details["example_pairs_score"] = min(15, pairs * 5)

    # Files with rationale (10 points)
    files_with_rationale = content_analysis.get("files_with_rationale", 0)
    total_files = len(content_analysis.get("per_file", {}))
    if total_files > 0:
        rationale_ratio = files_with_rationale / total_files
        quality_score += int(rationale_ratio * 10)
    details["rationale_score"] = min(10, files_with_rationale * 2)

    # Content volume (5 points)
    total_lines = content_analysis.get("total_lines", 0)
    if total_lines >= 500:
        quality_score += 5
    elif total_lines >= 200:
        quality_score += 3
    elif total_lines >= 50:
        quality_score += 1
    details["volume_score"] = min(5, total_lines // 100)

    score += min(quality_score, 30)
    details["quality_score"] = min(quality_score, 30)

    # Final score
    final_score = min(score, max_score)

    # Determine grade
    if final_score >= 90:
        grade = "A"
    elif final_score >= 80:
        grade = "B"
    elif final_score >= 70:
        grade = "C"
    elif final_score >= 60:
        grade = "D"
    else:
        grade = "F"

    return {
        "score": final_score,
        "max_score": max_score,
        "grade": grade,
        "details": details,
    }


def generate_recommendations(
    coverage_score: Dict, gaps: List[Dict], content_analysis: Dict
) -> List[str]:
    """Generate prioritized recommendations based on analysis."""
    recommendations = []

    # Sort gaps by severity
    severity_order = {"high": 0, "medium": 1, "low": 2}
    sorted_gaps = sorted(
        gaps, key=lambda g: severity_order.get(g.get("severity", "low"), 2)
    )

    # High severity recommendations
    high_gaps = [g for g in sorted_gaps if g.get("severity") == "high"]
    if high_gaps:
        recommendations.append("## High Priority")
        for gap in high_gaps[:3]:
            recommendations.append(f"- **{gap['location']}**: {gap['recommendation']}")

    # Medium severity recommendations
    medium_gaps = [g for g in sorted_gaps if g.get("severity") == "medium"]
    if medium_gaps:
        recommendations.append("## Medium Priority")
        for gap in medium_gaps[:5]:
            recommendations.append(f"- **{gap['location']}**: {gap['recommendation']}")

    # Low severity recommendations
    low_gaps = [g for g in sorted_gaps if g.get("severity") == "low"]
    if low_gaps:
        recommendations.append("## Low Priority")
        for gap in low_gaps[:3]:
            recommendations.append(f"- **{gap['location']}**: {gap['recommendation']}")

    # Content-specific recommendations
    methods = content_analysis.get("methods_documented", 0)
    if methods < 3:
        recommendations.append("\n## Content Suggestions")
        recommendations.append(
            "- Document at least 3-5 core methods with step-by-step instructions."
        )

    pairs = content_analysis.get("good_bad_pairs", 0)
    if pairs < 2:
        recommendations.append(
            "- Add paired good/bad examples for each major method or pattern."
        )

    total_lines = content_analysis.get("total_lines", 0)
    if total_lines < 200:
        recommendations.append(
            "- Expand documentation to provide more depth and context (aim for 200+ lines)."
        )

    if not recommendations:
        recommendations.append(
            "No major issues found. Consider adding more depth to existing content."
        )

    return recommendations


# ---------------------------------------------------------------------------
# Report Generation
# ---------------------------------------------------------------------------


def generate_json_report(
    file_counts: Dict,
    content_analysis: Dict,
    coverage_score: Dict,
    gaps: List[Dict],
    recommendations: List[str],
    skill_path: Path,
) -> Dict:
    """Generate a structured JSON report."""
    return {
        "skill_path": str(skill_path),
        "file_counts": file_counts,
        "content_analysis": {
            "methods_documented": content_analysis["methods_documented"],
            "principles_listed": content_analysis["principles_listed"],
            "conventions_defined": content_analysis["conventions_defined"],
            "patterns_catalogued": content_analysis["patterns_catalogued"],
            "gotchas_identified": content_analysis["gotchas_identified"],
            "good_example_count": content_analysis["good_example_count"],
            "bad_example_count": content_analysis["bad_example_count"],
            "good_bad_pairs": content_analysis["good_bad_pairs"],
            "total_lines": content_analysis["total_lines"],
            "total_words": content_analysis["total_words"],
            "total_md_files": len(content_analysis["per_file"]),
        },
        "coverage_score": coverage_score,
        "gap_list": gaps,
        "recommendations": recommendations,
    }


def generate_text_report(
    file_counts: Dict,
    content_analysis: Dict,
    coverage_score: Dict,
    gaps: List[Dict],
    recommendations: List[str],
    skill_path: Path,
) -> str:
    """Generate a human-readable text report."""
    lines = []

    lines.append("=" * 60)
    lines.append("SKILL COVERAGE ANALYSIS REPORT")
    lines.append("=" * 60)
    lines.append(f"\nSkill Path: {skill_path}")

    # Summary
    lines.append("\n" + "-" * 40)
    lines.append("SUMMARY")
    lines.append("-" * 40)
    lines.append(f"Total Files: {file_counts['total_files']}")
    lines.append(f"Markdown Files: {file_counts['total_md_files']}")
    lines.append(f"Total Lines: {content_analysis['total_lines']}")
    lines.append(f"Total Words: {content_analysis['total_words']}")

    # Coverage Score
    lines.append("\n" + "-" * 40)
    lines.append("COVERAGE SCORE")
    lines.append("-" * 40)
    lines.append(f"Score: {coverage_score['score']}/{coverage_score['max_score']}")
    lines.append(f"Grade: {coverage_score['grade']}")

    # Content Analysis
    lines.append("\n" + "-" * 40)
    lines.append("CONTENT ANALYSIS")
    lines.append("-" * 40)
    lines.append(f"Methods Documented: {content_analysis['methods_documented']}")
    lines.append(f"Principles Listed: {content_analysis['principles_listed']}")
    lines.append(f"Conventions Defined: {content_analysis['conventions_defined']}")
    lines.append(f"Patterns Catalogued: {content_analysis['patterns_catalogued']}")
    lines.append(f"Gotchas Identified: {content_analysis['gotchas_identified']}")
    lines.append(f"Files with Good Examples: {content_analysis['good_example_count']}")
    lines.append(f"Files with Bad Examples: {content_analysis['bad_example_count']}")
    lines.append(f"Files with Good/Bad Pairs: {content_analysis['good_bad_pairs']}")

    # Directory Status
    lines.append("\n" + "-" * 40)
    lines.append("DIRECTORY STATUS")
    lines.append("-" * 40)
    for dir_name in EXPECTED_DIRS:
        dir_info = file_counts.get("directories", {}).get(dir_name, {})
        exists = dir_info.get("exists", False)
        count = dir_info.get("count", 0)
        md_count = dir_info.get("md_count", 0)
        status = "✓" if exists and count > 0 else ("○" if exists else "✗")
        lines.append(f"  {status} {dir_name}/ - {count} files ({md_count} .md)")

    # Gaps
    lines.append("\n" + "-" * 40)
    lines.append("IDENTIFIED GAPS")
    lines.append("-" * 40)
    if gaps:
        severity_labels = {"high": "HIGH", "medium": "MED ", "low": "LOW "}
        for gap in gaps:
            severity = gap.get("severity", "low")
            label = severity_labels.get(severity, "????")
            lines.append(f"  [{label}] {gap['location']}: {gap['description']}")
    else:
        lines.append("  No gaps identified.")

    # Recommendations
    lines.append("\n" + "-" * 40)
    lines.append("RECOMMENDATIONS")
    lines.append("-" * 40)
    for rec in recommendations:
        lines.append(rec)

    lines.append("\n" + "=" * 60)
    lines.append("END OF REPORT")
    lines.append("=" * 60)

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def parse_args():
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(
        description="Analyze domain knowledge coverage in a skill directory.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --skill-path ./my-skill
  %(prog)s --skill-path ./my-skill --output-format json
  %(prog)s --skill-path ./my-skill --output-format text

Output formats:
  json   - Machine-readable JSON report (default)
  text   - Human-readable text report

The script analyzes markdown files and produces a coverage report including:
  - File counts by directory
  - Content analysis (methods, principles, conventions, etc.)
  - Coverage score (0-100) with grade
  - Gap list with severity ratings
  - Prioritized recommendations
        """,
    )

    parser.add_argument(
        "--skill-path",
        required=True,
        help="Path to the skill directory to analyze.",
    )

    parser.add_argument(
        "--output-format",
        choices=["json", "text"],
        default="json",
        help="Output format for the report (default: json).",
    )

    return parser.parse_args()


def main():
    """Main entry point."""
    args = parse_args()

    # Validate skill path
    skill_path = Path(args.skill_path).resolve()

    if not skill_path.exists():
        print(f"Error: Skill path does not exist: {skill_path}", file=sys.stderr)
        sys.exit(1)

    if not skill_path.is_dir():
        print(f"Error: Skill path is not a directory: {skill_path}", file=sys.stderr)
        sys.exit(1)

    # Find all markdown files
    md_files = find_markdown_files(skill_path)
    if not md_files:
        print(f"Warning: No markdown files found in {skill_path}", file=sys.stderr)

    # Run analyses
    file_counts = analyze_file_counts(skill_path)
    content_analysis = analyze_content(skill_path, md_files)
    gaps = identify_gaps(file_counts, content_analysis, skill_path)
    coverage_score = calculate_coverage_score(file_counts, content_analysis)
    recommendations = generate_recommendations(coverage_score, gaps, content_analysis)

    # Generate report
    if args.output_format == "json":
        report = generate_json_report(
            file_counts,
            content_analysis,
            coverage_score,
            gaps,
            recommendations,
            skill_path,
        )
        print(json.dumps(report, indent=2))
    else:
        report = generate_text_report(
            file_counts,
            content_analysis,
            coverage_score,
            gaps,
            recommendations,
            skill_path,
        )
        print(report)

    sys.exit(0)


if __name__ == "__main__":
    main()

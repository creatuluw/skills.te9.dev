#!/usr/bin/env bash
# =============================================================================
# validate-skill.sh - Validate a skill directory against the anatomy specification
#
# Performs comprehensive validation of a skill directory structure, SKILL.md
# frontmatter, content completeness, and best practice adherence.
#
# Exit Codes:
#   0 - All checks passed (or only warnings)
#   1 - One or more checks failed
#   2 - Usage error or invalid arguments
#
# Usage:
#   ./validate-skill.sh /path/to/skill-directory
#   ./validate-skill.sh --help
# =============================================================================

set -euo pipefail

# =============================================================================
# Constants
# =============================================================================

readonly SCRIPT_NAME="$(basename "${BASH_SOURCE[0]}")"
readonly VERSION="1.0.0"

# Exit codes
readonly EXIT_PASS=0
readonly EXIT_FAIL=1
readonly EXIT_USAGE=2

# Validation result codes
readonly RESULT_PASS="PASS"
readonly RESULT_WARN="WARN"
readonly RESULT_FAIL="FAIL"

# Scoring weights
readonly WEIGHT_CRITICAL=10
readonly WEIGHT_IMPORTANT=5
readonly WEIGHT_MINOR=2

# =============================================================================
# Global Variables
# =============================================================================

SKILL_PATH=""
CHECKS_PERFORMED=0
CHECKS_PASSED=0
CHECKS_WARNED=0
CHECKS_FAILED=0
TOTAL_SCORE=0
MAX_SCORE=0
RESULTS=()

# =============================================================================
# Helper Functions
# =============================================================================

print_help() {
    cat <<EOF
${SCRIPT_NAME} v${VERSION} - Validate a skill directory against the anatomy specification

USAGE:
    ${SCRIPT_NAME} [OPTIONS] <skill-path>

ARGUMENTS:
    <skill-path>     Path to the skill directory to validate

OPTIONS:
    -h, --help       Show this help message
    -v, --version    Show version information
    -q, --quiet      Suppress summary output (still show failures)

DESCRIPTION:
    Validates a skill directory against the skill anatomy specification.
    Checks include:
    - SKILL.md existence and valid YAML frontmatter
    - Name field format and directory name match
    - Description field presence and length
    - File depth from skill root
    - Optional directory structure and content
    - Method documentation quality (good/bad examples)
    - Self-learning content presence

OUTPUT:
    Structured results with PASS/WARN/FAIL for each check.
    Overall validation score as a percentage.

EXIT CODES:
    0    All checks passed (or only warnings)
    1    One or more checks failed
    2    Usage error or invalid arguments

EXAMPLES:
    # Validate a skill in the current directory
    ${SCRIPT_NAME} ./my-skill

    # Validate with verbose output
    ${SCRIPT_NAME} /path/to/worker-skills/my-skill

EOF
}

print_version() {
    echo "${SCRIPT_NAME} v${VERSION}"
}

log_error() {
    local message="$1"
    echo "ERROR: ${message}" >&2
}

log_info() {
    local message="$1"
    echo "INFO: ${message}" >&2
}

# =============================================================================
# Validation Functions
# =============================================================================

# Record a validation result
# Arguments: $1=check_name, $2=result (PASS/WARN/FAIL), $3=message, $4=weight
record_result() {
    local check_name="$1"
    local result="$2"
    local message="$3"
    local weight="${4:-$WEIGHT_CRITICAL}"

    CHECKS_PERFORMED=$((CHECKS_PERFORMED + 1))
    MAX_SCORE=$((MAX_SCORE + weight))

    case "$result" in
        "$RESULT_PASS")
            CHECKS_PASSED=$((CHECKS_PASSED + 1))
            TOTAL_SCORE=$((TOTAL_SCORE + weight))
            ;;
        "$RESULT_WARN")
            CHECKS_WARNED=$((CHECKS_WARNED + 1))
            TOTAL_SCORE=$((TOTAL_SCORE + weight / 2))
            ;;
        "$RESULT_FAIL")
            CHECKS_FAILED=$((CHECKS_FAILED + 1))
            ;;
    esac

    RESULTS+=("[$result] ${check_name}: ${message}")
}

# Check if SKILL.md exists
check_skill_md_exists() {
    local skill_md="${SKILL_PATH}/SKILL.md"

    if [[ -f "$skill_md" ]]; then
        record_result "SKILL.md exists" "$RESULT_PASS" "File found" "$WEIGHT_CRITICAL"
        return 0
    else
        record_result "SKILL.md exists" "$RESULT_FAIL" "Required file not found at ${skill_md}" "$WEIGHT_CRITICAL"
        return 1
    fi
}

# Extract YAML frontmatter from SKILL.md
extract_frontmatter() {
    local skill_md="${SKILL_PATH}/SKILL.md"

    # Check if file has frontmatter delimiters
    if ! head -n 1 "$skill_md" | grep -q '^---$'; then
        return 1
    fi

    # Extract content between first and second ---
    sed -n '/^---$/,/^---$/p' "$skill_md" | head -n -1 | tail -n +2
}

# Check YAML frontmatter validity
check_frontmatter_valid() {
    local skill_md="${SKILL_PATH}/SKILL.md"

    if ! [[ -f "$skill_md" ]]; then
        record_result "YAML frontmatter" "$RESULT_FAIL" "Cannot check frontmatter: SKILL.md missing" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Check first line is ---
    if ! head -n 1 "$skill_md" | grep -q '^---$'; then
        record_result "YAML frontmatter" "$RESULT_FAIL" "Missing opening --- delimiter" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Check for closing ---
    if ! grep -q '^---$' <(tail -n +2 "$skill_md"); then
        record_result "YAML frontmatter" "$RESULT_FAIL" "Missing closing --- delimiter" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Check frontmatter is not empty
    local frontmatter
    frontmatter=$(extract_frontmatter)

    if [[ -z "$frontmatter" ]]; then
        record_result "YAML frontmatter" "$RESULT_FAIL" "Frontmatter is empty" "$WEIGHT_CRITICAL"
        return 1
    fi

    record_result "YAML frontmatter" "$RESULT_PASS" "Valid frontmatter structure detected" "$WEIGHT_CRITICAL"
    return 0
}

# Validate the name field
check_name_field() {
    local skill_md="${SKILL_PATH}/SKILL.md"

    if ! [[ -f "$skill_md" ]]; then
        record_result "Name field" "$RESULT_FAIL" "Cannot check name: SKILL.md missing" "$WEIGHT_CRITICAL"
        return 1
    fi

    local frontmatter
    frontmatter=$(extract_frontmatter 2>/dev/null || echo "")

    if [[ -z "$frontmatter" ]]; then
        record_result "Name field" "$RESULT_FAIL" "Cannot extract frontmatter" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Extract name field
    local name
    name=$(echo "$frontmatter" | grep -E '^name:' | head -n 1 | sed 's/^name:[[:space:]]*//' | tr -d '"' | tr -d "'")

    # Check presence
    if [[ -z "$name" ]]; then
        record_result "Name field" "$RESULT_FAIL" "Name field is missing or empty" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Check length (1-64 chars)
    local name_len=${#name}
    if [[ $name_len -lt 1 ]]; then
        record_result "Name field" "$RESULT_FAIL" "Name is empty" "$WEIGHT_CRITICAL"
        return 1
    fi
    if [[ $name_len -gt 64 ]]; then
        record_result "Name field" "$RESULT_FAIL" "Name exceeds 64 characters (found ${name_len})" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Check format: lowercase + hyphens only
    if ! echo "$name" | grep -qE '^[a-z0-9]+(-[a-z0-9]+)*$'; then
        record_result "Name field" "$RESULT_FAIL" "Name must be lowercase with hyphens only, no leading/trailing/consecutive hyphens (found: '${name}')" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Check matches directory name
    local dir_name
    dir_name=$(basename "$(realpath "$SKILL_PATH")")

    if [[ "$name" != "$dir_name" ]]; then
        record_result "Name field" "$RESULT_FAIL" "Name '${name}' does not match directory name '${dir_name}'" "$WEIGHT_CRITICAL"
        return 1
    fi

    record_result "Name field" "$RESULT_PASS" "Valid name: '${name}' (${name_len} chars)" "$WEIGHT_CRITICAL"
    return 0
}

# Validate the description field
check_description_field() {
    local skill_md="${SKILL_PATH}/SKILL.md"

    if ! [[ -f "$skill_md" ]]; then
        record_result "Description field" "$RESULT_FAIL" "Cannot check description: SKILL.md missing" "$WEIGHT_CRITICAL"
        return 1
    fi

    local frontmatter
    frontmatter=$(extract_frontmatter 2>/dev/null || echo "")

    if [[ -z "$frontmatter" ]]; then
        record_result "Description field" "$RESULT_FAIL" "Cannot extract frontmatter" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Extract description field (may span multiple lines)
    local description
    description=$(echo "$frontmatter" | sed -n '/^description:/,/^[a-z]/p' | head -n -1 | sed 's/^description:[[:space:]]*//' | sed 's/^[[:space:]]*//' | tr -d '"' | tr -d "'" | xargs)

    if [[ -z "$description" ]]; then
        record_result "Description field" "$RESULT_FAIL" "Description field is missing or empty" "$WEIGHT_CRITICAL"
        return 1
    fi

    # Check length
    local desc_len=${#description}
    if [[ $desc_len -gt 1024 ]]; then
        record_result "Description field" "$RESULT_FAIL" "Description exceeds 1024 characters (found ${desc_len})" "$WEIGHT_CRITICAL"
        return 1
    fi

    record_result "Description field" "$RESULT_PASS" "Valid description (${desc_len} chars)" "$WEIGHT_CRITICAL"
    return 0
}

# Check SKILL.md body line count
check_skill_md_size() {
    local skill_md="${SKILL_PATH}/SKILL.md"

    if ! [[ -f "$skill_md" ]]; then
        return 0  # Already failed in other checks
    fi

    # Count lines excluding frontmatter
    local body_lines
    body_lines=$(sed '/^---$/,/^---$/d' "$skill_md" | wc -l | tr -d ' ')

    if [[ $body_lines -gt 500 ]]; then
        record_result "SKILL.md size" "$RESULT_WARN" "Body exceeds 500 lines (${body_lines} lines). Consider splitting into sub-files." "$WEIGHT_MINOR"
    else
        record_result "SKILL.md size" "$RESULT_PASS" "Body is ${body_lines} lines (under 500 limit)" "$WEIGHT_MINOR"
    fi
}

# Check file references are one level deep
check_file_depth() {
    local found_deep_files=0
    local deep_files_list=""

    while IFS= read -r -d '' file; do
        # Get path relative to skill root
        local rel_path="${file#${SKILL_PATH}/}"

        # Count directory separators
        local depth
        depth=$(echo "$rel_path" | tr -cd '/' | wc -c)

        if [[ $depth -gt 1 ]]; then
            found_deep_files=$((found_deep_files + 1))
            if [[ $found_deep_files -le 5 ]]; then
                deep_files_list="${deep_files_list}\n    - ${rel_path}"
            fi
        fi
    done < <(find "$SKILL_PATH" -type f -not -path '*/\.*' -print0 2>/dev/null)

    if [[ $found_deep_files -gt 0 ]]; then
        local count_msg=""
        if [[ $found_deep_files -gt 5 ]]; then
            count_msg=" (and $((found_deep_files - 5)) more)"
        fi
        record_result "File depth" "$RESULT_WARN" "Found ${found_deep_files} files deeper than one level:${deep_files_list}${count_msg}" "$WEIGHT_MINOR"
    else
        record_result "File depth" "$RESULT_PASS" "All files are at most one level deep" "$WEIGHT_MINOR"
    fi
}

# Check optional directories
check_optional_directories() {
    local directories=("product" "methods" "design" "conventions" "scripts" "sources" "assets")
    local found_count=0
    local empty_count=0
    local missing_list=""
    local empty_list=""

    for dir in "${directories[@]}"; do
        local dir_path="${SKILL_PATH}/${dir}"

        if [[ -d "$dir_path" ]]; then
            # Check if directory has content
            local file_count
            file_count=$(find "$dir_path" -type f -not -path '*/\.*' 2>/dev/null | wc -l | tr -d ' ')

            if [[ $file_count -eq 0 ]]; then
                empty_count=$((empty_count + 1))
                empty_list="${empty_list}\n    - ${dir}/ (empty)"
            else
                found_count=$((found_count + 1))
            fi
        fi
    done

    # Report on directories with content
    if [[ $found_count -gt 0 ]]; then
        record_result "Optional directories" "$RESULT_PASS" "${found_count}/7 directories exist with content" "$WEIGHT_IMPORTANT"
    else
        record_result "Optional directories" "$RESULT_WARN" "No optional directories with content found" "$WEIGHT_IMPORTANT"
    fi

    # Report on empty directories
    if [[ $empty_count -gt 0 ]]; then
        record_result "Empty directories" "$RESULT_WARN" "${empty_count} directories exist but are empty:${empty_list}" "$WEIGHT_MINOR"
    fi
}

# Check for good and bad examples in methods
check_method_examples() {
    local methods_dir="${SKILL_PATH}/methods"

    if [[ ! -d "$methods_dir" ]]; then
        record_result "Method examples" "$RESULT_WARN" "No methods/ directory found" "$WEIGHT_IMPORTANT"
        return 0
    fi

    local md_files=()
    while IFS= read -r -d '' file; do
        [[ -f "$file" && "$file" == *.md ]] && md_files+=("$file")
    done < <(find "$methods_dir" -type f -print0 2>/dev/null)

    if [[ ${#md_files[@]} -eq 0 ]]; then
        record_result "Method examples" "$RESULT_WARN" "No markdown files found in methods/" "$WEIGHT_IMPORTANT"
        return 0
    fi

    local files_with_good=0
    local files_with_bad=0
    local files_with_both=0
    local files_missing_examples=()

    for file in "${md_files[@]}"; do
        local has_good=0
        local has_bad=0

        # Check for good example patterns
        if grep -qiE '(good[- ]example|✓|✔|correct|recommended|best[- ]practice|do:)' "$file" 2>/dev/null; then
            has_good=1
            files_with_good=$((files_with_good + 1))
        fi

        # Check for bad example patterns
        if grep -qiE '(bad[- ]example|✗|✘|incorrect|anti[- ]pattern|avoid|don.t:|don''t:)' "$file" 2>/dev/null; then
            has_bad=1
            files_with_bad=$((files_with_bad + 1))
        fi

        if [[ $has_good -eq 1 && $has_bad -eq 1 ]]; then
            files_with_both=$((files_with_both + 1))
        elif [[ $has_good -eq 0 && $has_bad -eq 0 ]]; then
            local rel_path="${file#${SKILL_PATH}/}"
            files_missing_examples+=("$rel_path")
        fi
    done

    local total_files=${#md_files[@]}

    if [[ $files_with_both -eq $total_files ]]; then
        record_result "Method examples" "$RESULT_PASS" "All ${total_files} method files have good and bad examples" "$WEIGHT_IMPORTANT"
    elif [[ ${#files_missing_examples[@]} -eq 0 ]]; then
        record_result "Method examples" "$RESULT_PASS" "Method files contain example patterns (${files_with_good} good, ${files_with_bad} bad)" "$WEIGHT_IMPORTANT"
    else
        local missing_count=${#files_missing_examples[@]}
        local missing_msg=""
        for f in "${files_missing_examples[@]}"; do
            if [[ $missing_count -le 5 ]]; then
                missing_msg="${missing_msg}\n    - ${f}"
            fi
        done
        record_result "Method examples" "$RESULT_WARN" "${missing_count}/${total_files} method files missing good/bad examples:${missing_msg}" "$WEIGHT_IMPORTANT"
    fi
}

# Check for self-learning content
check_self_learning_content() {
    local skill_md="${SKILL_PATH}/SKILL.md"
    local found_learning=0
    local locations=""

    # Patterns that indicate self-learning content
    local patterns=("self.learning" "feedback" "improve" "iteration" "reflect" "meta.cogn" "grow" "evolv" "adapt")

    # Check SKILL.md
    if [[ -f "$skill_md" ]]; then
        for pattern in "${patterns[@]}"; do
            if grep -qiE "$pattern" "$skill_md" 2>/dev/null; then
                found_learning=1
                locations="${locations}\n    - SKILL.md (pattern: '${pattern}')"
                break
            fi
        done
    fi

    # Check other .md files
    while IFS= read -r -d '' file; do
        for pattern in "${patterns[@]}"; do
            if grep -qiE "$pattern" "$file" 2>/dev/null; then
                found_learning=1
                local rel_path="${file#${SKILL_PATH}/}"
                locations="${locations}\n    - ${rel_path} (pattern: '${pattern}')"
                break
            fi
        done
        [[ $found_learning -eq 1 ]] && break
    done < <(find "$SKILL_PATH" -name "*.md" -type f -not -name "SKILL.md" -print0 2>/dev/null)

    if [[ $found_learning -eq 1 ]]; then
        record_result "Self-learning content" "$RESULT_PASS" "Found self-learning related content in:${locations}" "$WEIGHT_MINOR"
    else
        record_result "Self-learning content" "$RESULT_WARN" "No self-learning content detected (looked for: self-learning, feedback, improve, iteration, reflect, etc.)" "$WEIGHT_MINOR"
    fi
}

# =============================================================================
# Main Execution
# =============================================================================

parse_arguments() {
    if [[ $# -eq 0 ]]; then
        log_error "Missing required argument: skill-path"
        echo ""
        print_help
        exit $EXIT_USAGE
    fi

    while [[ $# -gt 0 ]]; do
        case "$1" in
            -h|--help)
                print_help
                exit $EXIT_PASS
                ;;
            -v|--version)
                print_version
                exit $EXIT_PASS
                ;;
            -q|--quiet)
                # Quiet mode handled in output
                shift
                ;;
            -*)
                log_error "Unknown option: $1"
                echo ""
                print_help
                exit $EXIT_USAGE
                ;;
            *)
                if [[ -n "${SKILL_PATH:-}" ]]; then
                    log_error "Multiple skill paths provided. Only one is allowed."
                    exit $EXIT_USAGE
                fi
                SKILL_PATH="$1"
                shift
                ;;
        esac
    done

    if [[ -z "${SKILL_PATH:-}" ]]; then
        log_error "No skill path provided"
        echo ""
        print_help
        exit $EXIT_USAGE
    fi

    # Normalize path
    if [[ ! -d "$SKILL_PATH" ]]; then
        log_error "Directory does not exist: ${SKILL_PATH}"
        exit $EXIT_USAGE
    fi

    SKILL_PATH=$(realpath "$SKILL_PATH")
}

run_validations() {
    # Critical checks
    check_skill_md_exists
    check_frontmatter_valid
    check_name_field
    check_description_field

    # Quality checks
    check_skill_md_size
    check_file_depth
    check_optional_directories
    check_method_examples
    check_self_learning_content
}

print_results() {
    echo "=========================================="
    echo "  Skill Validation Report"
    echo "=========================================="
    echo ""
    echo "Path: ${SKILL_PATH}"
    echo "Date: $(date -Iseconds 2>/dev/null || date)"
    echo ""
    echo "------------------------------------------"
    echo "  Individual Checks"
    echo "------------------------------------------"
    echo ""

    for result in "${RESULTS[@]}"; do
        echo "  ${result}"
    done

    echo ""
    echo "------------------------------------------"
    echo "  Summary"
    echo "------------------------------------------"
    echo ""
    echo "  Total checks: ${CHECKS_PERFORMED}"
    echo "  Passed:       ${CHECKS_PASSED}"
    echo "  Warnings:     ${CHECKS_WARNED}"
    echo "  Failed:       ${CHECKS_FAILED}"
    echo ""

    # Calculate percentage
    local percentage=0
    if [[ $MAX_SCORE -gt 0 ]]; then
        percentage=$((TOTAL_SCORE * 100 / MAX_SCORE))
    fi

    echo "  Score: ${percentage}%"
    echo ""

    # Overall result
    if [[ $CHECKS_FAILED -gt 0 ]]; then
        echo "  Overall: FAIL"
        echo ""
        echo "  Validation failed. Please address the issues above."
    elif [[ $CHECKS_WARNED -gt 0 ]]; then
        echo "  Overall: PASS (with warnings)"
        echo ""
        echo "  Validation passed with warnings. Consider addressing them."
    else
        echo "  Overall: PASS"
        echo ""
        echo "  All checks passed successfully!"
    fi

    echo "=========================================="
}

main() {
    parse_arguments "$@"
    run_validations
    print_results

    # Exit with appropriate code
    if [[ $CHECKS_FAILED -gt 0 ]]; then
        exit $EXIT_FAIL
    else
        exit $EXIT_PASS
    fi
}

main "$@"

async function exportDesignSystem() {
  try {
    const response = await fetch("design-system.json");
    if (!response.ok) throw new Error("Failed to load design-system.json");
    const data = await response.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design-system.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Export failed:", err);
    alert(
      "Failed to export design system. Make sure design-system.json is in the same directory as index.html.",
    );
  }
}

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.pageYOffset > 80);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);

document.querySelectorAll(".section-reveal").forEach((el) => {
  revealObserver.observe(el);
});

document.querySelectorAll(".sidebar-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    document
      .querySelectorAll(".sidebar-link")
      .forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("keydown", function (e) {
    if (e.key === "Escape") this.classList.remove("active");
  });
});

const timelineLine = document.querySelector(".timeline-line");
if (timelineLine) {
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timelineLine.style.animation =
            "drawLine 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards";
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  timelineObserver.observe(timelineLine.parentElement);
}

const staggerContainers = document.querySelectorAll(".stagger-observe");
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("stagger-in");
        staggerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
staggerContainers.forEach((el) => staggerObserver.observe(el));

function replayAnim(btn) {
  const wrapper = btn.closest(".anim-demo-wrapper");
  if (!wrapper) return;
  const stage = wrapper.querySelector(".anim-demo-stage");
  if (!stage) return;
  stage.classList.remove("playing");
  void stage.offsetWidth;
  stage.classList.add("playing");
}

document.querySelectorAll(".tabs[data-tab-group]").forEach((tabBar) => {
  const groupName = tabBar.dataset.tabGroup;
  tabBar.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      tabBar
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.tab;
      const showcase =
        tabBar.closest(".concept-showcase") ||
        tabBar.closest(".component-example");
      if (!showcase) return;
      showcase.querySelectorAll("[data-tab-panel]").forEach((panel) => {
        panel.style.display = panel.dataset.tabPanel === target ? "" : "none";
      });
    });
  });
});

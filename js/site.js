(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-list a");
  const progress = document.querySelector(".progress");
  const folio = document.querySelector(".folio");
  const sections = [...document.querySelectorAll("[data-folio]")];

  const setProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? window.scrollY / max : 0;
    progress.style.width = `${value * 100}%`;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const setFolio = () => {
    const y = window.scrollY + window.innerHeight * 0.28;
    let current = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= y) current = section;
    }
    if (current) {
      folio.textContent = current.dataset.folio;
      navLinks.forEach((link) => {
        const match = link.getAttribute("href") === `#${current.id}`;
        link.toggleAttribute("aria-current", match);
      });
    }
  };

  const onScroll = () => {
    setProgress();
    setFolio();
  };

  toggle?.addEventListener("click", () => {
    const open = header.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-in");
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".ink-reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".ink-reveal").forEach((el) => el.classList.add("is-in"));
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
})();

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  }
}), { threshold: .12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const siteHeader = document.querySelector(".site-header");
let previousScrollY = window.scrollY;
if (siteHeader) {
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 16 || currentScrollY < previousScrollY) {
      siteHeader.classList.remove("nav-hidden");
    } else if (currentScrollY > previousScrollY) {
      siteHeader.classList.add("nav-hidden");
    }
    previousScrollY = currentScrollY;
  }, { passive: true });
}

const navToggle = document.querySelector("#nav-toggle");
const siteNav = document.querySelector("#site-nav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("hidden", isOpen);
  });
  siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.add("hidden");
  }));
}

document.querySelectorAll(".monitor-tab").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll(".monitor-tab").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".monitor-panel").forEach((panel) => panel.classList.remove("active"));
  tab.classList.add("active");
  document.querySelector(`#${tab.dataset.monitor}`).classList.add("active");
}));

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.querySelector("#form-status");
    if (!form.checkValidity()) {
      status.textContent = "Please complete all fields with valid details.";
      status.className = "mt-3 text-center text-sm text-red-600";
      form.reportValidity();
      return;
    }
    status.textContent = "Thank you. Your inquiry is ready to send.";
    status.className = "mt-3 text-center text-sm text-gstGreen";
    form.reset();
  });
}

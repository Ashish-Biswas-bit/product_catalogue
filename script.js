const menuButton = document.querySelector("#menu-button");
const navLinks = document.querySelector("#nav-links");

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("menu-open", !open);
  menuButton.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
});

document.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  navLinks.classList.remove("menu-open");
}));

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  }
}), { threshold: .12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelector("#contact-form").addEventListener("submit", (event) => {
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

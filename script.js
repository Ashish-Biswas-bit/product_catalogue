const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  }
}), { threshold: .12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

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

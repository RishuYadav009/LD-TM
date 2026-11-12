const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }));
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector("#enquiry-form");
if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent("LD-TM project enquiry — " + data.get("service"));
    const body = encodeURIComponent(
      "Name: " + data.get("name") + "\n" +
      "Email: " + data.get("email") + "\n" +
      "Service: " + data.get("service") + "\n\n" +
      "Project details:\n" + data.get("message")
    );
    const status = document.querySelector(".form-status");
    status.textContent = "Your email draft is ready. Review it and send it from your email app.";
    window.location.href = "mailto:?subject=" + subject + "&body=" + body;
  });
}
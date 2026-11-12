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
  const status = document.querySelector(".form-status");
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = "Sending…";
    status.textContent = "";
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      service: String(data.get("service") || "").trim(),
      details: String(data.get("message") || "").trim()
    };
    try {
      if (!window.ldtmSupabase) throw new Error("The enquiry service is not configured yet. Please try again later.");
      const { error } = await window.ldtmSupabase.from("inquiries").insert(payload);
      if (error) throw error;
      form.reset();
      status.textContent = "Thanks — your enquiry has been received.";
      status.classList.add("success");
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      status.textContent = "We couldn't submit your enquiry just now. Please try again in a moment.";
      status.classList.remove("success");
    } finally {
      submit.disabled = false;
      submit.innerHTML = 'Send enquiry <span>↗</span>';
    }
  });
}

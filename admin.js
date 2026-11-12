const supabaseClient = window.ldtmSupabase;
const ADMIN_EMAIL = "manipulator0009@gmail.com";
const loginPanel = document.querySelector("#login-panel");
const dashboardPanel = document.querySelector("#dashboard-panel");
const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");
const dashboardMessage = document.querySelector("#dashboard-message");
const list = document.querySelector("#inquiry-list");
const count = document.querySelector("#inquiry-count");

function showDashboard(show) {
  loginPanel.hidden = show;
  dashboardPanel.hidden = !show;
}
function isAllowed(user) {
  return Boolean(user && user.email && user.email.toLowerCase() === ADMIN_EMAIL);
}
async function loadInquiries() {
  dashboardMessage.textContent = "Loading enquiries…";
  list.innerHTML = "";
  const { data, error } = await supabaseClient.from("inquiries")
    .select("id,created_at,name,email,service,details,status")
    .order("created_at", { ascending: false });
  if (error) {
    dashboardMessage.textContent = "Couldn't load enquiries. Please sign in again if your session expired.";
    return;
  }
  dashboardMessage.textContent = "";
  count.textContent = data.length + (data.length === 1 ? " enquiry" : " enquiries");
  if (!data.length) {
    list.innerHTML = '<div class="empty-state">No enquiries yet. New website submissions will appear here.</div>';
    return;
  }
  for (const item of data) {
    const card = document.createElement("article");
    card.className = "inquiry-card";
    const date = new Date(item.created_at).toLocaleString();
    card.innerHTML = `
      <div class="inquiry-top"><div><h3></h3><a class="inquiry-email"></a></div><span class="inquiry-date"></span></div>
      <span class="inquiry-service"></span><p class="inquiry-details"></p>
      <div class="inquiry-actions"><label>Status <select aria-label="Enquiry status"><option>New</option><option>In Progress</option><option>Completed</option></select></label><button class="btn btn-primary" type="button">Save status</button></div>`;
    card.querySelector("h3").textContent = item.name;
    const emailLink = card.querySelector(".inquiry-email");
    emailLink.textContent = item.email;
    emailLink.href = "mailto:" + encodeURIComponent(item.email);
    card.querySelector(".inquiry-date").textContent = date;
    card.querySelector(".inquiry-service").textContent = item.service;
    card.querySelector(".inquiry-details").textContent = item.details;
    const select = card.querySelector("select");
    select.value = item.status;
    const save = card.querySelector("button");
    save.addEventListener("click", async () => {
      save.disabled = true;
      save.textContent = "Saving…";
      const { error: updateError } = await supabaseClient.from("inquiries")
        .update({ status: select.value }).eq("id", item.id);
      save.disabled = false;
      save.textContent = "Save status";
      dashboardMessage.textContent = updateError ? "Status couldn't be updated. Please try again." : "Status updated.";
    });
    list.appendChild(card);
  }
}
loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  loginMessage.textContent = "";
  const button = document.querySelector("#login-button");
  button.disabled = true;
  button.textContent = "Signing in…";
  const password = document.querySelector("#admin-password").value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
  button.disabled = false;
  button.innerHTML = 'Sign in <span>↗</span>';
  if (error || !isAllowed(data.user)) {
    if (data.user) await supabaseClient.auth.signOut();
    loginMessage.textContent = "Sign-in failed. Check the admin password and try again.";
    return;
  }
  document.querySelector("#admin-password").value = "";
  showDashboard(true);
  await loadInquiries();
});
document.querySelector("#signout-button").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  showDashboard(false);
});
document.querySelector("#refresh-button").addEventListener("click", loadInquiries);
(async () => {
  const { data } = await supabaseClient.auth.getSession();
  if (isAllowed(data.session?.user)) {
    showDashboard(true);
    await loadInquiries();
  } else {
    if (data.session) await supabaseClient.auth.signOut();
    showDashboard(false);
  }
})();

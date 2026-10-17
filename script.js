const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "மெனுவை மூடு" : "மெனுவைத் திற");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "மெனுவைத் திற");
    menuToggle.textContent = "☰";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const membershipForm = document.querySelector("#membershipForm");
const formMessage = document.querySelector("#formMessage");

membershipForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.classList.remove("error");

  if (!membershipForm.reportValidity()) return;

  const phone = document.querySelector("#phone").value.trim();
  if (!/^[0-9]{10}$/.test(phone)) {
    formMessage.textContent = "சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்.";
    formMessage.classList.add("error");
    return;
  }

  const entry = {
    name: document.querySelector("#fullName").value.trim(),
    age: Number(document.querySelector("#age").value),
    district: document.querySelector("#district").value.trim(),
    phone,
    interest: document.querySelector("#interest").value,
    submittedAt: new Date().toISOString()
  };

  // DEMO ONLY: this stores the entry in this browser, not on a server.
  // Do not collect real personal data until a secure backend and privacy notice exist.
  try {
    const entries = JSON.parse(localStorage.getItem("tmmkDemoMemberships") || "[]");
    entries.push(entry);
    localStorage.setItem("tmmkDemoMemberships", JSON.stringify(entries));
    formMessage.textContent = "மாதிரி பதிவு வெற்றிகரமாகச் சேமிக்கப்பட்டது. இது இந்த உலாவியில் மட்டுமே இருக்கும்; நிர்வாகியிடம் அனுப்பப்படவில்லை.";
    membershipForm.reset();
  } catch (error) {
    formMessage.textContent = "இந்த உலாவியில் சேமிக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.";
    formMessage.classList.add("error");
  }
});

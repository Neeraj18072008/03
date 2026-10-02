const CORRECT_PASSWORD = "200326"; // change this

const pages = [...document.querySelectorAll(".page")];
const progressLabel = document.getElementById("progressLabel");
const backBtn = document.getElementById("backBtn");
let current = 1;

/* Photo cards show a gentle label until the matching file is added. */
document.querySelectorAll(".memory-photo").forEach((image) => {
  const frame = image.closest(".media-frame");
  const markLoaded = () => frame.classList.add("has-image");
  const markMissing = () => { image.style.display = "none"; };
  image.addEventListener("load", markLoaded);
  image.addEventListener("error", markMissing);
  if (image.complete) {
    if (image.naturalWidth) markLoaded();
    else markMissing();
  }
});

function showPage(n) {
  current = n;
  pages.forEach((p) => {
    p.classList.toggle("active", Number(p.dataset.page) === n);
  });
  const activePage = document.querySelector(`.page[data-page="${n}"]`);
  activePage.scrollTop = 0;
  progressLabel.textContent = `${n} / 10`;
  backBtn.hidden = n === 1;
}

backBtn.addEventListener("click", () => {
  if (current > 1) showPage(current - 1);
});

document.querySelectorAll(".next-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (current < 10) showPage(current + 1);
  });
});

/* Page 1 gift */
const gift = document.getElementById("giftBox");
document.getElementById("openGiftBtn").addEventListener("click", () => {
  gift.classList.add("open");
  setTimeout(() => showPage(2), 700);
});

/* Page 2 bear */
const bear = document.getElementById("bear");
const bearHint = document.getElementById("bearHint");
const bearQuestion = document.getElementById("bearQuestion");
const bearButtons = document.getElementById("bearButtons");
const tryAgainBtn = document.getElementById("tryAgainBtn");

document.getElementById("yesBtn").addEventListener("click", () => showPage(3));
document.getElementById("noBtn").addEventListener("click", () => {
  bear.classList.add("sad");
  bearQuestion.classList.add("hidden");
  bearHint.classList.remove("hidden");
  bearButtons.classList.add("hidden");
  tryAgainBtn.classList.remove("hidden");
});
tryAgainBtn.addEventListener("click", () => {
  bear.classList.remove("sad");
  bearQuestion.classList.remove("hidden");
  bearHint.classList.add("hidden");
  bearButtons.classList.remove("hidden");
  tryAgainBtn.classList.add("hidden");
});

/* Envelope */
const envelope = document.getElementById("envelope");
const openEnvBtn = document.getElementById("openEnvBtn");
const continueHeart = document.getElementById("continueHeart");
openEnvBtn.addEventListener("click", () => {
  envelope.classList.add("open");
  openEnvBtn.classList.add("hidden");
  continueHeart.classList.remove("hidden");
});
continueHeart.addEventListener("click", () => showPage(4));

/* PIN */
const pins = [...document.querySelectorAll(".pin")];
const pinError = document.getElementById("pinError");
pins.forEach((input, i) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);
    if (input.value && pins[i + 1]) pins[i + 1].focus();
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && pins[i - 1]) pins[i - 1].focus();
  });
});
document.getElementById("pinForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const code = pins.map((p) => p.value).join("");
  if (code === CORRECT_PASSWORD) {
    pinError.classList.add("hidden");
    showPage(5);
  } else {
    pinError.classList.remove("hidden");
    pins.forEach((p) => (p.value = ""));
    pins[0].focus();
  }
});

/* Floating hearts */
const layer = document.getElementById("heartsLayer");
for (let i = 0; i < 14; i++) {
  const h = document.createElement("span");
  h.className = "float-heart";
  h.textContent = "♥";
  h.style.left = `${Math.random() * 100}%`;
  h.style.animationDelay = `${Math.random() * 12}s`;
  h.style.fontSize = `${10 + Math.random() * 16}px`;
  layer.appendChild(h);
}

/* Always start the experience at the top of the first page. */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
showPage(1);
window.scrollTo(0, 0);

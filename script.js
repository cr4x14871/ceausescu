const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const success = document.getElementById("success");
const againBtn = document.getElementById("againBtn");

let noScale = 1;
let yesScale = 1;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Move "Nu" button somewhere within the visible card area
function moveNoButton() {
  const buttons = document.getElementById("buttons");
  const btnRect = noBtn.getBoundingClientRect();
  const areaRect = buttons.getBoundingClientRect();

  // allow moving within the buttons area (relative positioning)
  const maxX = Math.max(0, areaRect.width - btnRect.width);
  const maxY = Math.max(0, areaRect.height - btnRect.height);

  const x = rand(0, maxX);
  const y = rand(0, maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function accept() {
  card.classList.add("hidden");
  success.classList.remove("hidden");
}

yesBtn.addEventListener("click", accept);

againBtn.addEventListener("click", () => {
  success.classList.add("hidden");
  card.classList.remove("hidden");

  // reset
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  noScale = 1;
  yesScale = 1;
  noBtn.style.transform = "scale(1)";
  yesBtn.style.transform = "scale(1)";
});

// Make "Nu" evasive on hover and touch
["mouseenter", "touchstart"].forEach(evt => {
  noBtn.addEventListener(evt, (e) => {
    e.preventDefault();

    // shrink "Nu" a bit each time
    noScale = Math.max(0.55, noScale - 0.08);
    noBtn.style.transform = `scale(${noScale})`;

    // grow "Da" a bit each time
    yesScale = Math.min(1.6, yesScale + 0.06);
    yesBtn.style.transform = `scale(${yesScale})`;

    moveNoButton();
  }, { passive: false });
});

// also move on click (in case they manage to click it)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});

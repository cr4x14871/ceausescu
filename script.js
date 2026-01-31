const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const success = document.getElementById("success");
const buttons = document.getElementById("buttons");
const note = document.getElementById("note");

let yesScale = 1;
let noLocked = false;      // after first "No", it becomes unclickable + moves
let isMoving = false;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveNoButton() {
  const btnRect = noBtn.getBoundingClientRect();
  const areaRect = buttons.getBoundingClientRect();

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

// When they click "No" once:
// - show a message
// - make "Yes" bigger
// - start dodging forever, so you can't press "No" anymore
noBtn.addEventListener("click", (e) => {
  e.preventDefault();

  note.textContent = "No? 😳 Try again…";

  // Grow YES noticeably
  yesScale = Math.min(2.0, yesScale + 0.35);
  yesBtn.style.transform = `scale(${yesScale})`;

  // Lock NO into dodge mode from now on
  noLocked = true;

  // Immediately move away
  moveNoButton();

  // Make it harder to interact with NO
  noBtn.blur();
});

// If NO is locked, it dodges on hover / mouse move / touch
function dodgeHandler(e) {
  if (!noLocked) return;

  // Prevent touch click
  if (e.cancelable) e.preventDefault();

  moveNoButton();

  // Keep growing YES a bit each dodge
  yesScale = Math.min(2.3, yesScale + 0.08);
  yesBtn.style.transform = `scale(${yesScale})`;

  // Update message sometimes
  const messages = [
    "Come on 😅",
    "You can’t say no 🙃",
    "Just click YES 💖",
    "Nice try 😈",
    "Be my Valentine 🥺"
  ];
  note.textContent = messages[rand(0, messages.length - 1)];
}

["mouseenter", "mousemove", "touchstart"].forEach(evt => {
  noBtn.addEventListener(evt, dodgeHandler, { passive: false });
});

// Optional: if they move near the NO button area, also dodge (extra evil)
buttons.addEventListener("mousemove", (e) => {
  if (!noLocked) return;
  if (isMoving) return;

  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    (rect.left + rect.width / 2) - e.clientX,
    (rect.top + rect.height / 2) - e.clientY
  );

  if (distance < 120) {
    isMoving = true;
    moveNoButton();
    setTimeout(() => (isMoving = false), 60);
  }
});

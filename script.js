const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const success = document.getElementById("success");
const note = document.getElementById("note");
const buttons = document.getElementById("buttons");

let noCount = 0;
let yesScale = 1;
let dodgeMode = false;

// Similar to the popular Valentine demo
const noTexts = [
  "No",
  "Are you sure?",
  "Really sure??",
  "Think again 😳",
  "Last chance!",
  "Surely not…",
  "You might regret this!",
  "Give it one more thought…",
  "Please? 🥺",
  "Don’t do this to me 😭",
  "I’m gonna cry…",
  "You’re breaking my heart 💔",
  "Ok… stop 😤",
  "Just say yes 😈",
  "YES is the only option 😌"
];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveNo() {
  const btnRect = noBtn.getBoundingClientRect();
  const areaRect = buttons.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  const x = rand(0, Math.max(0, maxX));
  const y = rand(0, Math.max(0, maxY));

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

function accept() {
  card.classList.add("hidden");
  success.classList.remove("hidden");
}

yesBtn.addEventListener("click", accept);

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  noCount++;

  // change No text
  const idx = Math.min(noCount, noTexts.length - 1);
  noBtn.textContent = noTexts[idx];

  note.textContent = "Just click YES ❤️";

  // grow YES
  yesScale = Math.min(6, yesScale + 0.25);
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "10";

  // after a few NO clicks, enable dodge mode
  if (noCount >= 5) {
    dodgeMode = true;
    moveNo();
  }
});

// Once dodgeMode is active, NO runs away from mouse
noBtn.addEventListener("mouseenter", () => {
  if (!dodgeMode) return;

  moveNo();

  // make YES even bigger while NO runs
  yesScale = Math.min(7, yesScale + 0.1);
  yesBtn.style.transform = `scale(${yesScale})`;
});

// Extra evil: also dodge if mouse gets close
buttons.addEventListener("mousemove", (e) => {
  if (!dodgeMode) return;

  const rect = noBtn.getBoundingClientRect();
  const dist = Math.hypot(
    rect.left + rect.width / 2 - e.clientX,
    rect.top + rect.height / 2 - e.clientY
  );

  if (dist < 100) moveNo();
});

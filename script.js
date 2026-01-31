document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const card = document.getElementById("card");
  const success = document.getElementById("success");
  const note = document.getElementById("note");
  const buttons = document.getElementById("buttons");

  // Safety check: if IDs don't match, show a helpful error
  const missing = [];
  if (!yesBtn) missing.push("yesBtn");
  if (!noBtn) missing.push("noBtn");
  if (!card) missing.push("card");
  if (!success) missing.push("success");
  if (!note) missing.push("note");
  if (!buttons) missing.push("buttons");
  if (missing.length) {
    console.error("Missing elements with IDs:", missing.join(", "));
    return;
  }

  let noCount = 0;
  let yesScale = 1;
  let dodgeMode = false;      // turns on after a few "No" clicks
  let moveCooldown = false;   // prevents jitter spam

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

    const maxX = Math.max(0, areaRect.width - btnRect.width);
    const maxY = Math.max(0, areaRect.height - btnRect.height);

    noBtn.style.position = "absolute";
    noBtn.style.left = rand(0, maxX) + "px";
    noBtn.style.top = rand(0, maxY) + "px";
  }

  function growYes(amount) {
    yesScale = Math.min(6.5, yesScale + amount);
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.zIndex = "10";
  }

  function accept() {
    card.classList.add("hidden");
    success.classList.remove("hidden");
  }

  yesBtn.addEventListener("click", accept);

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    noCount++;

    noBtn.textContent = noTexts[Math.min(noCount, noTexts.length - 1)];
    note.textContent = "Just click YES ❤️";

    growYes(0.25);

    // After 5 clicks, NO starts dodging so you can't press it anymore
    if (noCount >= 5) {
      dodgeMode = true;
      moveNo();
    }
  });

  // Dodge on hover once dodgeMode is enabled
  noBtn.addEventListener("mouseenter", () => {
    if (!dodgeMode) return;
    moveNo();
    growYes(0.10);
  });

  // Extra: dodge if mouse gets close (makes it basically impossible)
  buttons.addEventListener("mousemove", (e) => {
    if (!dodgeMode || moveCooldown) return;

    const rect = noBtn.getBoundingClientRect();
    const dist = Math.hypot(
      rect.left + rect.width / 2 - e.clientX,
      rect.top + rect.height / 2 - e.clientY
    );

    if (dist < 120) {
      moveCooldown = true;
      moveNo();
      setTimeout(() => (moveCooldown = false), 60);
    }
  });
});

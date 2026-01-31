document.addEventListener("DOMContentLoaded", () => {
  // Stage elements
  const intro = document.getElementById("intro");
  const enterBtn = document.getElementById("enterBtn");
  const fadeOverlay = document.getElementById("fadeOverlay");

  const valentineCard = document.getElementById("valentineCard");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const success = document.getElementById("success");
  const note = document.getElementById("note");
  const buttons = document.getElementById("buttons");

  // Sanity check
  const must = { intro, enterBtn, fadeOverlay, valentineCard, yesBtn, noBtn, success, note, buttons };
  const missing = Object.entries(must).filter(([,v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error("Missing elements:", missing.join(", "));
    return;
  }

  // ===== INTRO -> VALENTINE TRANSITION =====
  enterBtn.addEventListener("click", () => {
    // Fade to black
    fadeOverlay.classList.add("on");

    // While it's black, swap screens + enable pink mode
    setTimeout(() => {
      intro.classList.add("hidden");
      valentineCard.classList.remove("hidden");
      document.body.classList.add("valentine-mode"); // <--- makes background pink
    }, 900);

    // Fade back to reveal Valentine
    setTimeout(() => {
      fadeOverlay.classList.remove("on");
    }, 1300);
  });

  // ===== VALENTINE BEHAVIOR =====
  let noCount = 0;
  let yesScale = 1;
  let dodgeMode = false;
  let moveCooldown = false;

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

  yesBtn.addEventListener("click", () => {
    valentineCard.classList.add("hidden");
    success.classList.remove("hidden");
  });

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    noCount++;

    noBtn.textContent = noTexts[Math.min(noCount, noTexts.length - 1)];
    note.textContent = "Just click YES ❤️";

    growYes(0.25);

    // After a few clicks, NO becomes impossible
    if (noCount >= 5) {
      dodgeMode = true;
      moveNo();
    }
  });

  // Dodge on hover once enabled
  noBtn.addEventListener("mouseenter", () => {
    if (!dodgeMode) return;
    moveNo();
    growYes(0.10);
  });

  // Extra evil: dodge if mouse gets close
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

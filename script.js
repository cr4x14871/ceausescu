(() => {
  const $ = (id) => document.getElementById(id);

  // Intro
  const intro = $("intro");
  const enterBtn = $("enterBtn");
  const fadeOverlay = $("fadeOverlay");
  const jsError = $("jsError");

  // Valentine
  const valentineCard = $("valentineCard");
  const yesBtn = $("yesBtn");
  const noBtn = $("noBtn");
  const success = $("success");
  const note = $("note");
  const buttons = $("buttons");

  const missing = [];
  if (!intro) missing.push("intro");
  if (!enterBtn) missing.push("enterBtn");
  if (!fadeOverlay) missing.push("fadeOverlay");
  if (!valentineCard) missing.push("valentineCard");
  if (!yesBtn) missing.push("yesBtn");
  if (!noBtn) missing.push("noBtn");
  if (!success) missing.push("success");
  if (!note) missing.push("note");
  if (!buttons) missing.push("buttons");

  if (missing.length) {
    console.error("Missing elements:", missing);
    if (jsError) {
      jsError.hidden = false;
      jsError.textContent =
        "JS didn’t start because these IDs are missing in index.html: " +
        missing.join(", ") +
        ". Make sure you copied the files exactly and they are in the repo root.";
    }
    return;
  }

  // --- Stage transition: scary -> fade to black -> valentine ---
  enterBtn.addEventListener("click", () => {
    // fade to black
    fadeOverlay.classList.add("on");

    // while screen is black, swap content
    setTimeout(() => {
      intro.classList.add("hidden");
      valentineCard.classList.remove("hidden");
    }, 900);

    // fade back to reveal valentine
    setTimeout(() => {
      fadeOverlay.classList.remove("on");
    }, 1300);
  });

  // --- Valentine behavior ---
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
    noBtn.style.top  = rand(0, maxY) + "px";
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

  noBtn.addEventListener("mouseenter", () => {
    if (!dodgeMode) return;
    moveNo();
    growYes(0.10);
  });

  buttons.addEventListener("mousemove", (e) => {
    if (!dodgeMode || moveCooldown) return;

    const rect = noBtn.getBoundingClientRect();
    const dist = Math.hypot(
      rect.left + rect.width / 2 - e.clientX,
      rect.top  + rect.height / 2 - e.clientY
    );

    if (dist < 120) {
      moveCooldown = true;
      moveNo();
      setTimeout(() => (moveCooldown = false), 60);
    }
  });
})();

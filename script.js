(() => {
  const $ = (id) => document.getElementById(id);

  // Intro
  const intro = $("intro");
  const enterBtn = $("enterBtn");
  const jsError = $("jsError");

  // Overlay
  const fadeOverlay = $("fadeOverlay");
  const overlayText = $("overlayText");

  // Valentine
  const valentineCard = $("valentineCard");
  const yesBtn = $("yesBtn");
  const noBtn = $("noBtn");
  const success = $("success");
  const note = $("note");
  const buttons = $("buttons");

  const missing = [];
  for (const [k, v] of Object.entries({
    intro, enterBtn, fadeOverlay, overlayText,
    valentineCard, yesBtn, noBtn, success, note, buttons
  })) {
    if (!v) missing.push(k);
  }

  if (missing.length) {
    console.error("Missing elements:", missing);
    if (jsError) {
      jsError.hidden = false;
      jsError.textContent =
        "Lipsesc elemente în index.html: " + missing.join(", ") +
        ". Copiază fișierele exact (în root).";
    }
    return;
  }

  // ---- Stage 1 -> Overlay -> Stage 2 ----
  // Total black time ~4s:
  // 1) fade to black (900ms)
  // 2) show gif+text while black
  // 3) keep black for ~4s total then fade out
  enterBtn.addEventListener("click", () => {
    // Change overlay text to "Ești sigur?"
    overlayText.textContent = "Ești sigur?";

    // Start fade to black
    fadeOverlay.classList.add("on");

    // Show GIF + text ONLY after the fade has mostly gone black
    setTimeout(() => {
      fadeOverlay.classList.add("show-content");
    }, 900);

    // While it's black, swap screens (intro -> valentine)
    setTimeout(() => {
      intro.classList.add("hidden");
      valentineCard.classList.remove("hidden");
    }, 1200);

    // Keep it black around 4 seconds, then hide overlay content + fade out
    setTimeout(() => {
      fadeOverlay.classList.remove("show-content");
    }, 4500);

    setTimeout(() => {
      fadeOverlay.classList.remove("on");
    }, 4900);
  });

  // ---- Valentine logic ----
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

    // After a few NO clicks, make NO dodge
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

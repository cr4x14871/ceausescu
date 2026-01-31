(() => {
  const $ = (id) => document.getElementById(id);

  const intro = $("intro");
  const enterBtn = $("enterBtn");
  const fadeOverlay = $("fadeOverlay");
  const jsError = $("jsError");
  const scaryImg = $("scaryImg");

  const valentineCard = $("valentineCard");
  const yesBtn = $("yesBtn");
  const noBtn = $("noBtn");
  const success = $("success");
  const note = $("note");
  const buttons = $("buttons");

  // Image fallback list (avoids 404 breaking your vibe)
  const scaryFallbacks = [
    "https://media.tenor.com/kd1k2Z7bVfUAAAAC/scary-smile.gif",
    "https://media.tenor.com/7l2pQzKQwKkAAAAC/scary-face.gif",
    "https://media.tenor.com/8xwq9pD8D3UAAAAC/scary.gif"
  ];
  if (scaryImg) {
    let i = 0;
    scaryImg.addEventListener("error", () => {
      i++;
      if (i < scaryFallbacks.length) scaryImg.src = scaryFallbacks[i];
    });
  }

  const missing = [];
  for (const [k, v] of Object.entries({
    intro, enterBtn, fadeOverlay, valentineCard, yesBtn, noBtn, success, note, buttons
  })) {
    if (!v) missing.push(k);
  }
  if (missing.length) {
    console.error("Missing elements with IDs:", missing.join(", "));
    if (jsError) {
      jsError.hidden = false;
      jsError.textContent =
        "Lipsește în index.html următorul ID: " + missing.join(", ") +
        ". Copiază fișierele exact și pune-le în root.";
    }
    return;
  }

  // Stage 1 -> Stage 2
  enterBtn.addEventListener("click", () => {
    fadeOverlay.classList.add("on");
    setTimeout(() => {
      intro.classList.add("hidden");
      valentineCard.classList.remove("hidden");
    }, 900);
    setTimeout(() => {
      fadeOverlay.classList.remove("on");
    }, 1300);
  });

  // Valentine behavior
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

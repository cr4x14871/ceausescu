document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const card = document.getElementById("card");
  const success = document.getElementById("success");
  const note = document.getElementById("note");
  const buttons = document.getElementById("buttons");

  // If any of these are null, IDs don't match and nothing will work.
  if (!yesBtn || !noBtn || !card || !success || !note || !buttons) {
    console.error("Missing element. Check IDs in index.html.");
    return;
  }

  let noCount = 0;
  let yesScale = 1;
  let dodgeMode = false;

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

  function accept() {
    card.classList.add("hidden");
    success.classList.remove("hidden");
  }

  yesBtn.addEventListener("click", accept);

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    noCount++;

    const idx = Math.min(noCount, noTexts.length - 1);
    noBtn.textContent = noTexts[idx];

    note.textContent = "Just click YES ❤️";

    yesScale = Math.min(6, yesScale + 0.25);
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.zIndex = "10";

    if (noCount >= 5) {
      dodgeMode = true;
      moveNo();
    }
  });

  noBtn.addEventListener("mouseenter", () => {
    if (!dodgeMode) return;
    moveNo();
    yesScale = Math.min(7, yesScale + 0.1);
    yesBtn.style.transform = `scale(${yesScale})`;
  });

  buttons.addEventListener("mousemove", (e) => {
    if (!dodgeMode) return;

    const rect = noBtn.getBoundingClientRect();
    const dist = Math.hypot(
      rect.left + rect.width / 2 - e.clientX,
      rect.top + rect.height / 2 - e.clientY
    );

    if (dist < 110) moveNo();
  });
});

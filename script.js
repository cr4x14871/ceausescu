const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");
const success = document.getElementById("success");
const note = document.getElementById("note");

let noCount = 0;
let yesScale = 1;

// Texts similar to the popular version (changes each time you click No)
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

function accept() {
  card.classList.add("hidden");
  success.classList.remove("hidden");
}

yesBtn.addEventListener("click", accept);

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  noCount++;

  // Update No button text (cap at last message)
  const idx = Math.min(noCount, noTexts.length - 1);
  noBtn.textContent = noTexts[idx];

  // Optional small helper line (like some versions)
  note.textContent = "Just click YES ❤️";

  // Make YES bigger each time
  yesScale = Math.min(8, yesScale + 0.22);
  yesBtn.style.transform = `scale(${yesScale})`;

  // If YES gets huge, keep it on top visually
  yesBtn.style.zIndex = "10";
});

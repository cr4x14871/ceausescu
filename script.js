const introText = document.getElementById("introText");
const enterBtn = document.getElementById("enterBtn");
const scaryBox = document.getElementById("scaryBox");
const fade = document.getElementById("fadeOverlay");

const valentine = document.getElementById("valentineCard");
const yes = document.getElementById("yesBtn");
const no = document.getElementById("noBtn");
const buttons = document.getElementById("buttons");
const success = document.getElementById("success");
const note = document.getElementById("note");

let stage = 0;

// STEP 1 -> show gif + change button
enterBtn.onclick = () => {
  if(stage === 0){
    scaryBox.classList.remove("hidden");
    introText.textContent = "Ești sigur?";
    enterBtn.textContent = "DA, sigur";
    stage = 1;
    return;
  }

  // STEP 2 -> fade + go to valentine
  fade.classList.add("on");

  setTimeout(()=>{
    document.getElementById("intro").classList.add("hidden");
    valentine.classList.remove("hidden");
  },800);

  setTimeout(()=>{
    fade.classList.remove("on");
  },4500);
};

// Valentine logic
let yesScale = 1;
let noCount = 0;
let dodge=false;

const noTexts=[
"No","Are you sure?","Really sure??","Think again","Last chance!",
"Please?","Don’t do this","I’m gonna cry","Just say yes"
];

yes.onclick=()=>{
  valentine.classList.add("hidden");
  success.classList.remove("hidden");
};

no.onclick=(e)=>{
  e.preventDefault();
  noCount++;
  no.textContent=noTexts[Math.min(noCount,noTexts.length-1)];
  note.textContent="Just click YES ❤️";

  yesScale+=.3;
  yes.style.transform=`scale(${yesScale})`;

  if(noCount>=4){dodge=true;moveNo();}
};

function moveNo(){
  if(!dodge) return;
  const r=buttons.getBoundingClientRect();
  no.style.position="absolute";
  no.style.left=Math.random()*(r.width-80)+"px";
  no.style.top=Math.random()*(r.height-40)+"px";
}

no.onmouseenter=()=>moveNo();

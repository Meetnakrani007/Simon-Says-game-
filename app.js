let gameSeq = [];
let userSeq = [];

let btns = ["pink", "orange", "blue", "purple"];
let level = 0;
let highScore = 0;
let started = false;

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");

document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 300);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `🚀 Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function check(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) highScore = level;

    h2.innerHTML = `💥 Game Over at Level <b>${level}</b><br>🔁 Press any key to restart`;
    h3.innerHTML = `🏆 Highest Score: <b>${highScore}</b>`;
    reset();
  }
}

function userPress() {
  let btn = this;
  let userColor = btn.getAttribute("id");
  userFlash(btn);
  userSeq.push(userColor);
  check(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", userPress);
});

function reset() {
  level = 0;
  gameSeq = [];
  userSeq = [];
  started = false;
}

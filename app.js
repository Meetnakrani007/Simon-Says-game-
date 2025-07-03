let gameSeq = [];
let userSeq = [];

const btns = ["pink", "orange", "blue", "purple"];
let level = 0;
let highScore = 0;
let started = false;

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const startBtn = document.getElementById("start-btn");

// ✅ Start the game on key press or start button
document.addEventListener("keypress", startGame);
startBtn.addEventListener("click", startGame);

function startGame() {
  if (!started) {
    started = true;
    startBtn.classList.add("hidden");
    level = 0;
    gameSeq = [];
    userSeq = [];
    levelUp();
  }
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  const randIdx = Math.floor(Math.random() * 4);
  const randColor = btns[randIdx];
  const randBtn = document.getElementById(randColor);
  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 150);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 150);
}

function check(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 800);
    }
  } else {
    if (level > highScore) highScore = level;
    h2.innerHTML = `💀 Game Over! Score: <b>${level}</b><br>🎮 Press any key or tap Start`;
    h3.innerHTML = `🏆 Highest Score: <b>${highScore}</b>`;
    reset();
  }
}

function userPress() {
  if (!started) return;
  const btn = this;
  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  userFlash(btn);
  check(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", userPress);
});

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
  startBtn.classList.remove("hidden");
}

const {
  init,
  Sprite,
  GameLoop,
  initKeys,
  keyPressed,
  load,
  imageAssets,
} = kontra;


let { canvas } = init("game");

let scorecard = document.getElementById("yourscore");
let timer = document.getElementById("timing");
let playAgainScoreCard = document.getElementById("scorecardbg");
let totalScoresbg = document.getElementById("totalScoresbg");
let scorecardScore = document.getElementById("scorecardScore");

let timeLimit = document.getElementById("timeLimit");
let speedLimit = document.getElementById("speed");

let table = document.getElementById("tableDOM");

let playGame = document.getElementById("playGame");
let cancelScoreCard = document.getElementById("cancelbtn");
let cancelScoresTable = document.getElementById("cancelScores");
let cancelMobileButtons = document.getElementById("cancelMobileButtons");

let mobileContainerbg = document.getElementById("mobileContainerbg");
let arrowUpBtn = document.getElementById("arrowUp");
let arrowLeftBtn = document.getElementById("arrowLeft");
let arrowDownBtn = document.getElementById("arrowDown");
let arrowRightBtn = document.getElementById("arrowRight");

const input = {
  up: false,
  down: false,
  left: false,
  right: false,
};

arrowUpBtn.addEventListener("touchstart", () => (input.up = true));
arrowUpBtn.addEventListener("touchend", () => (input.up = false));
arrowUpBtn.addEventListener("mousedown", () => (input.up = true));
arrowUpBtn.addEventListener("mouseup", () => (input.up = false));
arrowUpBtn.addEventListener("mouseleave", () => (input.up = false));

arrowLeftBtn.addEventListener("touchstart", () => (input.left = true));
arrowLeftBtn.addEventListener("touchend", () => (input.left = false));
arrowLeftBtn.addEventListener("mousedown", () => (input.left = true));
arrowLeftBtn.addEventListener("mouseup", () => (input.left = false));
arrowLeftBtn.addEventListener("mouseleave", () => (input.left = false));

arrowDownBtn.addEventListener("touchstart", () => (input.down = true));
arrowDownBtn.addEventListener("touchend", () => (input.down = false));
arrowDownBtn.addEventListener("mousedown", () => (input.down = true));
arrowDownBtn.addEventListener("mouseup", () => (input.down = false));
arrowDownBtn.addEventListener("mouseleave", () => (input.down = false));

arrowRightBtn.addEventListener("touchstart", () => (input.right = true));
arrowRightBtn.addEventListener("touchend", () => (input.right = false));
arrowRightBtn.addEventListener("mousedown", () => (input.right = true));
arrowRightBtn.addEventListener("mouseup", () => (input.right = false));
arrowRightBtn.addEventListener("mouseleave", () => (input.right = false));

let youScores = document.getElementById("yourScores");
let score = 0;

const gameOverAudio = new Audio("./assets/audio/over.wav");
const score1 = new Audio("./assets/audio/score1.mp3");
const score3 = new Audio("./assets/audio/score3.wav");


let mobileButtons = document.getElementById("mobileControls");

let scoreArray = JSON.parse(localStorage.getItem("score")) || [];
let speedArray = JSON.parse(localStorage.getItem("speed")) || [];
let timeArray = JSON.parse(localStorage.getItem("time")) || [];

initKeys();

playGame.addEventListener("click", () => {
  let player = Sprite({
    x: 50,
    y: 50,
    width: 10,
    height: 10,
    color: "red",
    dx: Number.parseInt(speedLimit.value),
    dy: Number.parseInt(speedLimit.value),

    update() {
      this.x += this.dx;

      if (this.x <= 0) {
        this.x = 0;
        this.dx = Math.abs(this.dx);
      }
      if (this.x + this.width >= canvas.width) {
        this.x = canvas.width - this.width;
        this.dx = -Math.abs(this.dx);
      }

      if (keyPressed("arrowleft")) {
        this.dx = -Math.abs(this.dx);
      }

      if (keyPressed("arrowright")) {
        this.dx = Math.abs(this.dx);
      }

      if (this.y <= 0) {
        this.y = 0;
        this.dy = Math.abs(this.dy);
      }
      if (this.y + this.height >= canvas.height) {
        this.y = canvas.height - this.height;
        this.dy = -Math.abs(this.dy);
      }

      if (keyPressed("arrowup")) {
        this.y += this.dy;
        this.dy = -Math.abs(this.dy);
      }

      if (keyPressed("arrowdown")) {
        this.y += this.dy;
        this.dy = Math.abs(this.dy);
      }

      if (input.up) {
        this.y += this.dy;
        this.dy = -Math.abs(this.dy);
      }
      if (input.down) {
        this.y += this.dy;
        this.dy = Math.abs(this.dy);
      }
      if (input.left) {
        this.dx = -Math.abs(this.dx);
      }
      if (input.right) {
        this.dx = Math.abs(this.dx);
      }

      timingFun();
    },

    render() {
      this.draw();
    },
  });

  let target = Sprite({
    x: Math.round(Math.random() * canvas.width),
    y: Math.round(Math.random() * canvas.height),
    height: 5,
    width: 5,
    color: "black",

    update() {
      if (
        player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.y + player.height > this.y
      ) {
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        score++;
        score1.play();
      }
    },

    render() {
      this.draw();
    },
  });

  let bonusTarget = Sprite({
    x: Math.random() * canvas.width - player.width,
    y: Math.random() * canvas.height - player.height,
    height: 20,
    width: 20,
    radius: 5,
    color: "blue",
    update() {
      if (
        player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.y + player.height > this.y
      ) {
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        score += 3;
        score3.play();
      }
    },

    render() {
      this.draw();
    },
  });

  let loop = GameLoop({
    update() {
      player.update();
      target.update();
      if (score % 10 === 0 && score !== 0) {
        bonusTarget.update();
      }
      scorecard.innerHTML = `Your Score: ${score}`;
    },
    render() {
      player.render();
      target.render();
      if (score % 10 === 0 && score !== 0) {
        bonusTarget.render();
      }
    },
  });

  loop.start();

  playGame.setAttribute("disabled", true);

  // playagain function

  let time = timeLimit.value;
  let timerId = null;

  function timingFun() {
    if (time <= 0) {
      loop.stop();
      return;
    } else {
      if (timerId) return;

      timerId = setInterval(() => {
        time--;
        timer.innerHTML = `Time: ${time}`;

        if (time <= 0) {
          clearInterval(timerId);
          timerId = null;

          if (playGame.getAttribute("disabled") == "true") {
            playGame.removeAttribute("disabled");
          }

          gameOverAudio.play();

          loop.stop();

          playAgainScoreCard.style.visibility = "visible";
          scorecardScore.innerHTML = `Your Score: ${score}`;

          scoreArray.push(score);
          speedArray.push(Number(speedLimit.value));
          timeArray.push(Number(timeLimit.value));

          localStorage.setItem("score", JSON.stringify(scoreArray));
          localStorage.setItem("speed", JSON.stringify(speedArray));
          localStorage.setItem("time", JSON.stringify(timeArray));

          mobileContainerbg.style.visibility = "hidden";

          displayScoreCard();

          score = 0;
          scorecard.innerHTML = `Your Score: ${score}`;
        }
      }, 1000);
    }
  }
  timingFun();
});

displayScoreCard();

function displayScoreCard() {
  let tr = "";
  let displayScore = JSON.parse(localStorage.getItem("score")) || [];
  let displaySpeed = JSON.parse(localStorage.getItem("speed")) || [];
  let displayTime = JSON.parse(localStorage.getItem("time")) || [];

  for (let i = 0; i < Array.from(displayScore).length; i++) {
    if (displaySpeed[i] == "2") {
      displaySpeed[i] = "Easy";
    }
    if (displaySpeed[i] == "4") {
      displaySpeed[i] = "Medium";
    }
    if (displaySpeed[i] == "6") {
      displaySpeed[i] = "Hard";
    }
    if (Number(displayTime[i]) % 60 == 0) {
      let timeinMin = Number(displayTime[i]) / 60;
      displayTime[i] = `${timeinMin}m`;
    } else {
      displayTime[i] = `${displayTime[i]}s`;
    }
    tr = `<tr>
                  <td>${displayScore[i]}</td>
                  <td>${displaySpeed[i]}</td>
                  <td>${displayTime[i]}</td>
                </tr>`;
    table.innerHTML += tr;
  }
}

cancelScoreCard.addEventListener("click", () => {
  playAgainScoreCard.style.visibility = "hidden";
});

cancelScoresTable.addEventListener("click", () => {
  totalScoresbg.style.visibility = "hidden";
});

youScores.addEventListener("click", () => {
  totalScoresbg.style.visibility = "visible";
});

mobileButtons.addEventListener("click", () => {
  mobileContainerbg.style.visibility = "visible";
});

cancelMobileButtons.addEventListener("click", () => {
  mobileContainerbg.style.visibility = "hidden";
});


window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
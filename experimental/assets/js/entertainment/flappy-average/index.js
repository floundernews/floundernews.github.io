import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";

const GRAVITY = 0.4;
export const width = 600;
export const height = 400;

const startScreen = document.querySelector(".start-screen");
const deathScreen = document.querySelector(".death-screen");
const scoreEl = document.getElementById("score");

let canvas, ctx;

let bottomImgs = [
  "/assets/img/flappy-average/bottom1.png",
  "/assets/img/flappy-average/bottom2.png",
  "/assets/img/flappy-average/bottom3.png",
  "/assets/img/flappy-average/bottom4.png",
  "/assets/img/flappy-average/bottom5.png",
  "/assets/img/flappy-average/bottom6.png",
];
let topImgs = [
  "/assets/img/flappy-average/top1.png",
  "/assets/img/flappy-average/top2.png",
  "/assets/img/flappy-average/top3.png",
  "/assets/img/flappy-average/top4.png",
  "/assets/img/flappy-average/top5.png",
  "/assets/img/flappy-average/top6.png",
];

let player;
let obstacles;
let frames;

let gameloop;

function loadImages() {
  bottomImgs = bottomImgs.map((src) => {
    let img = new Image();
    img.src = src;
    return img;
  });
  topImgs = topImgs.map((src) => {
    let img = new Image();
    img.src = src;
    return img;
  });
}

function setup() {
  loadImages();
  canvas = document.getElementById("flappyCanvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");
  reset();
}

function reset() {
  obstacles = [];
  player = new Player();
  frames = 0;
  ctx.clearRect(0, 0, width, height);
}

function start() {
  reset();
  startScreen.style.opacity = 0;
  deathScreen.style.opacity = 0;
  gameloop = setInterval(gameTick, 1000 / 60);
}

function die() {
  scoreEl.innerText = player.score;
  deathScreen.style.opacity = 100;
  clearInterval(gameloop);
  gameloop = undefined;
  reset();
}

function gameTick() {
  ctx.clearRect(0, 0, width, height);

  // Add obstacles
  if (frames % 60 == 0) {
    player.score++;
    obstacles.push(
      new Obstacle(
        obstacles[obstacles.length - 1]?.right > width
          ? obstacles[obstacles.length - 1].right + 60
          : width,
        topImgs[Math.floor(Math.random() * topImgs.length)],
        bottomImgs[Math.floor(Math.random() * bottomImgs.length)]
      )
    );
  }

  // Update obstacles and remove off screen obstacles
  obstacles = obstacles.filter((obstacle) => obstacle.right >= 0);
  obstacles.forEach((obstacle) => obstacle.update());

  // Update player and check if dead
  player.vel += GRAVITY;
  player.update(frames % 10 == 0);
  if (player.isDead(obstacles)) {
    die();
    return;
  }

  // Draw obstacles & players
  player.draw(ctx, gameloop);
  obstacles.forEach((obstacle) => obstacle.draw(ctx));

  drawScore(player.score);

  frames++;
}

function drawScore(score) {
  ctx.font = "24px Open Sans";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, width - 10, 10);
}

function handleKeyPress(e) {
  if (e.key == " ") {
    e.preventDefault();
    if (!gameloop) start();
    player.jump();
  }
}

setup();
window.addEventListener("keydown", handleKeyPress);

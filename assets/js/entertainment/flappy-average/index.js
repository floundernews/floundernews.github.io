import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";

const GRAVITY = 0.4;
export const width = 600;
export const height = 400;

let canvas, ctx;

let player;
let obstacles = [];
let paused = true;
let frames;

function setup() {
  canvas = document.getElementById("gameCanvas");
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");
  drawBackground();
}

function start() {
  player = new Player();
  frames = 0;
  paused = false;
  setInterval(gameTick, 1000 / 60);
}

function gameTick() {
  ctx.clearRect(0, 0, width, height);
  drawBackground();

  // Add obstacles
  if (frames % 60 == 0) obstacles.push(new Obstacle());

  // Update obstacles and remove off screen obstacles
  obstacles = obstacles.filter((obstacle) => obstacle.left >= 20);
  obstacles.forEach((obstacle) => obstacle.update());

  // Update player and check if dead
  player.vel += GRAVITY;
  player.update();

  // Draw obstacles & players
  player.draw(ctx);
  obstacles.forEach((obstacle) => obstacle.draw(ctx));

  frames++;
}

function drawBackground() {
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(20, height - 1);
  ctx.lineTo(width, height - 1);
  ctx.stroke();
  ctx.save();
  ctx.rotate(-Math.PI / 2);
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Average Mark", -height / 2, 15);
  ctx.restore();
}

function handleKeyPress(e) {
  if (e.key == " ") {
    if (paused) start();
    player.jump();
  }
}

setup();
window.addEventListener("keydown", handleKeyPress);

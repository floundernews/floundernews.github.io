import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";

const GRAVITY = 0.4;
export const width = 600;
export const height = 400;

const startScreen = document.querySelector(".start-screen");
const deathScreen = document.querySelector(".death-screen");

let canvas, ctx;

let player;
let obstacles;
let frames;

let gameloop;

function setup() {
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
  deathScreen.style.opacity = 100;
  clearInterval(gameloop);
  gameloop = undefined;
  reset();
}

function gameTick() {
  ctx.clearRect(0, 0, width, height);

  // Add obstacles
  if (frames % 60 == 0) obstacles.push(new Obstacle());

  // Update obstacles and remove off screen obstacles
  obstacles = obstacles.filter((obstacle) => obstacle.right >= 0);
  obstacles.forEach((obstacle) => obstacle.update());

  // Update player and check if dead
  player.vel += GRAVITY;
  player.update(frames % 10 == 0);
  if(player.isDead(obstacles)) {
    die();
    return;
  }

  // Draw obstacles & players
  player.draw(ctx, gameloop);
  obstacles.forEach((obstacle) => obstacle.draw(ctx));

  frames++;
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

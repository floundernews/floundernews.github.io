import { width, height } from "./index.js";

export class Obstacle {
  static spacing = 150;

  constructor(topText, bottomText) {
    this.topText = topText;
    this.bottomText = bottomText;
    this.x = width;
    this.top = Math.floor((Math.random() * height) / 3) + height / 20;
    this.bottom = this.top + Obstacle.spacing;
    this.width = 20;
    this.vel = -4;
  }

  update() {
    this.x += this.vel;
  }

  draw(ctx) {
    ctx.fillStyle = "darkblue";
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, this.bottom, this.width, height - this.bottom);
  }

  hits(player) {
    return (
      (player.top < this.top || player.bottom > this.bottom) &&
      player.left > this.left && player.left < this.right
    );
  }

  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}

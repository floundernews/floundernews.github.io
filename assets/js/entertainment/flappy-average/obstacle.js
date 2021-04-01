import { width, height } from "./index.js";

export class Obstacle {
  static spacing = 200;

  constructor(topText, bottomText) {
    this.topText = topText;
    this.bottomText = bottomText;
    this.x = width;
    this.y = height / 2;
    this.width = 20;
    this.height = 20;
    this.vel = -4;
  }

  update() {
    this.x += this.vel;
  }

  draw(ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}

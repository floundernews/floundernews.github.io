import { width, height } from "./index.js";

export class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 50;
    this.height = 50;
    this.vel = 0;
    this.score = 0;
    this.tail = [];
  }

  update() {
    this.vel = Math.min(50, Math.max(-50, this.vel));
    this.y += this.vel;
    if (this.y <= 0) {
      this.y = 0;
      this.vel = 0;
    } else if (this.y >= height - this.height) {
      this.y = height - this.height;
      this.vel = 0;
    }

    this.tail.unshift(this.y);
    if (this.tail.length > this.x - 20) this.tail.pop();
  }

  draw(ctx) {
    ctx.beginPath();
    moveTo(this.x + this.width / 2, this.y + this.height / 2);
    for (let i = 0; i < this.tail.length; i++) {
      ctx.lineTo(this.x - i + 1, this.tail[i]);
    }
    ctx.stroke();
  }

  jump() {
    this.vel -= 10;
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

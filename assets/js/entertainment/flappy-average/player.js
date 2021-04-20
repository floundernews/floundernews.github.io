import { width, height } from "./index.js";

export class Player {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 25;
    this.height = 25;
    this.vel = 0;
    this.score = 0;
    this.tail = [];
  }

  update(addToTail) {
    this.vel = Math.min(50, Math.max(-50, this.vel));
    this.y += this.vel;
    // if (this.y >= height - this.height) {
    //   this.y = height - this.height;
    //   this.vel = 0;
    // }

    this.tail.forEach((piece) => (piece.x += 4));

    if (addToTail) {
      this.tail.unshift({ x: 0, y: this.y });
      if (this.tail.length > this.x) this.tail.pop();
    }
  }

  draw(ctx, gl) {
    ctx.beginPath();
    // ctx.moveTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.moveTo(this.x, this.y);
    for (let i = 0; i < this.tail.length; i++) {
      ctx.lineTo(this.x - this.tail[i].x, this.tail[i].y);
    }
    ctx.stroke();
  }

  jump() {
    this.vel -= 10;
  }

  isDead(obstacles) {
    if (this.y >= height) return true;
    let result = false;
    obstacles.forEach((obstacle) => {
      if (obstacle.hits(this)) {
        result = true;
        return;
      }
    });
    return result;
  }

  get top() {
    return this.y;
  }
  get bottom() {
    // return this.y + this.height;
    return this.y;
  }
  get left() {
    return this.x;
  }
  get right() {
    // return this.x + this.width;
    return this.x;
  }
}

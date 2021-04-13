import { width, height } from "./index.js";

export class Obstacle {
  static spacing = 150;

  constructor(x, topImg, bottomImg) {
    this.x = x;
    this.topImg = topImg;
    this.bottomImg = bottomImg;
    this.top = Math.floor((Math.random() * height) / 3) + height / 20;
    this.bottom = this.top + Obstacle.spacing;
    this.topWidth = this.topImg.width * (this.top / this.topImg.height);
    this.bottomWidth = this.bottomImg.width * ((height - this.bottom) / this.bottomImg.height);
    this.width = Math.max(this.topWidth, this.bottomWidth);
    this.vel = -4;
  }

  update() {
    this.x += this.vel;
  }

  draw(ctx) {
    ctx.drawImage(
      this.topImg,
      this.x,
      0,
      this.topImg.width * (this.top / this.topImg.height),
      this.top
    );
    ctx.drawImage(
      this.bottomImg,
      this.x,
      this.bottom,
      this.bottomImg.width * ((height - this.bottom) / this.bottomImg.height),
      height - this.bottom
    );
  }

  hits(player) {
    return (
      (player.top < this.top &&
        player.left > this.left &&
        player.left < this.topRight) ||
      (player.bottom > this.bottom &&
        player.left > this.left &&
        player.left < this.bottomRight)
    );
  }

  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get topRight() {
    return this.x + this.topWidth;
  }
  get bottomRight() {
    return this.x + this.bottomWidth;
  }
}

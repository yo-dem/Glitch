class Platform {
  constructor(posX, posY, width, height) {
    this.position = createVector(posX, posY);
    this.dimension = createVector(width, height);
  }

  show() {
    rect(this.position.x, this.position.y, this.dimension.x, this.dimension.y);
  }

  update() {}
}

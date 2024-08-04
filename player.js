const GRAVITY = 0.2;
const FRICTION = 0.09;
const MAXSPEED = 3;
const JUMPHEIGHT = 5;

class Player {
  constructor(posX, posY, width, height, platforms) {
    this.collisionHandler = new CollisionHandler();
    this.position = createVector(posX, posY);
    this.dimension = createVector(width, height);

    this.platforms = platforms;
    this.speed = createVector(0, 0);

    this.gravity = GRAVITY;
    this.friction = FRICTION;
    this.maxSpeed = MAXSPEED;
    this.jumpHeight = JUMPHEIGHT;
  }

  show() {
    this.processDraw();
    this.update();
  }

  processDraw() {
    push();
    rectMode(RADIUS);
    translate(this.position.x, this.position.y);
    if (this.speed.y !== 0) {
      this.rotationAmount = this.position.x / 30;
    } else {
      this.rotationAmount = this.position.x / 10;
    }
    if (this.speed.x !== 0) {
      rotate(this.rotationAmount);
    }
    rect(0, 0, this.dimension.x, this.dimension.y);
    pop();
  }

  update() {
    this.position.add(this.speed);
    this.speed.y += this.gravity;

    this.processMovements();
    this.processPlatformCollisions();
  }

  processMovements() {
    if (this.isGoingRight) {
      this.speed.x = this.maxSpeed;
    } else if (this.isGoingLeft) {
      this.speed.x = -this.maxSpeed;
    } else {
      this.frictionBrake();
    }
  }

  processPlatformCollisions() {
    this.platforms.forEach((platform) => {
      this.collisionHandler.checkPlayerPlatformCollisions(this, platform);
    });
  }

  goLeft() {
    this.isGoingRight = false;
    this.isGoingLeft = true;
  }

  goRight() {
    this.isGoingRight = true;
    this.isGoingLeft = false;
  }

  goJump() {
    if (this.speed.y === 0) {
      this.speed.y = -this.jumpHeight;
    }
  }

  stopAll() {
    this.isGoingRight = false;
    this.isGoingLeft = false;
  }

  frictionBrake() {
    if (this.speed.x > 0) {
      this.speed.x -= this.friction;
      if (this.speed.x <= 0) {
        this.speed.x = 0;
      }
    } else if (this.speed.x < 0) {
      this.speed.x += this.friction;
      if (this.speed.x >= 0) {
        this.speed.x = 0;
      }
    }
  }
}

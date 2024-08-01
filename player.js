const GRAVITY = 0.2;
const FRICTION = 0.09;
const MAXSPEED = 3;
const JUMPHEIGHT = 5;

class Player {
	constructor(posX, posY, width, height, platforms) {
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
			this.checkVerticalCollision(platform);
			this.checkHorizontalCollision(platform);
		});
	}

	checkVerticalCollision(platform) {
		const isAbovePlatform = this.position.y <= platform.position.y;
		const willFallOnPlatform = this.position.y + this.speed.y >= platform.position.y - this.dimension.y;
		const isWithinHorizontalBounds = this.position.x + this.dimension.x >= platform.position.x && this.position.x <= platform.position.x + platform.dimension.x;
		const isFalling = this.speed.y > 0;
		if (isAbovePlatform && willFallOnPlatform && isWithinHorizontalBounds && isFalling) {
			this.speed.y = 0;
			this.position.y = platform.position.y - this.dimension.y;
			if (platform instanceof MovingPlatform) {
				const deltaX = platform.position.x - platform.prevPosition.x;
				const deltaY = platform.position.y - platform.prevPosition.y;
				this.position.x += deltaX;
				this.position.y += deltaY;
			}
		}
	}

	checkHorizontalCollision(platform) {
		const isWithinVerticalBounds = this.position.y + this.dimension.y > platform.position.y && this.position.y < platform.position.y + platform.dimension.y;
		const isCrossingFromLeft = this.position.x <= platform.position.x + platform.dimension.x && this.position.x >= platform.position.x;
		const isCrossingFromRight = this.position.x + this.dimension.x >= platform.position.x && this.position.x + this.dimension.x <= platform.position.x + platform.dimension.x;

		if (isWithinVerticalBounds && (isCrossingFromLeft || isCrossingFromRight)) {
			const isBlockedMovingLeft = this.speed.x < 0 && this.position.x + this.dimension.x > platform.position.x + platform.dimension.x;
			const isBlockedMovingRight = this.speed.x > 0 && this.position.x < platform.position.x;

			if (isBlockedMovingLeft || isBlockedMovingRight) {
				this.speed.x = 0;
			}
		}
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

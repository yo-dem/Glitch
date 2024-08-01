class MovingPlatform extends Platform {
	constructor(posX, posY, width, height, speedX, speedY, rangeX, rangeY) {
		super(posX, posY, width, height);
		this.startPos = createVector(posX, posY);
		this.speed = createVector(speedX, speedY);
		this.range = createVector(rangeX, rangeY);
		this.prevPosition = createVector(posX, posY);
	}

	update() {
		this.prevPosition.set(this.position);
		if (this.speed.x !== 0) {
			this.position.x = this.startPos.x + sin(frameCount * this.speed.x) * this.range.x;
		}
		if (this.speed.y !== 0) {
			this.position.y = this.startPos.y + sin(frameCount * this.speed.y) * this.range.y;
		}
	}

	show() {
		this.update();
		super.show();
	}
}

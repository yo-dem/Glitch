let player;
let platforms = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	generatePlatforms();
	player = new Player(width / 2, height / 2, 10, 10, platforms);
}

function draw() {
	background(100, 40, 200);

	platforms.forEach((platform) => platform.show());
	player.show();
	handleInput();
}

function generatePlatforms() {
	platforms.push(new Platform(-5000, height - 20, width + 5000, 20));
	platforms.push(new MovingPlatform(400, 500, 300, 20, 0.01, 0.01, 100, 0));
	platforms.push(new MovingPlatform(800, 500, 300, 20, 0.01, 0.01, 0, 100));
}

function handleInput() {
	if (keyIsDown(LEFT_ARROW)) {
		player.goLeft();
	} else if (keyIsDown(RIGHT_ARROW)) {
		player.goRight();
	} else {
		player.stopAll();
	}

	if (keyIsDown(32)) {
		player.goJump();
	}
}

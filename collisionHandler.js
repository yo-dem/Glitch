class CollisionHandler {
  constructor() {}

  checkPlayerPlatformCollisions(player, platform) {
    this.checkVerticalCollision(player, platform);
    this.checkHorizontalCollision(player, platform);
  }

  checkVerticalCollision(player, platform) {
    const isAbovePlatform = player.position.y <= platform.position.y;
    const willFallOnPlatform =
      player.position.y + player.speed.y >=
      platform.position.y - player.dimension.y;
    const isWithinHorizontalBounds =
      player.position.x + player.dimension.x >= platform.position.x &&
      player.position.x <= platform.position.x + platform.dimension.x;
    const isFalling = player.speed.y > 0;
    if (
      isAbovePlatform &&
      willFallOnPlatform &&
      isWithinHorizontalBounds &&
      isFalling
    ) {
      player.speed.y = 0;
      player.position.y = platform.position.y - player.dimension.y;
      if (platform instanceof MovingPlatform) {
        const deltaX = platform.position.x - platform.prevPosition.x;
        const deltaY = platform.position.y - platform.prevPosition.y;
        player.position.x += deltaX;
        player.position.y += deltaY;
      }
    }
  }

  checkHorizontalCollision(player, platform) {
    const isWithinVerticalBounds =
      player.position.y + player.dimension.y > platform.position.y &&
      player.position.y < platform.position.y + platform.dimension.y;
    const isCrossingFromLeft =
      player.position.x <= platform.position.x + platform.dimension.x &&
      player.position.x >= platform.position.x;
    const isCrossingFromRight =
      player.position.x + player.dimension.x >= platform.position.x &&
      player.position.x + player.dimension.x <=
        platform.position.x + platform.dimension.x;

    if (isWithinVerticalBounds && (isCrossingFromLeft || isCrossingFromRight)) {
      const isBlockedMovingLeft =
        player.speed.x < 0 &&
        player.position.x + player.dimension.x >
          platform.position.x + platform.dimension.x;
      const isBlockedMovingRight =
        player.speed.x > 0 && player.position.x < platform.position.x;

      if (isBlockedMovingLeft || isBlockedMovingRight) {
        player.speed.x = 0;
      }
    }
  }
}

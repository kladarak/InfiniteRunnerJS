function PlatformSpawner()
{
	this.update = function(world)
	{
		var shouldCreateAnotherPlatform = true;
		
		if (world.platforms.length > 0)
		{
			var lastPlatform = world.platforms[world.platforms.length - 1];
			var platformRight = lastPlatform.x + lastPlatform.width;
			var distanceFromScreenRight = world.renderer.screenWidth - platformRight;
			
			shouldCreateAnotherPlatform = (distanceFromScreenRight >= defaultTileWidth);
		}
		
		if (shouldCreateAnotherPlatform)
		{
			world.platforms.push(createRandomPlatform(world.resources.ground, world.renderer));
		}
	};
}

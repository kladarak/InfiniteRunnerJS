function PlatformSpawner()
{
	this.update = function(world)
	{
		var shouldCreateAnotherPlatform = true;
		
		if (world.platforms.length > 0)
		{
			var lastPlatform = world.platforms[world.platforms.length - 1];
			var distanceFromScreenRight = world.renderer.screenWidth - lastPlatform.rect.right();
			
			shouldCreateAnotherPlatform = (distanceFromScreenRight >= defaultTileWidth);
		}
		
		if (shouldCreateAnotherPlatform)
		{
			world.platforms.push(createRandomPlatform(world.resources.ground, world.renderer));
		}
	};
}

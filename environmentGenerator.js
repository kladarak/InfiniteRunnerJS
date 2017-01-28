function EnvironmentGenerator(world)
{
	var platformFactory	= new PlatformFactory(world.resources.ground);
	var fruitFactory	= new FruitFactory(world.resources.fruit);
	var envDecorFactory = new EnvironmentDecorationFactory(world.resources.envDecor);
	
	var shouldCreateAnotherSection = function(world)
	{
		var anotherSectionNeeded = true;
		
		if (world.platforms.length > 0)
		{
			var lastPlatform = world.platforms[world.platforms.length - 1];
			var toTheRightOfScreen = world.camera.pos.x + world.renderer.screenWidth;
			var distanceFromScreenRight = toTheRightOfScreen - lastPlatform.rect.right();
			
			anotherSectionNeeded = (distanceFromScreenRight >= defaultTileWidth);
		}
		
		return anotherSectionNeeded;
	};
	
	var createNewPlatform = function(world)
	{
		var newPlatform = platformFactory.createRandomPlatform();
		
		newPlatform.rect.pos.x = world.camera.pos.x + world.renderer.screenWidth;
		newPlatform.rect.pos.y = world.renderer.screenHeight - newPlatform.rect.height;
		
		world.objects.push(newPlatform);
		world.platforms.push(newPlatform);
		
		return newPlatform;
	};
	
	var addDecorations = function(world, platform)
	{
		var platformWidth = platform.rect.width;
		var widthUnits = platformWidth / defaultTileWidth;
		var numDecorations = getRandomInt(1, widthUnits * 0.7);
		
		for (var i = 0; i < numDecorations; ++i)
		{
			var decor = envDecorFactory.createRandomDecoration();
			var platformSpace = platformWidth - decor.rect.width;
			
			decor.rect.pos.x = platform.rect.left() + getRandomFloat(0, platformSpace);
			decor.rect.pos.y = platform.rect.top() - decor.rect.height;
			
			world.objects.push(decor);
		}
	};
	
	var createFruitOnPlatform = function(world, platform)
	{
		var platformWidth = platform.rect.width;
		var distanceBetweenFruit = Fruit.size * 1.3;
		
		var maxNumFruit = Math.floor(platformWidth / distanceBetweenFruit);
		maxNumFruit = Math.min(maxNumFruit, 5);
		var numFruit = getRandomInt(0, maxNumFruit) + 1;
		
		var fruitRowWidth = numFruit * distanceBetweenFruit;
		var platformSpace = platformWidth - fruitRowWidth;

		var x = platform.rect.left() + getRandomFloat(0, platformSpace);
		var y = platform.rect.top() - 200;
		
		for (var i = 0; i < numFruit; ++i)
		{
			var fruit = fruitFactory.createRandomFruit();
			fruit.rect.pos.x = x + (i * distanceBetweenFruit);
			fruit.rect.pos.y = y;
			
			world.objects.push(fruit);
		}
	};
	
	this.update = function(world)
	{
		if (!shouldCreateAnotherSection(world))
		{
			return;
		}
		
		var newPlatform = createNewPlatform(world);
		addDecorations(world, newPlatform);
		createFruitOnPlatform(world, newPlatform);
	};
}

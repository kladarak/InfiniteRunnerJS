function EnvironmentGenerator(world)
{
	var groundFactory	= new groundFactory(world.resources.ground);
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
	
	var createNewGround = function(world)
	{
		var newGround = groundFactory.createRandomPlatform();
		
		newGround.rect.pos.x = world.camera.pos.x + world.renderer.screenWidth;
		newGround.rect.pos.y = world.renderer.screenHeight - newGround.rect.height;
		
		world.objects.push(newGround);
		world.platforms.push(newGround);
		
		return newGround;
	};
	
	var placeInWorldOnGround = function(object, world, ground)
	{
		var groundWidth = ground.rect.width;
		var groundSpace = groundWidth - object.rect.width;
		
		object.rect.pos.x = ground.rect.left() + getRandomFloat(0, groundSpace);
		object.rect.pos.y = ground.rect.top() - object.rect.height;
		
		world.objects.push(object);
	};
	
	var addObjects = function(world, ground, probability, objFactory)
	{
		var groundWidth = ground.rect.width;
		var widthUnits = groundWidth / defaultTileWidth;
		var numObjects = getRandomInt(0, widthUnits * probability);
		
		var objects = [];
		
		for (var i = 0; i < numObjects; ++i)
		{
			var obj = objFactory();
			placeInWorldOnGround(obj, world, ground);
			objects.push(obj);
		}
		
		return objects;
	};
	
	var addDecorations = function(world, ground)
	{
		addObjects(world, ground, 0.3, envDecorFactory.createRandomTrees);
		addObjects(world, ground, 0.7, envDecorFactory.createRandomBush);
		addObjects(world, ground, 0.2, envDecorFactory.createStone);

		var crates = addObjects(world, ground, 0.2, envDecorFactory.createCrate);
		world.platforms.push.apply(world.platforms, crates);

		addObjects(world, ground, 0.2, envDecorFactory.createRandomSigns);
	};
	
	var createFruitOnPlatform = function(world, ground)
	{
		var groundWidth = ground.rect.width;
		var distanceBetweenFruit = Fruit.size * 1.3;
		
		var maxNumFruit = Math.floor(groundWidth / distanceBetweenFruit);
		maxNumFruit = Math.min(maxNumFruit, 5);
		var numFruit = getRandomInt(0, maxNumFruit) + 1;
		
		var fruitRowWidth = numFruit * distanceBetweenFruit;
		var groundSpace = groundWidth - fruitRowWidth;

		var x = ground.rect.left() + getRandomFloat(0, groundSpace);
		var y = ground.rect.top() - 200;
		
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
		
		var newGround = createNewGround(world);
		addDecorations(world, newGround);
		createFruitOnPlatform(world, newGround);
	};
}

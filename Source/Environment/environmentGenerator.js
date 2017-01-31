function EnvironmentGenerator(world)
{
	var groundFactory	= new PlatformFactory(world.resources.ground);
	var fruitFactory	= new FruitFactory(world.resources.fruit);
	var envDecorFactory = new EnvironmentDecorationFactory(world.resources.envDecor);
	
	var generatedX = world.renderer.screenWidth;
	var defaultMinGapSize = defaultTileWidth;
	var minGapSize = defaultMinGapSize;
	
	var shouldCreateAnotherSection = function(world)
	{
		var toTheRightOfScreen = world.camera.pos.x + world.renderer.screenWidth;
		var gap = toTheRightOfScreen - generatedX;
		
		return gap >= minGapSize;
	};
	
	var createNewGround = function(world)
	{
		var newGround = groundFactory.createRandomPlatform();
		
		newGround.rect.pos.x = world.camera.pos.x + world.renderer.screenWidth;
		newGround.rect.pos.y = world.renderer.screenHeight - newGround.rect.height;
		
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
		var y = ground.rect.top() - getRandomFloat(100, 400);
		
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
		
		var newGrounds = [];
		for (var i = 1; i <= getRandomInt(1, 5); ++i)
		{
			newGrounds.push( createNewGround(world) );
		}
		
		// scatter the ground
		{
			var ground = newGrounds[0];
			
			for (var i = 1; i < newGrounds.length; ++i)
			{
				var groundX = getRandomFloat(ground.rect.left(), ground.rect.right());
				groundX	+= defaultMinGapSize;
				ground = newGrounds[i];
				ground.rect.pos.x = groundX;
			}
		}
		
		// sort height to lowest, so that they will get drawn in the correct order
		newGrounds.sort( function (a,b) { return b.heightUnits - a.heightUnits; } );
		
		for (ground of newGrounds)
		{
			world.objects.push(ground);
			world.platforms.push(ground);
			
			addDecorations(world, ground);
			createFruitOnPlatform(world, ground);
			
			generatedX = Math.max(ground.rect.right(), generatedX);
		}
		
		minGapSize = getRandomFloat(defaultMinGapSize, defaultMinGapSize * 4);
	};
}

function EnvironmentGenerator(gameContext)
{
	// Object caches for ease
	var world		= gameContext.world;
	var camera		= gameContext.world.camera;
	var viewport 	= gameContext.renderer.viewport;

	// Factories
	var groundFactory	= new PlatformFactory(gameContext.resources.ground);
	var fruitFactory	= new FruitFactory(gameContext.resources.fruit);
	var envDecorFactory = new EnvironmentDecorationFactory(gameContext.resources.envDecor);
	
	var generatedX			= viewport.width;
	var defaultMinGapSize	= 50;
	var minGapSize			= defaultMinGapSize;
	
	var shouldCreateAnotherSection = function()
	{
		var toTheRightOfScreen = camera.pos.x + viewport.width;
		var gap = toTheRightOfScreen - generatedX;
		return gap >= minGapSize;
	};
	
	var createNewGround = function()
	{
		var newGround = groundFactory.createRandomPlatform();
		
		newGround.rect.pos.x = camera.pos.x + viewport.width;
		newGround.rect.pos.y = viewport.height - newGround.rect.height;
		
		return newGround;
	};
	
	var placeOnGround = function(object, ground)
	{
		var groundWidth = ground.rect.width;
		var groundSpace = groundWidth - object.rect.width;
		
		object.rect.pos.x = ground.rect.left() + getRandomFloat(0, groundSpace);
		object.rect.pos.y = ground.rect.top() - object.rect.height;
		
		world.objects.push(object);
	};
	
	var addObjects = function(ground, probability, objFactory)
	{
		var groundWidth = ground.rect.width;
		var widthUnits = groundWidth / defaultTileWidth;
		var numObjects = getRandomInt(0, widthUnits * probability);
		
		var objects = [];
		
		for (var i = 0; i < numObjects; ++i)
		{
			var obj = objFactory();
			placeOnGround(obj, ground);
			objects.push(obj);
		}
		
		return objects;
	};
	
	var addDecorations = function(ground)
	{
		addObjects(ground, 0.3, envDecorFactory.createRandomTrees);
		addObjects(ground, 0.7, envDecorFactory.createRandomBush);
		addObjects(ground, 0.2, envDecorFactory.createStone);

		var crates = addObjects(ground, 0.2, envDecorFactory.createCrate);
		world.platforms.push.apply(world.platforms, crates);

		addObjects(ground, 0.2, envDecorFactory.createRandomSigns);
	};
	
	var createFruitOnPlatform = function(ground)
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
	
	this.update = function()
	{
		if (!shouldCreateAnotherSection())
		{
			return;
		}
		
		var newGrounds = [];
		for (var i = 1; i <= getRandomInt(1, 5); ++i)
		{
			newGrounds.push( createNewGround() );
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
			
			addDecorations(ground);
			createFruitOnPlatform(ground);
			
			generatedX = Math.max(ground.rect.right(), generatedX);
		}
		
		minGapSize = getRandomFloat(defaultMinGapSize, defaultMinGapSize * 4);
	};
}

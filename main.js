var theRenderer = null;
var resources = {};
var platforms = [];

function Platform(widthUnits, heightUnits, groundImages)
{
	this.tiles = [];
	this.x = 0;
	this.y = 0;
	this.width = defaultTileWidth * widthUnits;
	this.height = defaultTileHeight * heightUnits;
	this.isOnScreen = true;
	
	for (var x = 0; x < widthUnits; ++x)
	{
		for (var y = 0; y < heightUnits; ++y)
		{
			var img = null;
			
			if (x === 0)
			{
				if (y === 0)
				{
					img = groundImages.topLeft;
				}
				else
				{
					img = groundImages.left;
				}
			}
			else if (x === (widthUnits - 1))
			{
				if (y === 0)
				{
					img = groundImages.topRight;
				}
				else
				{
					img = groundImages.right;
				}
			}
			else
			{
				if (y === 0)
				{
					img = groundImages.topMiddle;
				}
				else
				{
					img = groundImages.middle;
				}
			}
			
			var tile = new EnvTile(img);
			tile.x = x * defaultTileWidth;
			tile.y = y * defaultTileHeight;
			tile.width = defaultTileWidth;
			tile.height = defaultTileHeight;
			this.tiles.push(tile);
		}
	}
	
	this.update = function(renderer)
	{
		this.x -= 2;
		
		this.isOnScreen = (this.x + this.width) > 0;
	};
	
	this.draw = function(renderer)
	{
		var ctx = renderer.context;
		ctx.save();
		
		ctx.translate(this.x, this.y);
		
		this.tiles.forEach(function(tile)
		{
			tile.draw(renderer);
		});
		
		ctx.restore();
	};
}

function getRandomInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function createPlatform(groundImages)
{
	var widthUnits = getRandomInt(2, 20);
	var heightUnits = getRandomInt(1, 8);
	
	var platform = new Platform(widthUnits, heightUnits, groundImages);
	platform.x = theRenderer.screenWidth;
	platform.y = theRenderer.screenHeight - platform.height;
	
	return platform;
}

function init()
{
	var canvas = document.getElementById("TheCanvas");
	theRenderer = new Renderer(canvas);
	
	resources.ground = {};
	resources.ground.topLeft	= createImageUsingFilename("1");
	resources.ground.topMiddle	= createImageUsingFilename("2");
	resources.ground.topRight	= createImageUsingFilename("3");
	resources.ground.left		= createImageUsingFilename("4");
	resources.ground.middle		= createImageUsingFilename("5");
	resources.ground.right		= createImageUsingFilename("6");
	
	platforms.push(createPlatform(resources.ground));
}

function updateObject(inObject)
{
	inObject.update(theRenderer);
}

function drawObject(inObject)
{
	inObject.draw(theRenderer);
}

function forEachObject(inObjects, inFunc)
{
	inObjects.forEach(inFunc);
}

function update()
{
	forEachObject(platforms, updateObject);
	
	// TODO: Will the discarded platforms get GC'd?
	platforms = platforms.filter(function(platform)
	{
		return platform.isOnScreen;
	});
	
	var shouldCreateAnotherPlatform = true;
	
	if (platforms.length > 0)
	{
		var lastPlatform = platforms[platforms.length - 1];
		var platformRight = lastPlatform.x + lastPlatform.width;
		var distanceFromScreenRight = theRenderer.screenWidth - platformRight;
		
		shouldCreateAnotherPlatform = (distanceFromScreenRight >= defaultTileWidth);
	}
	
	if (shouldCreateAnotherPlatform)
	{
		platforms.push(createPlatform(resources.ground));
	}
}

function draw()
{
    theRenderer.clearScreen();

	forEachObject(platforms, drawObject);
}

function tick()
{
	if (numResourcesLoading > 0)
	{
		return;
	}
	
	update();
	draw();
}

function main()
{
	init();
	setInterval(tick, 10);
}

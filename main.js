var renderer = null;
var resources = {};
var platforms = [];
var background = null;

function init()
{
	var canvas = document.getElementById("TheCanvas");
	
	renderer = new Renderer(canvas);
	
	resources = new Resources();
	
	background = new EnvTile(resources.background);
	background.width = 1000;
	background.height = 750;
	
	platforms.push(createRandomPlatform(resources.ground, renderer));
}

function updateObject(inObject)
{
	inObject.update(renderer);
}

function drawObject(inObject)
{
	inObject.draw(renderer);
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
		var distanceFromScreenRight = renderer.screenWidth - platformRight;
		
		shouldCreateAnotherPlatform = (distanceFromScreenRight >= defaultTileWidth);
	}
	
	if (shouldCreateAnotherPlatform)
	{
		platforms.push(createRandomPlatform(resources.ground, renderer));
	}
}

function draw()
{
    //renderer.clearScreen();
	
	drawObject(background);

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

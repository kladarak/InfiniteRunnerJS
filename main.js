var renderer = null;
var resources = {};

var background = null;
var platforms = [];
var player = null;

function onKeyDown(e)
{
	if (e.keyCode == 32)
	{
		player.setJumping(true);
	}
}

function onKeyUp(e)
{
	if (e.keyCode == 32)
	{
		player.setJumping(false);
	}
}

function init()
{
	var canvas = document.getElementById("TheCanvas");
	
	renderer = new Renderer(canvas);
	resources = new Resources();
	
	background = new EnvTile(resources.background);
	background.width = 1000;
	background.height = 750;
	
	var firstPlatform = new Platform(20, 3, resources.ground);
	firstPlatform.x = 0;
	firstPlatform.y = renderer.screenHeight - firstPlatform.height;
	platforms.push(firstPlatform);
	
	player = new Player();
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
	
	player.update(renderer, platforms);
}

function draw()
{
    //renderer.clearScreen();
	
	drawObject(background);

	forEachObject(platforms, drawObject);
	
	drawObject(player);
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

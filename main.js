var world =
{
	background: null,
	platforms: [],
	player: null,
	hud: null,
	
	renderer: null,
	resources: null,
};

function onKeyDown(e)
{
	if (e.keyCode == 32)
	{
		world.player.setJumping(true);
	}
}

function onKeyUp(e)
{
	if (e.keyCode == 32)
	{
		world.player.setJumping(false);
	}
}

function init()
{
	var canvas = document.getElementById("TheCanvas");
	
	world.renderer = new Renderer(canvas);
	world.resources = new Resources();
	
	world.background = new EnvTile(world.resources.background);
	world.background.width = 1000;
	world.background.height = 750;
	
	var firstPlatform = new Platform(20, 3, world.resources.ground);
	firstPlatform.x = 0;
	firstPlatform.y = world.renderer.screenHeight - firstPlatform.height;
	world.platforms.push(firstPlatform);
	
	world.player = new Player();
	
	world.hud = new Hud();
}

function updateObject(inObject)
{
	inObject.update(world.renderer);
}

function drawObject(inObject)
{
	inObject.draw(world.renderer);
}

function forEachObject(inObjects, inFunc)
{
	inObjects.forEach(inFunc);
}

function update()
{
	forEachObject(world.platforms, updateObject);
	
	// TODO: Will the discarded platforms get GC'd?
	world.platforms = world.platforms.filter(function(platform)
	{
		return platform.isOnScreen;
	});
	
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
	
	world.player.update(world);
	world.hud.update(world);
}

function draw()
{
    //renderer.clearScreen();
	drawObject(world.background);

	forEachObject(world.platforms, drawObject);
	
	drawObject(world.player);
	
	drawObject(world.hud);
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

var world =
{
	background: null,
	platforms: [],
	platformSpawner: null,
	platformUpdater: null,
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
	
	world.platformSpawner = new PlatformSpawner();
	world.platformUpdater = new PlatformUpdater();
	
	world.player = new Player();
	
	world.hud = new Hud();
}

function update()
{
	//world.platforms.forEach(function (p) { p.update(world); });
	
	world.platformUpdater.update(world);
	world.platformSpawner.update(world);
	world.player.update(world);
	world.hud.update(world);
}

function draw()
{
	var renderer = world.renderer;
	
    //renderer.clearScreen();
	world.background.draw(renderer);

	world.platforms.forEach(function (p) { p.draw(renderer); });
	
	world.player.draw(renderer);
	
	world.hud.draw(renderer);
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

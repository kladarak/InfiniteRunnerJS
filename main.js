var theRenderer = null;
var resources = {};
var objects = [];

function init()
{
	var canvas = document.getElementById("TheCanvas");
	theRenderer = new Renderer(canvas);
	
	resources.grassTile = createImage(createImageFilePath("2"));
	
	objects.push(new Ball());
	
	for (var i = 0; i < (theRenderer.screenWidth / defaultTileWidth) + 1; ++i)
	{
		var tile = new EnvTile(resources.grassTile);
		tile.x = i * defaultTileWidth;
		tile.y = theRenderer.screenHeight - defaultTileHeight;
		objects.push(tile);
	}
}

function update()
{
	for (var i = 0; i < objects.length; ++i)
	{
		objects[i].update(theRenderer);
	}
}

function draw()
{
    theRenderer.clearScreen();

	for (var i = 0; i < objects.length; ++i)
	{
		objects[i].draw(theRenderer);
	}
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

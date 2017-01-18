
var theRenderer = null;
var resources = {};
var objects = [];

function init()
{
	var canvas = document.getElementById("TheCanvas");
	theRenderer = new Renderer(canvas);
	
	resources.grassTile = createImage(createImageFilePath("2"));
	
	objects.push(ball);
	
	for (var i = 0; i < (theRenderer.screenWidth / defaultTileWidth) + 1; ++i)
	{
		var tile = Object.create(envTile);
		tile.img = resources.grassTile;
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

function clearScreen()
{
	// TODO: Put this on the renderer
    theRenderer.context.clearRect(0, 0, theRenderer.screenWidth, theRenderer.screenHeight);
}

function draw()
{
	clearScreen();

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

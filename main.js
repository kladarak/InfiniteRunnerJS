
var canvas = null;
var ctx = null;
var screenWidth = 0;
var screenHeight = 0;

var tilesAssetPath = "freetileset/png/Tiles/";

var numResourcesLoading = 0;

var resources = {};

var defaultTileWidth = 50;
var defaultTileHeight = 50;

var ball = 
{
	x: 0,
	y: 0,
	dx: 7,
	dy: 13,
	
	update: function ()
	{
		this.x += this.dx;
		this.y += this.dy;
		
		if (this.x >= screenWidth)
		{
			var correction = this.x - screenWidth;
			this.x = screenWidth - correction;
			this.dx = -this.dx;
		}
		else if (this.x <= 0)
		{
			this.x = -this.x;
			this.dx = -this.dx;
		}
		
		if (this.y >= screenHeight)
		{
			var correction = this.y - screenHeight;
			this.y = screenHeight - correction;
			this.dy = -this.dy;
		}
		else if (this.y <= 0)
		{
			this.y = -this.y;
			this.dy = -this.dy;
		}
	},
	
	draw: function()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	}
};

var envTile =
{
	x: 0,
	y: 0,
	width: defaultTileWidth,
	height: defaultTileHeight,
	dx: -1,
	dy: 0,
	
	img: null,
	
	update: function()
	{
		this.x += this.dx;
		
		if (this.x < -this.width)
		{
			this.x += screenWidth + this.width;
		}
	},
	
	draw: function()
	{
		if (this.img)
		{
			ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
	}
};

var objects = [];

function createImageFilePath(filename)
{
	return tilesAssetPath + filename + ".png";
}

function createImage(filepath)
{
	++numResourcesLoading;
	
	var newImg = new Image();
	
	newImg.addEventListener("load", function ()
	{
		--numResourcesLoading;
	}, false);
	
	newImg.src = filepath;
	
	return newImg;
}

function init()
{
	canvas = document.getElementById("TheCanvas");
	ctx = canvas.getContext("2d");
	
	screenWidth = canvas.width;
	screenHeight = canvas.height;
	
	resources.grassTile = createImage(createImageFilePath("2"));
	
	objects.push(ball);
	
	for (var i = 0; i < (screenWidth / defaultTileWidth) + 1; ++i)
	{
		var tile = Object.create(envTile);
		tile.img = resources.grassTile;
		tile.x = i * defaultTileWidth;
		tile.y = screenHeight - defaultTileHeight;
		objects.push(tile);
	}
}

function update()
{
	for (var i = 0; i < objects.length; ++i)
	{
		objects[i].update();
	}
}

function clearScreen()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw()
{
	clearScreen();

	for (var i = 0; i < objects.length; ++i)
	{
		objects[i].draw();
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

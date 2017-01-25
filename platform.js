var defaultTileWidth = 50;
var defaultTileHeight = 50;

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
			
			var tile = new Sprite(img);
			tile.x = x * defaultTileWidth;
			tile.y = y * defaultTileHeight;
			tile.width = defaultTileWidth;
			tile.height = defaultTileHeight;
			this.tiles.push(tile);
		}
	}
	
	this.update = function(world)
	{
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

var lastPlatformHeight = 3;

function createRandomPlatform(groundImages, renderer)
{
	var maxHeightUnits = lastPlatformHeight + 4;
	maxHeightUnits = clamp(maxHeightUnits, 1, 8);
	
	var widthUnits = getRandomInt(2, 20);
	var heightUnits = getRandomInt(1, maxHeightUnits);
	lastPlatformHeight = heightUnits;
	
	var platform = new Platform(widthUnits, heightUnits, groundImages);
	platform.x = renderer.screenWidth;
	platform.y = renderer.screenHeight - platform.height;
	
	return platform;
}

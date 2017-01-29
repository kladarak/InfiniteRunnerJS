var defaultTileWidth = 50;
var defaultTileHeight = 50;

function Platform(widthUnits, heightUnits, groundImages)
{
	this.widthUnits = widthUnits;
	this.heightUnits = heightUnits;
	
	this.tiles = [];
	
	this.rect = new Rect(0, 0);
	this.rect.width = defaultTileWidth * widthUnits;
	this.rect.height = defaultTileHeight * heightUnits;
	
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
			tile.rect.pos.x = x * defaultTileWidth;
			tile.rect.pos.y = y * defaultTileHeight;
			tile.rect.width = defaultTileWidth;
			tile.rect.height = defaultTileHeight;
			this.tiles.push(tile);
		}
	}
	
	this.update = function(world)
	{
		
	}
	
	this.draw = function(renderer)
	{
		var ctx = renderer.context;
		ctx.save();
		
		ctx.translate(this.rect.pos.x, this.rect.pos.y);
		
		this.tiles.forEach(function(tile)
		{
			tile.draw(renderer);
		});
		
		ctx.restore();
	};
}

function PlatformFactory(groundImages)
{
	this.lastPlatformHeight = 3;
	
	this.createRandomPlatform = function()
	{
		var maxHeightUnits = this.lastPlatformHeight + 4;
		maxHeightUnits = clamp(maxHeightUnits, 1, 8);
	
		var widthUnits = getRandomInt(2, 20);
		var heightUnits = getRandomInt(1, maxHeightUnits);
		this.lastPlatformHeight = heightUnits;
		
		return new Platform(widthUnits, heightUnits, groundImages);
	}
}

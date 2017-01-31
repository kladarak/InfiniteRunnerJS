function WaterSection(resources)
{
	var tileWidth = 50;
	var tileHeight = 50;
	
	this.rect = new Rect(0, 0);
	this.rect.width = tileWidth;
	this.rect.height = tileHeight * 2;
	
	var tiles = [];
	
	var addTile = function(img, depth)
	{
		var tile = new Sprite(img);
		tile.rect.pos.x = 0;
		tile.rect.pos.y = depth * tileHeight;
		tile.rect.width = tileWidth;
		tile.rect.height = tileHeight;
		tiles.push(tile);	
	};
	
	addTile(resources.water.top, 0);
	addTile(resources.water.middle, 1);
	
	this.tiles = tiles;
	
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

function ParallaxWater()
{
	this.generatedX = 0;
	this.waterSections = [];
	this.camera = null;
	this.xOffset = 0;
	
	var waterParallaxFactor = 1.2;
	
	this.getX = function()
	{
		return this.camera.pos.x * waterParallaxFactor + this.xOffset;
	};
	
	this.update = function(gameContext)
	{
		this.camera = gameContext.world.camera;
		this.xOffset += 0.5;
		
		var x = this.getX();
		
		this.waterSections = this.waterSections.filter(function(w)
		{
			return w.rect.right() > x;
		});
		
		var screenRight = x + gameContext.renderer.viewport.width;
		
		while (this.generatedX < screenRight)
		{
			var section = new WaterSection(gameContext.resources);
			section.rect.pos.x = this.generatedX;
			section.rect.pos.y = gameContext.renderer.viewport.height - (section.rect.height * 0.3);
			this.waterSections.push(section);
			
			this.generatedX += section.rect.width;
		}
	};
	
	this.draw = function(renderer)
	{
		var ctx = renderer.context;
		ctx.save();
		
		ctx.translate(-this.getX(), -this.camera.pos.y);
		
		for (w of this.waterSections) { w.draw(renderer); }
		
		ctx.restore();
	};
}

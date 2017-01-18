var defaultTileWidth = 50;
var defaultTileHeight = 50;

function EnvTile(inImage)
{
	this.x = 0;
	this.y = 0;
	this.width = defaultTileWidth;
	this.height = defaultTileHeight;
	this.dx = -1;
	this.dy = 0;
	
	this.img = inImage;
	
	this.update = function(theRenderer)
	{
		this.x += this.dx;
		
		if (this.x < -this.width)
		{
			this.x += theRenderer.screenWidth + this.width;
		}
	};
	
	this.draw = function(theRenderer)
	{
		if (this.img)
		{
			theRenderer.context.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
	};
}

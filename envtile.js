
var defaultTileWidth = 50;
var defaultTileHeight = 50;

var envTile =
{
	x: 0,
	y: 0,
	width: defaultTileWidth,
	height: defaultTileHeight,
	dx: -1,
	dy: 0,
	
	img: null,
	
	update: function(theRenderer)
	{
		this.x += this.dx;
		
		if (this.x < -this.width)
		{
			this.x += theRenderer.screenWidth + this.width;
		}
	},
	
	draw: function(theRenderer)
	{
		if (this.img)
		{
			theRenderer.context.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
	}
};



function EnvTile(inImage)
{
	this.x = 0;
	this.y = 0;
	this.width = 10;
	this.height = 10;
	
	this.img = inImage;
	
	this.update = function(theRenderer)
	{
		
	}
	
	this.draw = function(theRenderer)
	{
		if (this.img)
		{
			theRenderer.context.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
	};
}

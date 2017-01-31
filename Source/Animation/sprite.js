function Sprite(inImage)
{
	this.rect = new Rect(0, 0, 10, 10);
	this.img = inImage;
	
	this.update = function(world)
	{
		
	}
	
	this.draw = function(renderer)
	{
		if (this.img)
		{
			renderer.context.drawImage(this.img, this.rect.pos.x, this.rect.pos.y, this.rect.width, this.rect.height);
		}
	};
}

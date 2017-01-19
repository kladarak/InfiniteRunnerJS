function AnimatedSprite(spriteImageFrames)
{
	this.x = 0;
	this.y = 0;
	this.width = 50;
	this.height = 50;
	
	this.imageFrames = spriteImageFrames;
	this.frameIndex = 0;
	this.frameTime = 0;
	
	this.update = function(world)
	{
		this.frameTime++;
		
		if (this.frameTime >= 10)
		{
			this.frameTime = 0;
			
			this.frameIndex++;
			
			if (this.frameIndex >= this.imageFrames.length)
			{
				this.frameIndex = 0;
			}
		}
	};
	
	this.draw = function(renderer)
	{
		if (this.imageFrames.length)
		{
			var img = this.imageFrames[this.frameIndex];
			renderer.context.drawImage(img, this.x, this.y, this.width, this.height);
		}
	};
}

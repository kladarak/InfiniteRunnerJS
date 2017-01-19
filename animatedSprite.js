function AnimatedSprite(spriteImageFrames, loop)
{
	this.x = 0;
	this.y = 0;
	this.width = 50;
	this.height = 50;
	this.loop = loop;
	
	this.imageFrames = spriteImageFrames;
	this.frameIndex = 0;
	this.frameTime = 0;
	
	this.reset = function()
	{
		this.frameTime = 0;
		this.frameIndex = 0;
	};
	
	this.update = function(world)
	{
		this.frameTime++;
		
		if (this.frameTime >= 10)
		{
			this.frameTime = 0;
			
			this.frameIndex++;
			
			if (this.frameIndex >= this.imageFrames.length)
			{
				if (this.loop)
				{
					this.frameIndex = 0;
				}
				else
				{
					this.frameIndex--;
				}
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

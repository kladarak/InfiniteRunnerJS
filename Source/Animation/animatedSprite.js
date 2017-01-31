function AnimatedSprite(spriteImageFrames, loop)
{
	this.rect = new Rect(0, 0, 50, 50);
	this.loop = loop;
	
	this.spriteFrames = [];

	for (img of spriteImageFrames)
	{
		this.spriteFrames.push(new Sprite(img));
	}
	
	this.frameIndex = 0;
	this.frameTime = 0;
	
	this.reset = function()
	{
		this.frameTime = 0;
		this.frameIndex = 0;
	};
	
	this.update = function()
	{
		this.frameTime++;
		
		if (this.frameTime >= 10)
		{
			this.frameTime = 0;
			
			this.frameIndex++;
			
			if (this.frameIndex >= this.spriteFrames.length)
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
		if (this.spriteFrames.length)
		{
			var sprite = this.spriteFrames[this.frameIndex];
			sprite.rect = this.rect;
			sprite.draw(renderer);
		}
	};
}

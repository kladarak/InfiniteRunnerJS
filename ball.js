function Ball()
{
	this.x = 0;
	this.y = 0;
	this.dx = 7;
	this.dy = 13;
	
	this.update = function(renderer)
	{	
		this.x += this.dx;
		this.y += this.dy;
		
		if (this.x >= renderer.screenWidth)
		{
			var correction = this.x - renderer.screenWidth;
			this.x = renderer.screenWidth - correction;
			this.dx = -this.dx;
		}
		else if (this.x <= 0)
		{
			this.x = -this.x;
			this.dx = -this.dx;
		}
		
		if (this.y >= renderer.screenHeight)
		{
			var correction = this.y - renderer.screenHeight;
			this.y = renderer.screenHeight - correction;
			this.dy = -this.dy;
		}
		else if (this.y <= 0)
		{
			this.y = -this.y;
			this.dy = -this.dy;
		}
	};
	
	this.draw = function(renderer)
	{
		var ctx = renderer.context;
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	};
}

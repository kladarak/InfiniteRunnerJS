function Hud()
{
	this.score = 0;
	
	this.update = function (world)
	{
		this.score += 1;
	};
	
	this.draw = function (renderer)
	{
		var ctx = renderer.context;
		
		ctx.font = "48px serif";
		ctx.fillText(this.score, 20, 50);
	};
}

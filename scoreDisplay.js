function ScoreDisplay()
{
	this.score = 0;
	
	this.update = function (world)
	{
		this.score = world.score;
	};
	
	this.draw = function (renderer)
	{
		var ctx = renderer.context;
		
		ctx.fillStyle = "green";
		ctx.font = "48px serif";
		ctx.textAlign  = "left";
		ctx.fillText(this.score, 20, 50);
	};
}

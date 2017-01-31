function ScorePopUp(scoreValue, position)
{
	this.score = scoreValue;
	this.rect = new Rect(position.x, position.y, 200, 10);
	
	this.update = function(world)
	{
		this.rect.pos.y -= 1;
	};
	
	this.draw = function(renderer)
	{
		var ctx = renderer.context;
		
		ctx.fillStyle = "black";
		ctx.font = "22px serif";
		ctx.textAlign = "center";
		ctx.fillText(this.score, this.rect.pos.x, this.rect.pos.y);
	};
}

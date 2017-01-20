function ScoreDisplay()
{
	this.score = 0;
	
	this.update = function (world)
	{
		this.score = world.player.score;
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

function GameOverScreen()
{
	this.score = 0;
	
	this.update = function (world)
	{
		this.score = world.player.score;
	};
	
	this.draw = function (renderer)
	{
		var ctx = renderer.context;
		
		// Dim display
		ctx.fillStyle = "rgba(200,200,200,0.5)";
		ctx.fillRect(0, 0, renderer.screenWidth, renderer.screenHeight);
		
		// Overlay with text
		var x = renderer.screenWidth / 2;
		var y = renderer.screenHeight / 2;
		
		var scoreText = "Final score: " + this.score;
		var restartText = "Press any key to restart";
		
		ctx.fillStyle = "green";
		ctx.font = "48px serif";
		
		ctx.textAlign  = "center";
		ctx.fillText(scoreText, x, y - 30);
		
		ctx.font = "24px serif";
		ctx.fillText(restartText, x, y + 30);
	};
}

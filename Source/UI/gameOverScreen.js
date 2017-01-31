function GameOverScreen()
{
	this.score = 0;
	this.highscore = 0;
	
	this.draw = function (renderer)
	{
		var ctx = renderer.context;
		
		// Dim display
		ctx.fillStyle = "rgba(200,200,200,0.5)";
		ctx.fillRect(0, 0, renderer.viewport.width, renderer.viewport.height);
		
		// Overlay with text
		var lines = [];
		var addLine = function(line) { lines.push(line); };
		
		addLine("Your score: " + this.score);
		addLine("High score: " + this.highscore);
		addLine("Press any key to restart");
		
		ctx.fillStyle = "green";
		ctx.font = "40px serif";
		
		ctx.textAlign  = "center";
		
		var x = renderer.viewport.centreX();
		var y = renderer.viewport.centreY();
		y -= 50;

		lines.forEach(function (line)
		{
			ctx.fillText(line, x, y);
			y += 50;
		});
	};
}

function GameOverState(world)
{
	this.shouldRestartGame = false;
	this.gameOverScreen = new GameOverScreen();
	
	this.onEnter = function(world)
	{
		this.shouldRestartGame = false;
		
		world.highscore = Math.max(world.score, world.highscore);
		
		this.gameOverScreen.score = world.score;
		this.gameOverScreen.highscore = world.highscore;
	}
	
	this.onExit = function(world)
	{
		this.shouldRestartGame = false;
	}
	
	this.onKeyDown = function(event)
	{
		this.shouldRestartGame = true;
	}
	
	this.update = function(world)
	{
	}
	
	this.draw = function(renderer)
	{
		world.draw();
		
		this.gameOverScreen.draw(renderer);
	}
}

GameOverState.prototype = new StateMachineState();

function GameOverState(world)
{
	this.shouldRestartGame = false;
	this.gameOverScreen = new GameOverScreen();
	
	this.onEnter = function(world)
	{
		this.shouldRestartGame = false;
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
		this.gameOverScreen.update(world);	
	}
	
	this.draw = function(renderer)
	{
		world.background.draw(renderer);
		world.platforms.forEach(function (p) { p.draw(renderer); });
		
		this.gameOverScreen.draw(renderer);
	}
}

GameOverState.prototype = new StateMachineState();

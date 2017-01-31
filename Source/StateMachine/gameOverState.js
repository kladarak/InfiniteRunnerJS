function GameOverState()
{
	this.shouldRestartGame = false;
	this.gameOverScreen = new GameOverScreen();
	
	this.onEnter = function(gameContext)
	{
		this.shouldRestartGame = false;
		
		var score = gameContext.playerProfile.score;
		
		gameContext.highscore = Math.max(score, gameContext.highscore);
		
		this.gameOverScreen.score		= score;
		this.gameOverScreen.highscore	= gameContext.highscore;
	}
	
	this.onExit = function(gameContext)
	{
		this.shouldRestartGame = false;
	}
	
	this.onKeyDown = function(event)
	{
		this.shouldRestartGame = true;
	}
	
	this.update = function(gameContext)
	{
	}
	
	this.draw = function(gameContext)
	{
		var renderer = gameContext.renderer;
		
		gameContext.world.draw(renderer);
		
		this.gameOverScreen.draw(renderer);
	}
}

GameOverState.prototype = new StateMachineState();

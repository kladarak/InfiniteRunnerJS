function PlayingGameState(world)
{
	this.scoreDisplay = new ScoreDisplay();	
	this.platformSpawner = new PlatformSpawner();
	this.platformUpdater = new PlatformUpdater();
	this.player = null;
	
	this.onEnter = function(world)
	{
		world.platforms = [];
		
		var firstPlatform = new Platform(20, 3, world.resources.ground);
		firstPlatform.x = 0;
		firstPlatform.y = world.renderer.screenHeight - firstPlatform.height;
		world.platforms.push(firstPlatform);
		
		this.player = new Player(world.selectedModel);
	}
	
	this.onKeyDown = function(e)
	{
		switch(e.key)
		{
			case " ":
				this.player.setJumping(true);
				break;
		}
	}
	
	this.onKeyUp = function(e)
	{
		switch(e.key)
		{
			case " ":
				this.player.setJumping(false);
				break;
		}
	}
	
	this.update = function(world)
	{
		world.score++;
		
		this.platformUpdater.update(world);
		this.platformSpawner.update(world);
		this.player.update(world);
		this.scoreDisplay.update(world);
	}
	
	this.draw = function(renderer)
	{
		world.background.draw(renderer);
		world.platforms.forEach(function (p) { p.draw(renderer); });
		
		this.player.draw(renderer);
		this.scoreDisplay.draw(renderer);
	}
}

PlayingGameState.prototype = new StateMachineState();
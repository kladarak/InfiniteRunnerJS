function PlayingGameState(world)
{
	this.scoreDisplay = new ScoreDisplay();
	
	this.onEnter = function(world)
	{
		world.platforms = [];
		
		var firstPlatform = new Platform(20, 3, world.resources.ground);
		firstPlatform.x = 0;
		firstPlatform.y = world.renderer.screenHeight - firstPlatform.height;
		world.platforms.push(firstPlatform);
		
		world.platformSpawner = new PlatformSpawner();
		world.platformUpdater = new PlatformUpdater();
		
		world.player = new Player(world.selectedModel);
	}
	
	this.onKeyDown = function(e)
	{
		switch(e.key)
		{
			case " ":
				world.player.setJumping(true);
				break;
		}
	}
	
	this.onKeyUp = function(e)
	{
		switch(e.key)
		{
			case " ":
				world.player.setJumping(false);
				break;
		}
	}
	
	this.update = function(world)
	{
		world.platformUpdater.update(world);
		world.platformSpawner.update(world);
		world.player.update(world);
		this.scoreDisplay.update(world);
	}
	
	this.draw = function(renderer)
	{
		world.background.draw(renderer);
		world.platforms.forEach(function (p) { p.draw(renderer); });
		
		world.player.draw(renderer);
		this.scoreDisplay.draw(renderer);
	}
}

PlayingGameState.prototype = new StateMachineState();
function PlayingGameState(world)
{
	this.scoreDisplay = new ScoreDisplay();	
	this.platformSpawner = new PlatformSpawner();
	this.platformUpdater = new PlatformUpdater();
	this.player = null;
	
	this.onEnter = function(world)
	{
		world.platforms = [];
		world.score = 0;
		
		var firstPlatform = new Platform(20, 3, world.resources.ground);
		firstPlatform.rect.x = 0;
		firstPlatform.rect.y = world.renderer.screenHeight - firstPlatform.rect.height;
		world.platforms.push(firstPlatform);
		
		this.player = new Player(world.selectedModel);
	}
	
	this.jumpKeyDown = false;
	
	this.onKeyDown = function(e)
	{
		switch(e.key)
		{
			case " ":
				if (!this.jumpKeyDown)
				{
					this.player.setJumping(true);
					this.jumpKeyDown = true;
				}
				break;
		}
	}
	
	this.onKeyUp = function(e)
	{
		switch(e.key)
		{
			case " ":
				this.player.setJumping(false);
				this.jumpKeyDown = false;
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
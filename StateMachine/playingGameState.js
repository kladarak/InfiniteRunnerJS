function PlayingGameState(world)
{
	this.scoreDisplay			= new ScoreDisplay();
	this.environmentGenerator	= new EnvironmentGenerator(world);
	this.player					= null;
	
	this.onEnter = function(world)
	{
		world.platforms = [];
		world.objects = [];
		world.progress = 0;
		world.score = 0;
		world.scrollSpeed = 0;
		world.camera.pos = new Vector(0, 0);
		
		var firstPlatform = new Platform(20, 3, world.resources.ground);
		firstPlatform.rect.pos.x = 0;
		firstPlatform.rect.pos.y = world.renderer.screenHeight - firstPlatform.rect.height;
		world.objects.push(firstPlatform);
		world.platforms.push(firstPlatform);
		
		world.player = new Player(world.selectedModel);
		this.player = world.player;
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
		world.progress++;
		world.score++;
		world.scrollSpeed = (world.progress / 2000) + 3;
		
		this.environmentGenerator.update(world);
		this.player.update(world);
		this.scoreDisplay.update(world);
		
		// update camera to track player
		world.camera.pos.x = this.player.rect.pos.x - 100;
		
		// cull objects off screen
		world.objects = world.objects.filter(function(o)
		{
			o.isOnScreen = o.rect.right() > world.camera.pos.x;
			return o.isOnScreen;
		});
		
		// remove culled platforms.
		world.platforms = world.platforms.filter(function(p)
		{
			return p.isOnScreen;
		});
	}
	
	this.draw = function(renderer)
	{
		world.draw();
		
		this.scoreDisplay.draw(renderer);
	}
}

PlayingGameState.prototype = new StateMachineState();
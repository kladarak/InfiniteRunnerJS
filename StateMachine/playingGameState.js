function PlayingGameState(world)
{
	this.scoreDisplay		= new ScoreDisplay();	
	this.platformSpawner	= new PlatformSpawner();
	this.fruitSpawner		= new FruitSpawner();

	this.player = null;
	
	this.onEnter = function(world)
	{
		world.platforms = [];
		world.fruits = [];
		world.progress = 0;
		world.score = 0;
		world.scrollSpeed = 0;
		world.camera.pos = new Vector(0, 0);
		
		var firstPlatform = new Platform(20, 3, world.resources.ground);
		firstPlatform.rect.pos.x = 0;
		firstPlatform.rect.pos.y = world.renderer.screenHeight - firstPlatform.rect.height;
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
		world.progress++;
		world.score++;
		world.scrollSpeed = (world.progress / 2000) + 3;
		
		this.platformSpawner.update(world);
		this.fruitSpawner.update(world);
		this.player.update(world);
		this.scoreDisplay.update(world);
		
		// update camera to track player
		world.camera.pos.x = this.player.rect.pos.x - 100;
		
		// cull objects off screen
		world.platforms = world.platforms.filter(function(platform)
		{
			return platform.rect.right() > world.camera.pos.x;
		});
		
		world.fruits = world.fruits.filter(function(fruit)
		{
			return fruit.rect.right() > world.camera.pos.x;
		});
	}
	
	this.draw = function(renderer)
	{
		// Background
		world.background.draw(renderer);
		
		// The World
		var ctx = renderer.context;
		ctx.save();
		
		ctx.translate(-world.camera.pos.x, -world.camera.pos.y);
		
		world.platforms.forEach(function (p) { p.draw(renderer); });
		world.fruits.forEach(function (f) { f.draw(renderer); });
		
		this.player.draw(renderer);
		
		ctx.restore();
		
		// HUD
		this.scoreDisplay.draw(renderer);
	}
}

PlayingGameState.prototype = new StateMachineState();
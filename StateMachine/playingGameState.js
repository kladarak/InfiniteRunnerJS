function PlayingGameState(world)
{
	this.scoreDisplay			= new ScoreDisplay();
	this.environmentGenerator	= null;
	this.parallaxWater			= null;
	this.player					= null;
	
	this.onEnter = function(world)
	{
		world.platforms = [];
		world.objects = [];
		world.score = 0;
		world.camera.pos = new Vector(0, 0);
		
		var firstPlatform = new Platform(20, 3, world.resources.ground);
		firstPlatform.rect.pos.x = 0;
		firstPlatform.rect.pos.y = world.renderer.screenHeight - firstPlatform.rect.height;
		world.objects.push(firstPlatform);
		world.platforms.push(firstPlatform);
		
		world.player = new Player(world.selectedModel);
		this.player = world.player;
		
		this.parallaxWater			= new ParallaxWater(world.resources);
		this.environmentGenerator	= new EnvironmentGenerator(world);
	}
	
	this.jumpKeyDown = false;
	
	this.onKeyDown = function(e)
	{
		switch(e.key)
		{
			case " ":
			case "w":
			case "ArrowUp":
				if (!this.jumpKeyDown)
				{
					this.player.setJumping(true);
					this.jumpKeyDown = true;
				}
				break;
				
			case "a":
			case "ArrowLeft":
				this.player.moveLeft();
				break;
				
			case "d":
			case "ArrowRight":
				this.player.moveRight();
				break;
		}
	}
	
	this.onKeyUp = function(e)
	{
		switch(e.key)
		{
			case " ":
			case "w":
			case "ArrowUp":
				this.player.setJumping(false);
				this.jumpKeyDown = false;
				break;
				
			case "a":
			case "ArrowLeft":
				if (!this.player.facingRight)
				{
					this.player.stopMoving();
				}
				break;
				
			case "d":
			case "ArrowRight":
				if (this.player.facingRight)
				{
					this.player.stopMoving();
				}
				break;
		}
	}
	
	this.update = function(world)
	{
		this.environmentGenerator.update(world);
		world.objects.forEach(function (o) { o.update(world); });
		this.player.update(world);
		this.scoreDisplay.update(world);
		
		// update camera to track player
		var cameraTrackDistance = world.renderer.screenWidth * 0.4;
		var proposedCameraX = this.player.rect.pos.x - cameraTrackDistance;
		world.camera.pos.x = Math.max(proposedCameraX, world.camera.pos.x);
		
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
		
		// Update parallax effect
		this.parallaxWater.update(world);
	}
	
	this.draw = function(renderer)
	{
		world.draw();
		
		this.parallaxWater.draw(renderer);
		
		this.scoreDisplay.draw(renderer);
	}
}

PlayingGameState.prototype = new StateMachineState();
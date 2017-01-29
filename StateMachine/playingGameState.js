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
	
	this.updateWorld = function(world)
	{
		this.environmentGenerator.update(world);
		world.objects.forEach(function (o) { o.update(world); });
		this.player.update(world);
	}
	
	this.updateCamera = function(world)
	{
		// update camera to track player
		var cameraTrackXDistance = world.renderer.screenWidth * 0.4;
		var proposedCameraX = this.player.rect.pos.x - cameraTrackXDistance;
		world.camera.pos.x = Math.max(proposedCameraX, world.camera.pos.x);
		
		var cameraTrackYDistanceMin = world.renderer.screenHeight * 0.2;
		var cameraTrackYDistanceMax = world.renderer.screenHeight * 0.5;
		
		var cameraY = world.camera.pos.y;
		cameraY = Math.min(cameraY, this.player.rect.pos.y - cameraTrackYDistanceMin);
		cameraY = Math.max(cameraY, this.player.rect.pos.y - cameraTrackYDistanceMax);
		cameraY = Math.min(cameraY, 0);
		world.camera.pos.y = cameraY;
	}
	
	this.cullObjectsOffscreen = function(world)
	{
		world.objects = world.objects.filter(function(o)
		{
			o.isOnScreen = o.rect.right() > world.camera.pos.x;
			return o.isOnScreen;
		});
		
		world.platforms = world.platforms.filter(function(p)
		{
			return p.isOnScreen;
		});
	}
	
	this.updateParallaxEffect = function(world)
	{
		this.parallaxWater.update(world);
	}
	
	this.updateHUD = function(world)
	{
		this.scoreDisplay.update(world);
	}
	
	this.update = function(world)
	{
		this.updateWorld(world);
		this.updateCamera(world);
		this.updateParallaxEffect(world);
		
		this.updateHUD(world);
		this.cullObjectsOffscreen(world);
	}
	
	this.draw = function(renderer)
	{
		world.draw();
		
		this.parallaxWater.draw(renderer);
		
		this.scoreDisplay.draw(renderer);
	}
}

PlayingGameState.prototype = new StateMachineState();
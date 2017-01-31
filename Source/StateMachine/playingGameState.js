function PlayingGameState()
{
	this.scoreDisplay			= new ScoreDisplay();
	this.environmentGenerator	= null;
	this.parallaxWater			= null;
	this.player					= null;
	
	this.onEnter = function(gameContext)
	{
		// Initialise world, camera, score
		gameContext.world.platforms = [];
		gameContext.world.objects = [];
		gameContext.world.camera = new Camera();
		gameContext.playerProfile.score = 0;
		
		// Create first platform
		var firstPlatform = new Platform(20, 3, gameContext.resources.ground);
		firstPlatform.rect.pos.x = 0;
		firstPlatform.rect.pos.y = gameContext.renderer.viewport.height - firstPlatform.rect.height;
		gameContext.world.objects.push(firstPlatform);
		gameContext.world.platforms.push(firstPlatform);
		
		// Create a player with the selected character model
		var characterModelFactory = new CharacterModelFactory(gameContext.resources);
		var characterModel = characterModelFactory.createModel(gameContext.playerProfile.selectedCharacter);
		this.player = new Player(characterModel);
		gameContext.world.player = this.player;
		
		this.parallaxWater			= new ParallaxWater();
		this.environmentGenerator	= new EnvironmentGenerator(gameContext);
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
	
	// TODO: Create subclass of camera which has reference to player to track.
	var updateCamera = function(gameContext)
	{
		// update camera to track player
		
		var viewport	= gameContext.renderer.viewport;
		var playerPos	= gameContext.world.player.rect.pos;
		var cameraPos	= gameContext.world.camera.pos;
		
		var cameraTrackXDistance = viewport.width * 0.4;
		var proposedCameraX = playerPos.x - cameraTrackXDistance;
		cameraPos.x = Math.max(proposedCameraX, cameraPos.x);
		
		var cameraTrackYDistanceMin = viewport.height * 0.2;
		var cameraTrackYDistanceMax = viewport.height * 0.5;
		
		cameraPos.y = Math.min(cameraPos.y, playerPos.y - cameraTrackYDistanceMin);
		cameraPos.y = Math.max(cameraPos.y, playerPos.y - cameraTrackYDistanceMax);
		cameraPos.y = Math.min(cameraPos.y, 0);
	}
	
	this.update = function(gameContext)
	{
		this.environmentGenerator.update();
		
		gameContext.world.update(gameContext);
		
		this.player.update(gameContext);
		
		updateCamera(gameContext);
		
		// TODO: Place parallax effects into world.
		this.parallaxWater.update(gameContext);
		
		this.scoreDisplay.update(gameContext);
		
		gameContext.world.cullObjectsOffScreen();
	}
	
	this.draw = function(gameContext)
	{
		var renderer = gameContext.renderer;
		
		gameContext.world.draw(renderer);
		
		this.parallaxWater.draw(renderer);
		
		this.scoreDisplay.draw(renderer);
	}
}

PlayingGameState.prototype = new StateMachineState();
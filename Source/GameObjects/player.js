var playerStates =
{
	idle: "idle",
	run: "run",
	jump: "jump",
	fall: "fall",
	dead: "dead",
};

var playerConstants =
{
	normalGravity: 0.7,
	jumpGravity: 0.2,
	maxXVelocity: 6,
	maxYVelocity: 6,
	jumpThrust: -10,
	enemyKilledThrust: -5,
	moveAccel: 0.15,
	stopDecel: 0.5,
	deathFrameCount: 100,
};

var playerSizeMetrics =
{
	initialX: 100,
	initialY: 100,
	width: 30,
	height: 90,
	
	renderXOffset: -30,
	renderYOffset: -6,
	renderWidth: 100,
	renderHeight: 100,
};

function Player(characterModel)
{
	this.rect = new Rect();
	this.isAlive = true;
	this.dyingFrameCount = 0;

	this.state = playerStates.idle;
	this.model = characterModel;
	
	this.xVel = 0;
	this.yVel = 0;
	this.jumpCount = 0;
	this.xDirection = 0;
	this.facingRight = true;
	
	this.rect.pos.x = playerSizeMetrics.initialX;
	this.rect.pos.y = playerSizeMetrics.initialY;
	this.rect.width = playerSizeMetrics.width;
	this.rect.height = playerSizeMetrics.height;
	
	this.setState = function(state)
	{
		this.state = state;
		
		var getNewCharacterModelState = function()
		{
			switch (state)
			{
				case playerStates.idle:	return characterModelStates.idle;
				case playerStates.run:	return characterModelStates.run;
				case playerStates.jump: return characterModelStates.jump;
				case playerStates.fall: return characterModelStates.fall;
				case playerStates.dead: return characterModelStates.dead;
			}
			
			return characterModelStates.idle;
		};
		
		this.model.setState( getNewCharacterModelState() );
	};
	
	this.isDying = function()
	{
		return this.state === playerStates.dead;
	};
	
	this.canJump = function()
	{
		return (this.jumpCount < 2) && !this.isDying();
	};
	
	this.setJumping = function(isJumping)
	{
		if (this.isDying()) { return; }
		
		if (isJumping && this.canJump())
		{
			this.yVel = playerConstants.jumpThrust;
			this.setState( playerStates.jump );
			this.jumpCount++;
		}
		else if (!isJumping)
		{
			this.setState( playerStates.fall );
		}
	};
	
	this.isJumping = function()
	{
		return this.state === playerStates.jump;
	};
	
	this.moveLeft = function()
	{
		if (this.isDying()) { return; }
		
		this.xDirection = -1;
		this.facingRight = false;
	};
	
	this.moveRight = function()
	{
		if (this.isDying()) { return; }
		
		this.xDirection = 1;
		this.facingRight = true;
	};
	
	this.stopMoving = function()
	{
		if (this.isDying()) { return; }
		
		this.xDirection = 0;
	};
	
	this.takeDamage = function()
	{
		this.setState( playerStates.dead );
	};
	
	this.updateVelocity = function()
	{
		if (this.xDirection === 0)
		{
			if (Math.abs(this.xVel) > playerConstants.stopDecel)
			{
				if (this.xVel > 0) { this.xVel -= playerConstants.stopDecel; }
				if (this.xVel < 0) { this.xVel += playerConstants.stopDecel; }
			}
			else
			{
				this.xVel = 0;
			}
		}
		else
		{
			// use stop deceleration if changing directions.
			var accel = this.xDirection * this.xVel >= 0 ? playerConstants.moveAccel : playerConstants.stopDecel;
			this.xVel += this.xDirection * accel;
			this.xVel = clamp(this.xVel, -playerConstants.maxXVelocity, playerConstants.maxXVelocity);
		}
		
		var gravity = this.isJumping() ? playerConstants.jumpGravity : playerConstants.normalGravity;
				
		this.yVel += gravity;
		this.yVel = Math.min(this.yVel, playerConstants.maxYVelocity);
	};
	
	this.findPlatformPlayerIsStandingOn = function(gameContext)
	{
		var rectToCollideWith = new Rect(this.rect.left(), this.rect.bottom(), this.rect.width, this.yVel);
		var platformsCollidedWith = Physics.findObjectsWhoseTopOverlapRect(gameContext.world.platforms, rectToCollideWith);
		return Physics.selectHighestObject(platformsCollidedWith);
	}
	
	this.findEnemyPlayerHasSteppedOn = function(gameContext)
	{
		var rectToCollideWith = new Rect(this.rect.left(), this.rect.bottom(), this.rect.width, this.yVel);
		var enemiesSteppedOn = Physics.findObjectsWhoseTopOverlapRect(gameContext.world.enemies, rectToCollideWith);
		return Physics.selectHighestObject(enemiesSteppedOn);
	}
	
	this.updateWhenAlive = function(gameContext)
	{
		this.updateVelocity();
		
		this.rect.pos.x += this.xVel;
		
		// prevent player from running off of the left of the screen
		this.rect.pos.x = Math.max(this.rect.pos.x, gameContext.world.camera.pos.x);
		
		var standingOnPlatform	= this.findPlatformPlayerIsStandingOn(gameContext);
		var steppedOnEnemy		= this.findEnemyPlayerHasSteppedOn(gameContext);
		
		var killEnemy = (steppedOnEnemy !== null) && ((standingOnPlatform === null) || (steppedOnEnemy.rect.top() < standingOnPlatform.rect.top()));
		
		if (killEnemy)
		{
			this.rect.pos.y = steppedOnEnemy.rect.top() - this.rect.height;
			this.yVel = playerConstants.enemyKilledThrust;
			this.setState( playerStates.jump );
			
			steppedOnEnemy.setKilled(true);
			
			var scorePopUp = new ScorePopUp(250, this.rect.centre());
			gameContext.world.objects.push(scorePopUp);
			gameContext.playerProfile.score += 250;
		}
		else if (standingOnPlatform)
		{
			this.rect.pos.y = standingOnPlatform.rect.top() - this.rect.height;
			this.yVel = 0;
			this.jumpCount = 0;
			
			var hasStopped = (this.xVel === 0) && (this.xDirection === 0);
			var nextState = hasStopped ? playerStates.idle : playerStates.run;
			this.setState( nextState );
		}
		else
		{
			this.rect.pos.y += this.yVel;
			
			if (this.state !== playerStates.jump || this.yVel >= -2)
			{
				this.setState( playerStates.fall );
			}
		}
		
		this.isAlive = (this.rect.pos.y < gameContext.deathY);
	}
	
	this.updateWhenDying = function()
	{
		this.dyingFrameCount++;
		
		if (this.dyingFrameCount >= playerConstants.deathFrameCount)
		{
			this.isAlive = false;
		}
	};
	
	this.update = function(gameContext)
	{
		if (this.isDying())
		{
			this.updateWhenDying();
		}
		else
		{
			this.updateWhenAlive(gameContext);
		}
		
		this.model.update();
	}
	
	this.draw = function(renderer)
	{
		this.model.rect.pos.x	= playerSizeMetrics.renderXOffset;
		this.model.rect.pos.y	= playerSizeMetrics.renderYOffset;
		this.model.rect.width	= playerSizeMetrics.renderWidth;
		this.model.rect.height	= playerSizeMetrics.renderHeight;
	
		var ctx = renderer.context;
		ctx.save();
		
		ctx.translate(this.rect.pos.x, this.rect.pos.y);
			
		if (!this.facingRight)
		{
			ctx.scale(-1, 1);
			ctx.translate(-this.rect.width, 0);
		}
		
		this.model.draw(renderer);

		// Debug draw bounding rect
		//ctx.strokeStyle = "red";
		//ctx.strokeRect(0, 0, this.rect.width, this.rect.height);
		
		ctx.restore();
	}
}

var playerStates =
{
	idle: "idle",
	run: "run",
	jump: "jump",
	fall: "fall",
};

var playerConstants =
{
	normalGravity: 0.7,
	jumpGravity: 0.2,
	maxXVelocity: 6,
	maxYVelocity: 6,
	jumpThrust: -10,
	moveAccel: 0.15,
	stopDecel: 0.5,
};

function Player(characterModel)
{
	this.rect = new Rect(100, 200, 100, 100);
	this.isAlive = true;

	this.state = playerStates.idle;
	this.model = characterModel;
	
	this.xVel = 0;
	this.yVel = 0;
	this.jumpCount = 0;
	this.xDirection = 0;
	this.facingRight = true;
	
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
			}
			
			return characterModelStates.idle;
		};
		
		this.model.setState( getNewCharacterModelState() );
	};
	
	this.canJump = function()
	{
		return (this.jumpCount < 2);
	};
	
	this.setJumping = function(isJumping)
	{
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
		this.xDirection = -1;
		this.facingRight = false;
	};
	
	this.moveRight = function()
	{
		this.xDirection = 1;
		this.facingRight = true;
	};
	
	this.stopMoving = function()
	{
		this.xDirection = 0;
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
	}
	
	this.findPlatformPlayerIsStandingOn = function(gameContext)
	{
		var prevBotY = this.rect.bottom();
		var nextBotY = prevBotY + this.yVel;
		var centreX = this.rect.centreX();
		
		var highestPlatform = null;
		
		for (platform of gameContext.world.platforms)
		{
			if (centreX >= platform.rect.left() && centreX <= platform.rect.right())
			{
				// check if bottom of player falls through platform
				if (prevBotY <= platform.rect.top() && nextBotY >= platform.rect.top())
				{
					// Select this platform if it's the first we've collided with, or if it is higher than the last one we found.
					if (highestPlatform === null || highestPlatform.rect.top() > platform.rect.top())
					{
						highestPlatform = platform;
					}
				}
			}
		}
		
		return highestPlatform;
	}
	
	this.update = function(gameContext)
	{
		if (!this.isAlive)
		{
			return;
		}
		
		this.updateVelocity();
		
		this.rect.pos.x += this.xVel;
		
		// prevent player from running off of the left of screen
		this.rect.pos.x = Math.max(this.rect.pos.x, gameContext.world.camera.pos.x);
		
		var standingOnPlatform = this.findPlatformPlayerIsStandingOn(gameContext);
		
		if (standingOnPlatform)
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
		
		this.isAlive = this.rect.pos.y < gameContext.deathY;
		
		this.model.update();
	}
	
	this.draw = function(renderer)
	{
		this.model.rect.pos.x = 0;
		this.model.rect.pos.y = 0;
		this.model.rect.width = this.rect.width;
		this.model.rect.height = this.rect.height;
			
		var ctx = renderer.context;
		ctx.save();
		
		ctx.translate(this.rect.pos.x, this.rect.pos.y);
			
		if (!this.facingRight)
		{
			ctx.scale(-1, 1);
			ctx.translate(-this.rect.width, 0);
		}
		
		this.model.draw(renderer);

		ctx.restore();
	}
}

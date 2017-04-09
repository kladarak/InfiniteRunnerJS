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
	enemyKilledThrust: -5,
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
	};
	
	var findObjectsOverlappingRect = function(objects, rect)
	{
		return objects.filter(function(o)
		{
			return o.rect.overlaps(rect);
		});
	};
	
	var findObjectsWhoseTopOverlapRect = function(objects, rect)
	{
		return objects.filter(function(o)
		{
			// similar to rect.overlaps, except we only consider the top of the object for y axis checks.
			return o.rect.left() < rect.right()
				&& o.rect.right() > rect.left()
				&& o.rect.top() <= rect.bottom()
				&& o.rect.top() >= rect.top();
		});
	};
	
	var selectHighestObject = function(objects)
	{
		var highestObject = null;
		
		for (object of objects)
		{
			if (highestObject === null || highestObject.rect.top() > object.rect.top())
			{
				highestObject = object;
			}
		}
		
		return highestObject;
	};
	
	this.findPlatformPlayerIsStandingOn = function(gameContext)
	{
		// We are considered standing on a platform if the bottom-centre of the player is about to pass through the top of a platform.
		// So we choose a rect for the player to be a single pixel wide at the bottom centre of the player, and extended by the player's y velocity.
		var rectToCollideWith = new Rect(this.rect.centreX(), this.rect.bottom(), 1, this.yVel);
		var platformsCollidedWith = findObjectsWhoseTopOverlapRect(gameContext.world.platforms, rectToCollideWith);
		return selectHighestObject(platformsCollidedWith);
	}
	
	this.findEnemyPlayerHasSteppedOn = function(gameContext)
	{
		// If any part of the bottom of the player overlaps an enemey, then we haev stepped on it.
		// So we choose a rect which is the full width of the player, and is extended by its velocity.
		var rectToCollideWith = new Rect(this.rect.left(), this.rect.bottom(), this.rect.width, this.yVel);
		var enemiesSteppedOn = findObjectsWhoseTopOverlapRect(gameContext.world.enemies, rectToCollideWith);
		return selectHighestObject(enemiesSteppedOn);
	}
		
	this.update = function(gameContext)
	{
		if (!this.isAlive)
		{
			return;
		}
		
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

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

var playerSizeMetrics =
{
	initialX: 100,
	initialY: 100,
	width: 100,
	height: 100,
	
	boundingXOffset: 30,
	boundingYOffset: 0,
	boundingWidth: 30,
	boundingHeight: 100,
};

function Player(characterModel)
{
	this.rect = new Rect();
	this.boundingRect = new Rect();
	this.isAlive = true;

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
	
	this.refreshBoundingRect = function()
	{
		this.boundingRect.pos.x		= this.rect.pos.x + playerSizeMetrics.boundingXOffset;
		this.boundingRect.pos.y		= this.rect.pos.y + playerSizeMetrics.boundingYOffset;
		this.boundingRect.width		= playerSizeMetrics.boundingWidth;
		this.boundingRect.height	= playerSizeMetrics.boundingHeight;;
	};
	
	this.refreshBoundingRect();
	
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
		var bRect = this.boundingRect;
		var rectToCollideWith = new Rect(bRect.left(), bRect.bottom(), bRect.width, this.yVel);
		var platformsCollidedWith = findObjectsWhoseTopOverlapRect(gameContext.world.platforms, rectToCollideWith);
		return selectHighestObject(platformsCollidedWith);
	}
	
	this.findEnemyPlayerHasSteppedOn = function(gameContext)
	{
		var bRect = this.boundingRect;
		var rectToCollideWith = new Rect(bRect.left(), bRect.bottom(), bRect.width, this.yVel);
		var enemiesSteppedOn = findObjectsWhoseTopOverlapRect(gameContext.world.enemies, rectToCollideWith);
		return selectHighestObject(enemiesSteppedOn);
	}
		
	this.findEnemyPlayerHasBumpedInto = function(gameContext)
	{
		var enemiesBumpedInto = findObjectsOverlappingRect(gameContext.world.enemies, this.boundingRect);
		enemiesBumpedInto = enemiesBumpedInto.filter(function(e) { return e.isAlive;});
		return (enemiesBumpedInto.length > 0) ? enemiesBumpedInto[0] : null;
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
		
		this.refreshBoundingRect();
		
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
		
		this.refreshBoundingRect();
		
		var killedByEnemy = this.findEnemyPlayerHasBumpedInto(gameContext);
		
		this.isAlive = (killedByEnemy === null) && (this.rect.pos.y < gameContext.deathY);
		
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

		// Debug draw bounding rect
		//ctx.strokeStyle = "red";
		//ctx.strokeRect(playerSizeMetrics.boundingXOffset, playerSizeMetrics.boundingYOffset, this.boundingRect.width, this.boundingRect.height);
		
		ctx.restore();
	}
}

var playerStates =
{
	run: "run",
	jump: "jump",
	fall: "fall",
};

var playerConstants =
{
	normalGravity: 0.7,
	jumpGravity: 0.2,
	maxYVelocity: 6,
	jumpThrust: -10,
};

function Player(world)
{
	this.x = 100;
	this.y = 200;
	this.width = 100;
	this.height = 100;
	this.isAlive = true;
	this.score = 0;

	this.state = playerStates.run;
	this.sprite = new AnimatedSprite(world.resources.cat.running);
	
	this.yVel = 0;
	
	this.setJumping = function(isJumping)
	{
		if (isJumping && this.state === playerStates.run)
		{
			this.yVel = playerConstants.jumpThrust;
			this.state = playerStates.jump;
		}
		else if (!isJumping)
		{
			this.state = playerStates.fall;
		}
	};
	
	this.isJumping = function()
	{
		return this.state === playerStates.jump;
	};
	
	this.update = function(world)
	{
		if (!this.isAlive)
		{
			return;
		}
		
		this.score += 1;
		
		var gravity = this.isJumping() ? playerConstants.jumpGravity : playerConstants.normalGravity;
		
		this.yVel += gravity;
		this.yVel = Math.min(this.yVel, playerConstants.maxYVelocity);
		
		var prevBotY = this.y + this.height;
		var nextBotY = prevBotY + this.yVel;
		var centreX = this.x + (this.width / 2);
		
		var runningOnPlatform = null;
		
		for (let platform of world.platforms)
		{
			if (centreX >= platform.x && centreX <= platform.x + platform.width)
			{
				// check if bottom of player falls through platform
				if (prevBotY <= platform.y && nextBotY >= platform.y)
				{
					runningOnPlatform = platform;
				}
			}
		}
		
		if (runningOnPlatform)
		{
			this.state = playerStates.run;
			this.y = runningOnPlatform.y - this.height;
			this.yVel = 0;
		}
		else
		{
			if (this.state !== playerStates.jump || this.yVel >= -2)
			{
				this.state = playerStates.fall;
			}
			
			this.y = nextBotY - this.height;
		}
		
		this.isAlive = this.y < world.renderer.screenHeight;
		
		this.sprite.update(world);
	}
	
	this.draw = function(renderer)
	{
		this.sprite.x 		= this.x;
		this.sprite.y 		= this.y;
		this.sprite.width	= this.width;
		this.sprite.height	= this.height;
		this.sprite.draw(renderer);
	}
}
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

function Player(characterModel)
{
	this.x = 100;
	this.y = 200;
	this.width = 100;
	this.height = 100;
	this.isAlive = true;
	this.score = 0;

	this.state = playerStates.run;
	this.model = characterModel;
	
	this.yVel = 0;
	this.jumpCount = 0;
	
	this.setState = function(state)
	{
		this.state = state;
		
		if (this.state == playerStates.run)		{ this.model.setState( characterModelStates.run ); }
		if (this.state == playerStates.jump) 	{ this.model.setState( characterModelStates.jump ); }
		if (this.state == playerStates.fall) 	{ this.model.setState( characterModelStates.fall ); }
	}
	
	this.setJumping = function(isJumping)
	{
		if (isJumping && ((this.state === playerStates.run) || (this.jumpCount < 2)))
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
			this.setState( playerStates.run );
			this.y = runningOnPlatform.y - this.height;
			this.yVel = 0;
			this.jumpCount = 0;
		}
		else
		{
			if (this.state !== playerStates.jump || this.yVel >= -2)
			{
				this.setState( playerStates.fall );
			}
			
			this.y = nextBotY - this.height;
		}
		
		this.isAlive = this.y < world.renderer.screenHeight;
		
		this.model.update(world);
	}
	
	this.draw = function(renderer)
	{
		this.model.x 		= this.x;
		this.model.y 		= this.y;
		this.model.width	= this.width;
		this.model.height	= this.height;
		this.model.draw(renderer);
	}
}
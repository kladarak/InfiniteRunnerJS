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
	this.rect = new Rect(100, 200, 100, 100);
	this.isAlive = true;

	this.state = playerStates.run;
	this.model = characterModel;
	
	this.yVel = 0;
	this.jumpCount = 0;
	
	this.setState = function(state)
	{
		this.state = state;
		
		var getNewCharacterModelState = function()
		{
			switch (state)
			{
				case playerStates.run:	return characterModelStates.run;
				case playerStates.jump: return characterModelStates.jump;
				case playerStates.fall: return characterModelStates.fall;
			}
			
			return characterModelStates.run;
		};
		
		this.model.setState( getNewCharacterModelState() );
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
		
		this.rect.pos.x += world.scrollSpeed;
		
		var gravity = this.isJumping() ? playerConstants.jumpGravity : playerConstants.normalGravity;
				
		this.yVel += gravity;
		this.yVel = Math.min(this.yVel, playerConstants.maxYVelocity);
		
		var prevBotY = this.rect.bottom();
		var nextBotY = prevBotY + this.yVel;
		var centreX = this.rect.centreX();
		
		var runningOnPlatform = null;
		
		for (platform of world.platforms)
		{
			if (centreX >= platform.rect.left() && centreX <= platform.rect.right())
			{
				// check if bottom of player falls through platform
				if (prevBotY <= platform.rect.top() && nextBotY >= platform.rect.top())
				{
					runningOnPlatform = platform;
				}
			}
		}
		
		if (runningOnPlatform)
		{
			this.setState( playerStates.run );
			this.rect.pos.y = runningOnPlatform.rect.top() - this.rect.height;
			this.yVel = 0;
			this.jumpCount = 0;
		}
		else
		{
			if (this.state !== playerStates.jump || this.yVel >= -2)
			{
				this.setState( playerStates.fall );
			}
			
			this.rect.pos.y = nextBotY - this.rect.height;
		}
		
		this.isAlive = this.rect.pos.y < world.renderer.screenHeight;
		
		this.model.update(world);
	}
	
	this.draw = function(renderer)
	{
		this.model.rect = this.rect;
		this.model.draw(renderer);
	}
}
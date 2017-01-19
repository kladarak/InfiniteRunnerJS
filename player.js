var playerStates =
{
	run: "run",
	jump: "jump",
	fall: "fall",
};

function Player()
{
	this.x = 100;
	this.y = 200;
	this.width = 20;
	this.height = 20;
	this.radius = 10;
	this.color = "green";

	this.state = playerStates.run;
	
	this.yVel = 0;
	
	this.setJumping = function(isJumping)
	{
		if (isJumping && this.state === playerStates.run)
		{
			this.yVel = -10;
			this.state = playerStates.jump;
		}
		else if (!isJumping)
		{
			this.state = playerStates.fall;
		}
	}
	
	this.update = function(world)
	{
		var gravity = 1.0;
		
		if (this.state === playerStates.jump)
		{
			gravity = 0.2;
		}
		
		this.yVel += gravity;
		
		if (this.yVel > 10)
		{
			this.yVel = 10;
		}
		
		var prevY = this.y + this.radius;
		var nextY = prevY + this.yVel;
		
		var runningOnPlatform = null;
		
		for (let platform of world.platforms)
		{
			if (this.x >= platform.x && this.x <= platform.x + platform.width)
			{
				// check if bottom of player falls through platform
				if (prevY <= platform.y && nextY >= platform.y)
				{
					runningOnPlatform = platform;
				}
			}
		}
		
		if (runningOnPlatform)
		{
			this.state = playerStates.run;
			this.y = runningOnPlatform.y - this.radius;
			this.yVel = 0;
		}
		else
		{
			if (this.state !== playerStates.jump || this.yVel >= -2)
			{
				this.state = playerStates.fall;
			}
			
			this.y = nextY - this.radius;
		}
		
		if (this.y > world.renderer.screenHeight)
		{
			// reset player
			this.state = playerStates.fall;
			this.y = 0;
			this.yVel = 0;
		}
	}
	
	this.draw = function(renderer)
	{
		var ctx = renderer.context;
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
}
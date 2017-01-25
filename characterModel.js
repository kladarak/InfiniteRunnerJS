var characterModelStates =
{
	dead: "dead",
	fall: "fall",
	hurt: "hurt",
	idle: "idle",
	jump: "jump",
	run: "run",
	slide: "slide",
	walk: "walk",
};

function CharacterModel(characterResources)
{
	this.state = characterModelStates.idle;
	
	this.rect = new Rect(0, 0, 50, 50);
	
	var loop = true;
	var playonce = false;
	
	this.animations = {};
	this.animations.dead 	= new AnimatedSprite( characterResources.dead, playonce	);
	this.animations.fall 	= new AnimatedSprite( characterResources.fall, playonce	);
	this.animations.hurt 	= new AnimatedSprite( characterResources.hurt, playonce	);
	this.animations.idle 	= new AnimatedSprite( characterResources.idle, loop	);
	this.animations.jump 	= new AnimatedSprite( characterResources.jump, playonce	);
	this.animations.run		= new AnimatedSprite( characterResources.run,  loop );
	this.animations.dead	= new AnimatedSprite( characterResources.dead, playonce	);
	this.animations.walk	= new AnimatedSprite( characterResources.walk, loop	);
	
	this.getCurrentAnimation = function()
	{
		return this.animations[this.state];
	};
	
	this.setState = function(state)
	{
		if (this.state !== state)
		{
			this.state = state;
			this.getCurrentAnimation().reset();
		}
	};
	
	this.update = function(world)
	{
		this.getCurrentAnimation().update(world);
	};
	
	this.draw = function(renderer)
	{
		var anim = this.getCurrentAnimation();
		anim.rect = this.rect;
		anim.draw(renderer);
	};
};

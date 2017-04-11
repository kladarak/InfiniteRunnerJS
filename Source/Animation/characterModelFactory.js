var characters =
{
	cat: "cat",
	dog: "dog"
};

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

function CharacterModelFactory(resources)
{
	var createAnimationSet = function(animationResources)
	{
		var loop = true;
		var playonce = false;
		var animations = {};
		
		animations.dead 	= new AnimatedSprite( animationResources.dead, playonce	);
		animations.fall 	= new AnimatedSprite( animationResources.fall, playonce	);
		animations.hurt 	= new AnimatedSprite( animationResources.hurt, playonce	);
		animations.idle 	= new AnimatedSprite( animationResources.idle, loop	);
		animations.jump 	= new AnimatedSprite( animationResources.jump, playonce	);
		animations.run		= new AnimatedSprite( animationResources.run,  loop );
		animations.slide	= new AnimatedSprite( animationResources.slide, playonce );
		animations.walk		= new AnimatedSprite( animationResources.walk, loop	);
		
		return animations;
	};
	
	var createModel = function(animationResources)
	{
		var animSet = createAnimationSet(animationResources);
		return new AnimatedModel(animSet, characterModelStates.idle);
	};
	
	this.createCatModel = function() { return createModel(resources.cat); };
	this.createDogModel = function() { return createModel(resources.dog); };
	
	this.createModel = function(character)
	{
		switch (character)
		{
			case characters.cat: return this.createCatModel();
			case characters.dog: return this.createDogModel();
		}
		
		return null;
	}
};

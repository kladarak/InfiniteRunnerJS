function AnimatedModel(animationSet, initialState)
{
	this.animations = animationSet;
	this.state		= initialState;
	this.rect		= new Rect(0, 0, 50, 50);
	
	this.getCurrentAnimation = function()
	{
		return this.animations[this.state];
	};
	
	this.setState = function(state)
	{
		if (this.state !== state && this.animations[state] !== undefined)
		{
			this.state = state;
			this.getCurrentAnimation().reset();
		}
	};
	
	this.update = function()
	{
		this.getCurrentAnimation().update();
	};
	
	this.draw = function(renderer)
	{
		var anim = this.getCurrentAnimation();
		anim.rect = this.rect;
		anim.draw(renderer);
	};
};

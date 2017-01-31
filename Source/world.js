function World()
{
	this.background = null;
	this.platforms = [];
	this.objects = [];
	this.player = null;
	this.camera = new Camera();
	
	this.cullObjectsOffScreen = function()
	{
		var screenLeft = this.camera.pos.x;
		
		this.objects = this.objects.filter(function(o)
		{
			return o.rect.right() > screenLeft;
		});
		
		var objects = this.objects;
		
		this.platforms = this.platforms.filter(function(p)
		{
			return objects.includes(p);
		});
	};
	
	this.update = function(gameContext)
	{
		this.objects.forEach(function (o) { o.update(gameContext); });
	}
	
	this.draw = function(renderer)
	{
		this.background.draw(renderer);
		
		var ctx = renderer.context;
		ctx.save();
		
		ctx.translate(-this.camera.pos.x, -this.camera.pos.y);
		
		this.objects.forEach(function (o) { o.draw(renderer); });
		
		this.player.draw(renderer);
		
		ctx.restore();
	}
};

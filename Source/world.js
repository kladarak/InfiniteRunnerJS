function World()
{
	this.background = null;
	this.platforms = [];
	this.enemies = [];
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
		var isNotCulled = function(o) { return objects.includes(o); };
		var isAlive		= function(o) { return o.isAlive; };
		
		this.platforms	= this.platforms.filter(isNotCulled);
		this.enemies	= this.enemies.filter(isNotCulled);
		this.enemies	= this.enemies.filter(isAlive);
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

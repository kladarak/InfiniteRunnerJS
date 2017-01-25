function PlatformUpdater()
{
	this.update = function(world)
	{
		var speed = world.score / 2000;
		speed += 3;
		
		world.platforms.forEach(function (p)
		{
			p.rect.x -= speed;
			p.isOnScreen = p.rect.right() > 0;
		});
		
		world.platforms = world.platforms.filter(function(platform)
		{
			return platform.isOnScreen;
		});
	};
}

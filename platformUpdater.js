function PlatformUpdater()
{
	this.update = function(world)
	{
		world.platforms.forEach(function (p)
		{
			p.rect.x -= world.scrollSpeed;
			p.isOnScreen = p.rect.right() > 0;
		});
		
		world.platforms = world.platforms.filter(function(platform)
		{
			return platform.isOnScreen;
		});
	};
}

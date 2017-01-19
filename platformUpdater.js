function PlatformUpdater()
{
	this.update = function(world)
	{
		world.platforms.forEach(function (p)
		{
			p.x -= 2;
			p.isOnScreen = (p.x + p.width) > 0;
		});
		
		// TODO: Will the discarded platforms get GC'd?
		world.platforms = world.platforms.filter(function(platform)
		{
			return platform.isOnScreen;
		});
	};
}

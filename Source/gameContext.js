function GameContext(canvas)
{
	this.renderer		= new Renderer(canvas);
	this.resources		= new Resources();
	this.playerProfile	= new PlayerProfile();
	this.world			= new World();
	
	this.highscore	= 0;
	this.deathY		= this.renderer.viewport.height;
};

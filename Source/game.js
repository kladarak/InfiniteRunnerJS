function Game(canvas)
{
	var gameContext 	= new GameContext(canvas);
	var stateMachine	= createGameStateMachine();
	
	gameContext.world.background = new Sprite(gameContext.resources.background);
	gameContext.world.background.rect.width = 1000;
	gameContext.world.background.rect.height = 750;

	var update = function()
	{
		stateMachine.update(gameContext);
	}

	// Use this function to check that objects get cleaned up correctly.
	var debugDraw = function()
	{
		gameContext.renderer.clearScreen();
		
		var ctx = gameContext.renderer.context;
		ctx.save();
		
		ctx.scale(0.6, 0.6);
		ctx.translate(300, 50);
		
		stateMachine.currentState.draw(gameContext);
		
		ctx.restore();
	}

	var draw = function()
	{
		stateMachine.currentState.draw(gameContext);
	}
	
	// Public functions
	
	this.onKeyDown = function(e)
	{
		stateMachine.currentState.onKeyDown(e);
	}

	this.onKeyUp = function(e)
	{
		stateMachine.currentState.onKeyUp(e);
	}
	
	this.tick = function()
	{
		update();
		//debugDraw();
		draw();
	}
};
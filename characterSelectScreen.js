function CharacterSelectScreen(world)
{
	this.catModel = world.catModel;
	this.dogModel = world.dogModel;
	this.selectedModel = world.selectedModel;
	
	this.update = function(world)
	{	
		world.catModel.setState( characterModelStates.idle );
		world.dogModel.setState( characterModelStates.idle );
		world.catModel.update(world);
		world.dogModel.update(world);
		this.selectedModel = world.selectedModel;
	};
	
	this.draw = function(renderer)
	{
		var characterSize = 200;
		
		var x = (renderer.screenWidth - characterSize) / 2;
		x -= characterSize;
		var y = (renderer.screenHeight - characterSize) / 2;
	
		world.catModel.x = x;
		world.catModel.y = y;
		world.catModel.width = characterSize;
		world.catModel.height = characterSize;
		world.catModel.draw(renderer);
		
		x += characterSize * 2;
		
		world.dogModel.x = x;
		world.dogModel.y = y;
		world.dogModel.width = characterSize;
		world.dogModel.height = characterSize;
		world.dogModel.draw(renderer);
	};
}

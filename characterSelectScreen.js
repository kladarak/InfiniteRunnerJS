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
		
		var catX = (renderer.screenWidth - characterSize) / 2;
		catX -= characterSize;
		var y = (renderer.screenHeight - characterSize) / 2;
	
		this.catModel.x = catX;
		this.catModel.y = y;
		this.catModel.width = characterSize;
		this.catModel.height = characterSize;
		this.catModel.draw(renderer);
		
		var dogX = catX + characterSize * 2;
		
		this.dogModel.x = dogX;
		this.dogModel.y = y;
		this.dogModel.width = characterSize;
		this.dogModel.height = characterSize;
		this.dogModel.draw(renderer);
		
		var selectionX = this.selectedModel === this.catModel ? catX : dogX;
		
		var ctx = renderer.context;
		ctx.strokeStyle = "green";
		ctx.strokeRect(selectionX, y, characterSize, characterSize);
		
		// Overlay with text
		var x = renderer.screenWidth / 2;
		var y = renderer.screenHeight / 4;
		var txt = "Choose a character";
		
		ctx.font = "36px serif";
		ctx.fillStyle = "green";
		ctx.textAlign  = "center";
		ctx.fillText(txt, x, y);
	};
}

function CharacterSelectScreen(gameContext)
{
	var characterModelFactory = new CharacterModelFactory(gameContext.resources);
	var catModel = characterModelFactory.createCatModel();
	var dogModel = characterModelFactory.createDogModel();
	
	var selectedModel = catModel;
	
	this.update = function(gameContext)
	{	
		catModel.update();
		dogModel.update();
		
		switch (gameContext.playerProfile.selectedCharacter)
		{
			case characters.cat:
				selectedModel = catModel;
				break;
				
			case characters.dog:
				selectedModel = dogModel;
				break;
		}
	};
	
	this.draw = function(renderer)
	{
		var characterSize = 200;
		
		var catX = (renderer.viewport.width - characterSize) / 2;
		catX -= characterSize;
		var y = (renderer.viewport.height - characterSize) / 2;
	
		catModel.rect.pos.x = catX;
		catModel.rect.pos.y = y;
		catModel.rect.width = characterSize;
		catModel.rect.height = characterSize;
		catModel.draw(renderer);
		
		var dogX = catX + characterSize * 2;
		
		dogModel.rect.pos.x = dogX;
		dogModel.rect.pos.y = y;
		dogModel.rect.width = characterSize;
		dogModel.rect.height = characterSize;
		dogModel.draw(renderer);
		
		var selectionX = selectedModel === catModel ? catX : dogX;
		
		var ctx = renderer.context;
		ctx.strokeStyle = "green";
		ctx.strokeRect(selectionX, y, characterSize, characterSize);
		
		// Overlay with text
		var x = renderer.viewport.centreX();
		var y = renderer.viewport.centreY() / 2;
		var txt = "Choose a character";
		
		ctx.font = "36px serif";
		ctx.fillStyle = "green";
		ctx.textAlign  = "center";
		ctx.fillText(txt, x, y);
	};
}

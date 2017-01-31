function SelectCharacterState(world)
{
	this.characterSelectScreen = new CharacterSelectScreen(world);
	
	this.hasSelectedCharacter = false;
	
	this.onEnter = function(world)
	{
		this.hasSelectedCharacter = false;
	}
	
	this.onExit = function(world)
	{
		this.hasSelectedCharacter = false;	
	}
	
	this.onKeyDown = function(e)
	{
		switch(e.key)
		{
			case "ArrowLeft":
			case "a":
			case "A":
				world.selectedModel = world.catModel;
				break;
				
			case "ArrowRight":
			case "d":
			case "D":
				world.selectedModel = world.dogModel;
				break;
				
			case " ":
				this.hasSelectedCharacter = true;
				break;
		}
	}
	
	this.update = function(world)
	{
		this.characterSelectScreen.update(world);
	}
	
	this.draw = function(renderer)
	{
		world.background.draw(renderer);
		
		this.characterSelectScreen.draw(renderer);
	}
}

SelectCharacterState.prototype = new StateMachineState();
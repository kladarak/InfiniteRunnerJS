function SelectCharacterState()
{
	this.characterSelectScreen = null;
	this.hasSelectedCharacter = false;
	this.playerProfile = null;
	
	this.onEnter = function(gameContext)
	{
		this.hasSelectedCharacter = false;
		this.characterSelectScreen = new CharacterSelectScreen(gameContext);
		this.playerProfile = gameContext.playerProfile;
	}
	
	this.onExit = function(gameContext)
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
				this.playerProfile.selectedCharacter = characters.cat;
				break;
				
			case "ArrowRight":
			case "d":
			case "D":
				this.playerProfile.selectedCharacter = characters.dog;
				break;
				
			case " ":
				this.hasSelectedCharacter = true;
				break;
		}
	}
	
	this.update = function(gameContext)
	{
		this.characterSelectScreen.update(gameContext);
	}
	
	this.draw = function(gameContext)
	{
		gameContext.world.background.draw(gameContext.renderer);
		
		this.characterSelectScreen.draw(gameContext.renderer);
	}
}

SelectCharacterState.prototype = new StateMachineState();
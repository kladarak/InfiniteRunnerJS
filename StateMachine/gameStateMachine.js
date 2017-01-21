function createGameStateMachine(world)
{
	var sm = new StateMachine();
	
	var addTransition = function(fromState, toState, condition)
	{
		var transition = new StateMachineTransition(fromState, toState, condition);
		sm.transitions.push(transition);
	};
	
	var loadingState			= new LoadingState(world);
	var selectCharacterState	= new SelectCharacterState(world);
	var playingGameState		= new PlayingGameState(world);
	var gameOverState			= new GameOverState(world);
	
	sm.states.push(loadingState);
	sm.states.push(selectCharacterState);
	sm.states.push(playingGameState);
	sm.states.push(gameOverState);
	
	addTransition(loadingState, selectCharacterState, function()
	{
		return (numResourcesLoading === 0);
	});
	
	addTransition(selectCharacterState, playingGameState, function()
	{
		return selectCharacterState.hasSelectedCharacter;
	});
	
	addTransition(playingGameState, gameOverState, function()
	{
		return !world.player.isAlive;
	});
	
	addTransition(gameOverState, selectCharacterState, function()
	{
		return gameOverState.shouldRestartGame;
	});
	
	sm.setCurrentState(loadingState);
	
	return sm;
}

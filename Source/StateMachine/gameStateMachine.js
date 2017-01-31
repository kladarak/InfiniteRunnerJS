function createGameStateMachine()
{
	var sm = new StateMachine();
	
	var addTransition = function(fromState, toState, condition)
	{
		var transition = new StateMachineTransition(fromState, toState, condition);
		sm.transitions.push(transition);
	};
	
	var loadingState			= new LoadingState();
	var selectCharacterState	= new SelectCharacterState();
	var playingGameState		= new PlayingGameState();
	var gameOverState			= new GameOverState();
	
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
		return !playingGameState.player.isAlive;
	});
	
	addTransition(gameOverState, selectCharacterState, function()
	{
		return gameOverState.shouldRestartGame;
	});
	
	return sm;
}

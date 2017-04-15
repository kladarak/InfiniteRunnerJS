function StateMachineState()
{
	this.onEnter		= function(gameContext) {}
	this.onExit			= function(gameContext) {}
	this.onKeyDown		= function(event) 		{}
	this.onKeyUp		= function(event) 		{}
	this.update			= function(gameContext) {}
	this.draw			= function(gameContext)	{}
}

function StateMachineTransition(fromState, toState, condition)
{
	this.fromState	= fromState;
	this.toState	= toState;
	this.condition	= condition;
}

function StateMachine()
{
	this.states = [];
	this.transitions = [];
	this.currentState = null;
	
	this.setCurrentState = function(newState, gameContext)
	{
		if (this.currentState)
		{
			this.currentState.onExit(gameContext);
		}
		
		this.currentState = newState;
		
		if (this.currentState)
		{
			this.currentState.onEnter(gameContext);
		}
	}
	
	this.checkTransitions = function()
	{
		for (transition of this.transitions)
		{
			if (transition.fromState === this.currentState && transition.condition())
			{
				return transition.toState;
			}
		}
		
		return null;
	};
	
	this.update = function(gameContext)
	{
		// If currentState is null, set it to the first one (if possible)
		if (this.currentState === null)
		{
			if (this.states.length > 0)
			{
				this.setCurrentState(this.states[0], gameContext);
			}
		}
		
		// If currentState is still null, then this is an empty state machine.
		if (this.currentState === null)
		{
			return;
		}
		
		// Check transitions; if its condition is valid, change state and start loop again.
		// Then update state and check transitions again.
		// Keep doing this until the state does not change.
		// In most cases, this loop will simply find that no transitions are valid to be taken and will update the current state once.
		
		var lastUpdatedState = null;
		
		while (lastUpdatedState !== this.currentState)
		{
			lastUpdatedState = this.currentState;
			
			// Check transitions before and after state update;
			// If a transition succeeds before the state updates, go back to beginning of loop and check again.
			// In this way, many transitions may be taken before updating a state.
			
			var nextState = this.checkTransitions();
			if (nextState)
			{
				this.setCurrentState(nextState, gameContext);
				continue;
			}
			
			this.currentState.update(gameContext);
			
			nextState = this.checkTransitions();
			if (nextState)
			{
				this.setCurrentState(nextState, gameContext);
			}
		}
	}
}

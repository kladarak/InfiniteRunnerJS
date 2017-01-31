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
		
		// Update state and check transitions.
		// If a transition's condition is valid,
		// change state and update again.
		
		var lastUpdatedState = null;
		
		while (lastUpdatedState !== this.currentState)
		{
			this.currentState.update(gameContext);
			lastUpdatedState = this.currentState;
			
			for (transition of this.transitions)
			{
				if (transition.fromState === this.currentState && transition.condition())
				{
					this.setCurrentState(transition.toState, gameContext);
					break;
				}
			}
		}
	}
}

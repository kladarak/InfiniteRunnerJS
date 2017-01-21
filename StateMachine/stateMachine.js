function StateMachineState()
{
	this.onEnter		= function(world) {}
	this.onExit			= function(world) {}
	this.onKeyDown		= function(event) {}
	this.onKeyUp		= function(event) {}
	this.update			= function(world) {}
	this.draw			= function(renderer) {}
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
	
	this.setCurrentState = function(newState, world)
	{
		if (this.currentState)
		{
			this.currentState.onExit(world);
		}
		
		this.currentState = newState;
		
		if (this.currentState)
		{
			this.currentState.onEnter(world);
		}
	}
	
	this.update = function(world)
	{
		if (this.currentState === null)
		{
			return false;
		}
		
		for (let transition of this.transitions)
		{
			if (transition.fromState === this.currentState)
			{
				if (transition.condition())
				{
					this.setCurrentState(transition.toState, world);
					return true;
				}
			}
		}
		
		return false;
	}
}

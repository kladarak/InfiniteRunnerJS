var enemyStates =
{
	idle: "idle",
	walk: "walk",
	fly: "fly",
	hit: "hit",
};

var enemyConstants =
{
	patrolSpeed: 1,
};

function Enemy(enemyModel, patrolPoints)
{
	this.state				= enemyStates.idle;
	this.model 				= enemyModel;
	this.patrolPoints		= patrolPoints || [];
	this.patrolPointIndex	= 0;
	this.rect				= new Rect(100, 200, 100, 100);
	this.isAlive			= true;
	this.facingRight		= true;
	
	this.setState = function(state)
	{
		this.state = state;
		
		var getNewCharacterModelState = function()
		{
			switch (state)
			{
				case enemyStates.idle:	return enemyModelStates.idle;
				case enemyStates.walk:	return enemyModelStates.walk;
				case enemyStates.fly:	return enemyModelStates.fly;
				case enemyStates.hit:	return enemyModelStates.hit;
			}
			
			return enemyModelStates.idle;
		};
		
		this.model.setState( getNewCharacterModelState() );
	};
	
	this.setKilled = function(isKilled)
	{
		this.isAlive = !isKilled;
		
		if (isKilled)
		{
			this.setState(enemyStates.hit);
		}
	};
	
	this.updatePatrol = function()
	{
		if (this.patrolPoints.length === 0)
		{
			return;
		}
		
		var pos = this.rect.pos;
		var newPos = new Vector(pos.x, pos.y, pos.z);
		
		var targetPoint = this.patrolPoints[this.patrolPointIndex];
		var deltaToPoint = targetPoint.subtract(pos);
		
		if (deltaToPoint.length() < enemyConstants.patrolSpeed)
		{
			this.patrolPointIndex = (this.patrolPointIndex + 1) % this.patrolPoints.length;	
			newPos = targetPoint;
		}
		else
		{
			deltaToPoint = deltaToPoint.unit();
			deltaToPoint = deltaToPoint.multiply(enemyConstants.patrolSpeed);
			newPos = pos.add(deltaToPoint);
		}
		
		var deltaPos = newPos.subtract(pos);
		this.facingRight = deltaPos.x >= 0;
		pos.init(newPos.x, newPos.y, newPos.z);
	};
	
	this.updateDeathAnimation = function()
	{
		this.rect.pos.y += 2.0;
	};
	
	this.update = function(gameContext)
	{
		if (this.isAlive)
		{
			this.updatePatrol();
		}
		else
		{
			this.updateDeathAnimation();
		}
		
		this.model.update();
	}
	
	this.draw = function(renderer)
	{
		this.model.rect.pos.x = 0;
		this.model.rect.pos.y = 0;
		this.model.rect.width = this.rect.width;
		this.model.rect.height = this.rect.height;
		
		var scale = {};
		scale.x = 1;
		scale.y = 1;
		
		var translation = {};
		translation.x = this.rect.pos.x;
		translation.y = this.rect.pos.y;
		
		if (this.facingRight)
		{
			scale.x = -1;
			translation.x += this.rect.width;
		}
		
		if (!this.isAlive)
		{
			scale.y = -1;
			translation.y += this.rect.height;
		}
		
		var ctx = renderer.context;
		ctx.save();
		
		ctx.translate(translation.x, translation.y);
		ctx.scale(scale.x, scale.y);
		
		this.model.draw(renderer);

		// Debug draw bounding rect
		//ctx.strokeStyle = "red";
		//ctx.strokeRect(0, 0, this.rect.width, this.rect.height);
		
		ctx.restore();
	}
}

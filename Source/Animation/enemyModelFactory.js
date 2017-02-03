var enemyModelStates =
{
	idle: "idle",
	walk: "walk",
	fly: "fly",
	hit: "hit",
};

function EnemyModelFactory(enemyResources)
{
	var createAnimationSet = function(animRes)
	{
		var loop = true;
		var animations = {};
		
		animations.idle = animRes.idle	? new AnimatedSprite( animRes.idle, loop )	: null;
		animations.walk = animRes.walk	? new AnimatedSprite( animRes.walk, loop )	: null;
		animations.fly 	= animRes.fly	? new AnimatedSprite( animRes.fly, loop )	: null;
		animations.hit 	= animRes.hit	? new AnimatedSprite( animRes.hit, loop )	: null;
		
		return animations;
	};
	
	var createModel = function(animRes)
	{
		var state = animRes.fly ? enemyModelStates.fly : enemyModelStates.idle;
		var animSet = createAnimationSet(animRes);
		return new AnimatedModel(animSet, state);
	};
	
	var enemies = enemyResources;
	
	this.createBatModel				= function() { return createModel(enemies.bat); };
	this.createDragonModel			= function() { return createModel(enemies.dragon); };
	this.createBlueMonsterModel		= function() { return createModel(enemies.blueMonster); };
	this.createGooseberryModel		= function() { return createModel(enemies.gooseberryMonster); };
	this.createGreenMonsterModel	= function() { return createModel(enemies.greenMonster); };
	
	this.createGreyBlobMonsterModel	= function()
	{
		var model = createModel(enemies.greyBlobMonster);
		model.animations.hit.loop = false;
		return model;
	};
	
	this.createIceMonsterModel		= function() { return createModel(enemies.iceMonster); };
	this.createOrangeMonsterModel	= function() { return createModel(enemies.orangeMonster); };
	this.createOrangeSpiderModel	= function() { return createModel(enemies.orangeSpider); };
	this.createPinkBirdModel		= function() { return createModel(enemies.pinkBird); };
	this.createPinkMonsterModel		= function() { return createModel(enemies.pinkMonster); };
	this.createRedBirdModel			= function() { return createModel(enemies.redBird); };
	this.createRockMonsterModel		= function() { return createModel(enemies.rockMonster); };
	this.createWormMonsterModel		= function() { return createModel(enemies.wormMonster); };
	
	var landMonsterFuncs = [];
	landMonsterFuncs.push(this.createBlueMonsterModel);
	landMonsterFuncs.push(this.createGooseberryModel);
	landMonsterFuncs.push(this.createGreenMonsterModel);
	landMonsterFuncs.push(this.createGreyBlobMonsterModel);
	landMonsterFuncs.push(this.createIceMonsterModel);
	landMonsterFuncs.push(this.createOrangeMonsterModel);
	landMonsterFuncs.push(this.createOrangeSpiderModel);
	landMonsterFuncs.push(this.createPinkMonsterModel);
	landMonsterFuncs.push(this.createRockMonsterModel);
	landMonsterFuncs.push(this.createWormMonsterModel);
			
	this.createRandomLandMonster = function()
	{
		var index = getRandomInt(0, landMonsterFuncs.length);
		return landMonsterFuncs[index]();
	};
}

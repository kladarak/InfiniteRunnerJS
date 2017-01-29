var world =
{
	background: null,
	platforms: [],
	objects: [],
	player: null,

	catModel: null,
	dogModel: null,
	selectedModel: null,
	
	resources: null,
	renderer: null,
	camera: null,
	score: 0,
	highscore: 0,
	
	draw: function()
	{
		this.background.draw(this.renderer);
		
		var ctx = this.renderer.context;
		ctx.save();
		
		ctx.translate(-this.camera.pos.x, -this.camera.pos.y);
		
		for (o of this.objects) { o.draw(this.renderer); }
		
		this.player.draw(this.renderer);
		
		ctx.restore();
	}
};

var gameStateMachine = null;

function init()
{
	var canvas = document.getElementById("TheCanvas");
	
	world.renderer = new Renderer(canvas);
	world.camera = new Camera();
	world.resources = new Resources();
	
	world.background = new Sprite(world.resources.background);
	world.background.rect.width = 1000;
	world.background.rect.height = 750;
	
	world.catModel = new CharacterModel(world.resources.cat);
	world.dogModel = new CharacterModel(world.resources.dog);
	world.selectedModel = world.catModel;
	
	gameStateMachine = createGameStateMachine(world);
}

function onKeyDown(e)
{
	gameStateMachine.currentState.onKeyDown(e);
}

function onKeyUp(e)
{
	gameStateMachine.currentState.onKeyUp(e);
}

function update()
{
	do
	{
		gameStateMachine.currentState.update(world);
	}
	while (gameStateMachine.update(world));
}

// Use this function to check that objects get cleaned up correctly.
function debugDraw()
{
	world.renderer.clearScreen();
	
	var ctx = world.renderer.context;
	ctx.save();
	
	ctx.scale(0.6, 0.6);
	ctx.translate(300, 50);
	
	gameStateMachine.currentState.draw(world.renderer);
	
	ctx.restore();
}

function draw()
{
	gameStateMachine.currentState.draw(world.renderer);
}

function tick()
{
	update();
	draw();
}

function main()
{
	init();
	setInterval(tick, 10);
}

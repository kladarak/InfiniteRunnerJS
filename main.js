var world =
{
	background: null,
	platforms: [],
	platformSpawner: null,
	platformUpdater: null,
	player: null,

	catModel: null,
	dogModel: null,
	selectedModel: null,
	
	resources: null,
	renderer: null,
};

var gameStateMachine = null;

function init()
{
	var canvas = document.getElementById("TheCanvas");
	
	world.renderer = new Renderer(canvas);
	world.resources = new Resources();
	
	world.background = new EnvTile(world.resources.background);
	world.background.width = 1000;
	world.background.height = 750;
	
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

var world =
{
	background: null,
	platforms: [],
	platformSpawner: null,
	platformUpdater: null,
	player: null,
	
	characterSelectScreen: null,
	scoreDisplay: null,
	gameOverScreen: null,

	catModel: null,
	dogModel: null,
	selectedModel: null,
	
	resources: null,
	renderer: null,
};

var gameStates =
{
	loading:			"loading",
	characterSelect:	"characterSelect",
	running:			"running",
	gameover:			"gameover",
};

var gameState = gameStates.loading;

function restartGame()
{
	world.platforms = [];
	
	var firstPlatform = new Platform(20, 3, world.resources.ground);
	firstPlatform.x = 0;
	firstPlatform.y = world.renderer.screenHeight - firstPlatform.height;
	world.platforms.push(firstPlatform);
	
	world.platformSpawner = new PlatformSpawner();
	world.platformUpdater = new PlatformUpdater();
	
	world.player = new Player(world.selectedModel);
}

function onKeyDown(e)
{
	if (gameState === gameStates.characterSelect)
	{
		if (e.keyCode == 67)
		{
			world.selectedModel = world.catModel;
		}
		else if (e.keyCode == 68)
		{
			world.selectedModel = world.dogModel;
		}
		else if (e.keyCode == 32)
		{
			restartGame();
			gameState = gameStates.running;
		}
	}
	else if (gameState === gameStates.running)
	{
		if (e.keyCode == 32)
		{
			world.player.setJumping(true);
		}
	}
	else if (gameState === gameStates.gameover)
	{
		gameState = gameStates.characterSelect;
	}
}

function onKeyUp(e)
{
	if (gameState === gameStates.running)
	{
		if (e.keyCode == 32)
		{
			world.player.setJumping(false);
		}
	}
}

function init()
{
	var canvas = document.getElementById("TheCanvas");
	
	world.renderer = new Renderer(canvas);
	world.resources = new Resources();
	
	world.background = new EnvTile(world.resources.background);
	world.background.width = 1000;
	world.background.height = 750;
	
	world.scoreDisplay = new ScoreDisplay();
	world.gameOverScreen = new GameOverScreen();
	
	world.catModel = new CharacterModel(world.resources.cat);
	world.dogModel = new CharacterModel(world.resources.dog);
	world.selectedModel = world.catModel;
	
	world.characterSelectScreen = new CharacterSelectScreen(world);
}

function update()
{
	if (gameState === gameStates.characterSelect)
	{
		world.characterSelectScreen.update(world);
	}
	else if (gameState === gameStates.running)
	{
		world.platformUpdater.update(world);
		world.platformSpawner.update(world);
		world.player.update(world);
		world.scoreDisplay.update(world);
		
		if (!world.player.isAlive)
		{
			world.gameOverScreen.update(world);
			gameState = gameStates.gameover;
		}
	}
	else if (gameState === gameStates.gameover)
	{
		world.gameOverScreen.update(world);
	}
}

function draw()
{
	var renderer = world.renderer;
	
	world.background.draw(renderer);
	world.platforms.forEach(function (p) { p.draw(renderer); });
	
	if (gameState === gameStates.characterSelect)
	{
		world.characterSelectScreen.draw(renderer);
	}
	else if (gameState === gameStates.running)
	{
		world.player.draw(renderer);
		world.scoreDisplay.draw(renderer);
	}
	else if (gameState === gameStates.gameover)
	{
		world.gameOverScreen.draw(renderer);
	}
}

function tick()
{
	if (numResourcesLoading > 0)
	{
		return;
	}
	
	update();
	draw();
}

function main()
{
	init();
	gameState = gameStates.characterSelect;
	
	setInterval(tick, 10);
}

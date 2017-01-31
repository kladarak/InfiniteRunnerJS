var game = null;
	
function onKeyDown(e)
{
	game.onKeyDown(e);
}

function onKeyUp(e)
{
	game.onKeyUp(e);
}

function main()
{
	var canvas = document.getElementById("TheCanvas");
	
	game = new Game(canvas);
	
	setInterval(function() { game.tick(); }, 10);
}

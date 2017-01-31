function Renderer(canvas)
{
	this.canvas		= canvas;
	this.context	= canvas.getContext("2d");
	this.viewport	= new Rect(0, 0, canvas.width, canvas.height);
	
	this.clearScreen = function ()
	{
		this.context.clearRect(0, 0, this.viewport.width, this.viewport.height);
	}
}

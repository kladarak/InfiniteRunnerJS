function Renderer(inCanvas)
{
	this.canvas = inCanvas;
	this.context = inCanvas.getContext("2d");
	this.screenWidth = inCanvas.width;
	this.screenHeight = inCanvas.height;
	
	this.clearScreen = function ()
	{
		this.context.clearRect(0, 0, this.screenWidth, this.screenHeight);
	}
}

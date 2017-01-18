function Renderer(inCanvas)
{
	this.canvas = inCanvas;
	this.context = inCanvas.getContext("2d");
	this.screenWidth = inCanvas.width;
	this.screenHeight = inCanvas.height;
}

function Rect(x, y, w, h)
{
	this.x 		= x !== undefined ? x : 0;
	this.y 		= y !== undefined ? y : 0;
	this.width	= w !== undefined ? w : 100;
	this.height	= h !== undefined ? h : 100;
	
	this.left		= function() { return this.x; };
	this.top		= function() { return this.y; };
	this.right		= function() { return this.x + this.width; };
	this.bottom 	= function() { return this.y + this.height; };
	this.centreX 	= function() { return this.x + (this.width / 2); };
	this.centreY 	= function() { return this.y + (this.height / 2); };
}

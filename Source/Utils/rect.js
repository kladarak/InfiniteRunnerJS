function Rect(x, y, w, h)
{
	this.pos	= new Vector(x, y);
	this.width	= w || 100;
	this.height	= h || 100;
	
	this.left		= function() { return this.pos.x; };
	this.top		= function() { return this.pos.y; };
	this.right		= function() { return this.pos.x + this.width; };
	this.bottom 	= function() { return this.pos.y + this.height; };
	this.centreX 	= function() { return this.pos.x + (this.width / 2); };
	this.centreY 	= function() { return this.pos.y + (this.height / 2); };
	this.centre		= function() { return new Vector(this.centreX(), this.centreY()); }
	
	this.overlaps = function(other)
	{
		return this.left() < other.right()
			&& this.right() > other.left()
			&& this.top() < other.bottom()
			&& this.bottom() > other.top();
	};
	
	this.containsPoint = function(point)
	{
		return this.left() < point.x
			&& this.right() > point.x
			&& this.top() < point.y
			&& this.bottom() > point.y;
	};
}

function Physics()
{
	
}

Physics.findObjectsOverlappingRect = function(objects, rect)
{
	return objects.filter(function(o)
	{
		return o.rect.overlaps(rect);
	});
};

Physics.findObjectsWhoseTopOverlapRect = function(objects, rect)
{
	return objects.filter(function(o)
	{
		// similar to rect.overlaps, except we only consider the top of the object for y axis checks.
		return o.rect.left() < rect.right()
			&& o.rect.right() > rect.left()
			&& o.rect.top() <= rect.bottom()
			&& o.rect.top() >= rect.top();
	});
};

Physics.selectHighestObject = function(objects)
{
	var highestObject = null;
	
	for (object of objects)
	{
		if (highestObject === null || highestObject.rect.top() > object.rect.top())
		{
			highestObject = object;
		}
	}
	
	return highestObject;
};

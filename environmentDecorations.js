function EnvironmentDecorationFactory(envDecorResources)
{
	var res = envDecorResources;
	var scale = 1;
	
	var allImages = res.bushes.concat(res.mushrooms, res.signs, res.trees, res.crate, res.stone);
	
	var getRandomItem = function(items)
	{
		var index = getRandomInt(0, items.length);
		return items[index];
	};
	
	var createSprite = function(img)
	{
		var sprite = new Sprite(img);
		sprite.rect.width = img.width * scale;
		sprite.rect.height = img.height * scale;
		return sprite;
	};
	
	var createRandomSprite = function(imageItems)
	{
		return createSprite( getRandomItem(imageItems) );
	};
	
	this.createRandomBush		= function() { return createRandomSprite(res.bushes); };
	this.createRandomMushroom	= function() { return createRandomSprite(res.mushrooms); };
	this.createRandomSigns		= function() { return createRandomSprite(res.signs); };
	this.createRandomTrees		= function() { return createRandomSprite(res.trees); };
	this.createCrate			= function() { return createSprite(res.crate); };
	this.createStone			= function() { return createSprite(res.stone); };
	this.createRandomDecoration = function() { return createRandomSprite(allImages); };
}

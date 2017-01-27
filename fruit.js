function Fruit(img)
{
	var size = 50;
	
	this.sprite = new Sprite(img);
	this.rect = new Rect(0, 0, size, size);
	
	this.draw = function(renderer)
	{
		this.sprite.rect = this.rect;
		this.sprite.draw(renderer);
	}
}

Fruit.size = 50;

function FruitFactory(fruitResources)
{
	var allFruitImages = fruitResources.allFruits;
	
	this.createRandomFruit = function()
	{
		var fruitIndex = getRandomInt(0, allFruitImages.length);
		var fruitImage = allFruitImages[fruitIndex];
		return new Fruit(fruitImage);
	}
}

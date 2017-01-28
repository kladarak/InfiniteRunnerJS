function Fruit(img)
{
	var size = 50;
	
	this.sprite = new Sprite(img);
	this.rect = new Rect(0, 0, size, size);
	this.visible = true;
	
	this.update = function(world)
	{
		if (!this.visible)
		{
			return;
		}
		
		if (world.player.rect.containsPoint(this.rect.centre()))
		{
			this.visible = false;
			world.score += 100;
			
			var scorePopUp = new ScorePopUp(100, this.rect.centre());
			world.objects.push(scorePopUp);
		}
	};
	
	this.draw = function(renderer)
	{
		if (this.visible)
		{
			this.sprite.rect = this.rect;
			this.sprite.draw(renderer);
		}
	};
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

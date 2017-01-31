function Fruit(img)
{
	var size = 50;
	
	this.sprite = new Sprite(img);
	this.sprite.rect = new Rect(0, 0, size, size);
	this.rect = new Rect(0, 0, size, size);
	this.visible = true;
	this.rotation = 0;
	this.rotDelta = Math.PI / 64;
	
	this.update = function(world)
	{
		if (!this.visible)
		{
			return;
		}
		
		if (Math.abs(this.rotation) > (Math.PI / 8))
		{
			this.rotDelta = -this.rotDelta;
		}
		
		this.rotation += this.rotDelta;
		
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
		if (!this.visible)
		{
			return;
		}
	
		var ctx = renderer.context;
		ctx.save();
		
		var centre = this.rect.centre();
		ctx.translate(centre.x, centre.y);
		ctx.rotate(this.rotation);
		
		var spriteCentre = this.sprite.rect.centre();
		ctx.translate(-spriteCentre.x, -spriteCentre.y);
		
		this.sprite.draw(renderer);
		
		ctx.restore();
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

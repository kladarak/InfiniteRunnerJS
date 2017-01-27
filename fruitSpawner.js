function createNewFruit(fruitResources, camera, renderer)
{
	var fruitIndex = getRandomInt(0, fruitResources.allFruits.length);
	var fruitImage = fruitResources.allFruits[fruitIndex];
	
	var size = 50;
	var x = camera.pos.x + renderer.screenWidth;
	var y = getRandomFloat(0, renderer.screenHeight - size);
	
	var fruit = new Sprite(fruitImage);
	fruit.rect = new Rect(x, y, size, size);
	
	return fruit;
}

function FruitSpawner()
{
	this.distanceUntilNextFruit = 0;
	
	this.update = function(world)
	{
		this.distanceUntilNextFruit -= 1;
		
		if (this.distanceUntilNextFruit <= 0)
		{
			var newFruit = createNewFruit(world.resources.fruit, world.camera, world.renderer);
			world.fruits.push(newFruit);
			
			this.distanceUntilNextFruit = 50;
		}
	}
}

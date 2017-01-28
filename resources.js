var numResourcesLoading = 0;

function createImage(filepath)
{
	++numResourcesLoading;
	
	var newImg = new Image();
	
	newImg.addEventListener("load", function ()
	{
		--numResourcesLoading;
	}, false);
	
	newImg.src = filepath;
	
	return newImg;
}

function createImageSpriteSet(prefixFilepath, suffixFilepath, count)
{
	var imageSpriteSet = [];
	
	for (var i = 1; i <= count; ++i)
	{
		var filepath = prefixFilepath + i + suffixFilepath;
		imageSpriteSet.push( createImage(filepath) );
	}
	
	return imageSpriteSet;
}

function createAnimalSpriteSets(assetPath)
{
	var animal = {};
	
	animal.dead			= createImageSpriteSet(assetPath + "Dead (", ").png", 10);
	animal.fall			= createImageSpriteSet(assetPath + "Fall (", ").png", 8);
	animal.hurt			= createImageSpriteSet(assetPath + "Hurt (", ").png", 10);
	animal.idle			= createImageSpriteSet(assetPath + "Idle (", ").png", 10);
	animal.jump			= createImageSpriteSet(assetPath + "Jump (", ").png", 8);
	animal.run			= createImageSpriteSet(assetPath + "Run (", ").png", 8);
	animal.slide		= createImageSpriteSet(assetPath + "Slide (", ").png", 10);
	animal.walk			= createImageSpriteSet(assetPath + "Walk (", ").png", 10);
	
	return animal;
}

function Resources()
{
	var tilesAssetPath		= "freetileset/png/Tiles/";
	var bgAssetPath			= "freetileset/png/BG/";
	var envDecorAssetPath	= "freetileset/png/Object/";
	var catAssetPath		= "catndog/png/cat/";
	var dogAssetPath		= "catndog/png/dog/";
	var fruitAssetPath		= "cake_128/";
	
	this.background			= createImage(bgAssetPath + "BG.png");
	
	this.ground = {};
	this.ground.topLeft		= createImage(tilesAssetPath + "1.png");
	this.ground.topMiddle	= createImage(tilesAssetPath + "2.png");
	this.ground.topRight	= createImage(tilesAssetPath + "3.png");
	this.ground.left		= createImage(tilesAssetPath + "4.png");
	this.ground.middle		= createImage(tilesAssetPath + "5.png");
	this.ground.right		= createImage(tilesAssetPath + "6.png");
	
	this.envDecor = {};
	this.envDecor.bushes	= createImageSpriteSet(envDecorAssetPath + "Bush (", ").png", 4);
	this.envDecor.mushrooms	= createImageSpriteSet(envDecorAssetPath + "Mushroom_", ".png", 2);
	this.envDecor.signs		= createImageSpriteSet(envDecorAssetPath + "Sign_", ".png", 2);
	this.envDecor.trees		= createImageSpriteSet(envDecorAssetPath + "Tree_", ".png", 3);
	this.envDecor.crate		= createImage(envDecorAssetPath + "Crate.png");
	this.envDecor.stone		= createImage(envDecorAssetPath + "Stone.png");
	
	this.cat 				= createAnimalSpriteSets(catAssetPath);
	this.dog 				= createAnimalSpriteSets(dogAssetPath);
	
	this.fruit = {};
	this.fruit.pear			= createImage(fruitAssetPath + "46.png");
	this.fruit.apple		= createImage(fruitAssetPath + "47.png");
	this.fruit.orange		= createImage(fruitAssetPath + "48.png");
	this.fruit.tomato		= createImage(fruitAssetPath + "49.png");
	this.fruit.carrot		= createImage(fruitAssetPath + "50.png");
	this.fruit.banana		= createImage(fruitAssetPath + "53.png");
	this.fruit.grapes		= createImage(fruitAssetPath + "54.png");
	this.fruit.cherries		= createImage(fruitAssetPath + "55.png");
	this.fruit.lemon		= createImage(fruitAssetPath + "56.png");
	
	var allFruits = [];
	for (key in this.fruit)
	{
		allFruits.push(this.fruit[key]);
	}
	
	this.fruit.allFruits = allFruits;
}

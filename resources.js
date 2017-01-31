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
	var enemiesAssetPath	= "Enemies/";
	
	this.background			= createImage(bgAssetPath + "BG.png");
	
	this.ground = {};
	this.ground.topLeft		= createImage(tilesAssetPath + "1.png");
	this.ground.topMiddle	= createImage(tilesAssetPath + "2.png");
	this.ground.topRight	= createImage(tilesAssetPath + "3.png");
	this.ground.left		= createImage(tilesAssetPath + "4.png");
	this.ground.middle		= createImage(tilesAssetPath + "5.png");
	this.ground.right		= createImage(tilesAssetPath + "6.png");
	
	this.water = {};
	this.water.top			= createImage(tilesAssetPath + "17.png");
	this.water.middle		= createImage(tilesAssetPath + "18.png");
	
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
	
	this.enemies = {};
	
	this.enemies.bat = {};
	this.enemies.bat.fly = createImageSpriteSet(enemiesAssetPath + "Bat/fly/frame-", ".png", 2);
	
	this.enemies.dragon = {};
	this.enemies.dragon.fly = createImageSpriteSet(enemiesAssetPath + "Dragon/fly/frame-", ".png", 4);
	
	this.enemies.blueMonster = {};
	this.enemies.blueMonster.idle = createImageSpriteSet(enemiesAssetPath + "BlueMonster/idle/frame-", ".png", 6);
	this.enemies.blueMonster.walk = createImageSpriteSet(enemiesAssetPath + "BlueMonster/walk/frame-", ".png", 2);
	
	this.enemies.gooseberryMonster = {};
	this.enemies.gooseberryMonster.idle = createImageSpriteSet(enemiesAssetPath + "GooseberryMonster/idle/frame-", ".png", 8);
	this.enemies.gooseberryMonster.walk = createImageSpriteSet(enemiesAssetPath + "GooseberryMonster/walk/frame-", ".png", 8);
	
	this.enemies.greenMonster = {};
	this.enemies.greenMonster.idle = createImageSpriteSet(enemiesAssetPath + "GreenMonster/idle/frame-", ".png", 2);
	this.enemies.greenMonster.hit = createImageSpriteSet(enemiesAssetPath + "GreenMonster/hit/frame-", ".png", 2);
	
	this.enemies.greyBlobMonster = {};
	this.enemies.greyBlobMonster.idle = createImageSpriteSet(enemiesAssetPath + "GreyBlobMonster/idle/frame-", ".png", 10);
	this.enemies.greyBlobMonster.hit = createImageSpriteSet(enemiesAssetPath + "GreyBlobMonster/hit/frame-", ".png", 6);
	
	this.enemies.iceMonster = {};
	this.enemies.iceMonster.idle = createImageSpriteSet(enemiesAssetPath + "IceMonster/idle/frame-", ".png", 1);
	
	this.enemies.orangeMonster = {};
	this.enemies.orangeMonster.idle = createImageSpriteSet(enemiesAssetPath + "OrangeMonster/idle/frame-", ".png", 2);
	this.enemies.orangeMonster.hit = createImageSpriteSet(enemiesAssetPath + "OrangeMonster/hit/frame-", ".png", 1);
	
	this.enemies.orangeSpider = {};
	this.enemies.orangeSpider.idle = createImageSpriteSet(enemiesAssetPath + "OrangeSpider/idle/frame-", ".png", 1);
	
	this.enemies.pinkBird = {};
	this.enemies.pinkBird.fly = createImageSpriteSet(enemiesAssetPath + "PinkBird/fly/frame-", ".png", 2);
	this.enemies.pinkBird.hit = createImageSpriteSet(enemiesAssetPath + "PinkBird/hit/frame-", ".png", 2);
	
	this.enemies.pinkMonster = {};
	this.enemies.pinkMonster.idle = createImageSpriteSet(enemiesAssetPath + "PinkMonster/idle/frame-", ".png", 2);
	this.enemies.pinkMonster.hit = createImageSpriteSet(enemiesAssetPath + "PinkMonster/hit/frame-", ".png", 1);
	
	this.enemies.redBird = {};
	this.enemies.redBird.fly = createImageSpriteSet(enemiesAssetPath + "RedBird/fly/frame-", ".png", 2);
	this.enemies.redBird.hit = createImageSpriteSet(enemiesAssetPath + "RedBird/hit/frame-", ".png", 2);
	
	this.enemies.rockMonster = {};
	this.enemies.rockMonster.idle = createImageSpriteSet(enemiesAssetPath + "RockMonster/idle/frame-", ".png", 1);
	
	this.enemies.wormMonster = {};
	this.enemies.wormMonster.idle = createImageSpriteSet(enemiesAssetPath + "WormMonster/idle/frame-", ".png", 8);
}

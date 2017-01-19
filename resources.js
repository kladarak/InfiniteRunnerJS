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

function Resources()
{
	var tilesAssetPath		= "freetileset/png/Tiles/";
	var bgAssetPath			= "freetileset/png/BG/";
	var catAssetPath		= "catndog/png/cat/";

	this.ground = {}
	this.ground.topLeft		= createImage(tilesAssetPath + "1.png");
	this.ground.topMiddle	= createImage(tilesAssetPath + "2.png");
	this.ground.topRight	= createImage(tilesAssetPath + "3.png");
	this.ground.left		= createImage(tilesAssetPath + "4.png");
	this.ground.middle		= createImage(tilesAssetPath + "5.png");
	this.ground.right		= createImage(tilesAssetPath + "6.png");
	
	this.cat = {};
	this.cat.dead			= createImageSpriteSet(catAssetPath + "Dead (", ").png", 10);
	this.cat.fall			= createImageSpriteSet(catAssetPath + "Fall (", ").png", 8);
	this.cat.hurt			= createImageSpriteSet(catAssetPath + "Hurt (", ").png", 10);
	this.cat.idle			= createImageSpriteSet(catAssetPath + "Idle (", ").png", 10);
	this.cat.jump			= createImageSpriteSet(catAssetPath + "Jump (", ").png", 8);
	this.cat.run			= createImageSpriteSet(catAssetPath + "Run (", ").png", 8);
	this.cat.slide			= createImageSpriteSet(catAssetPath + "Slide (", ").png", 10);
	this.cat.walk			= createImageSpriteSet(catAssetPath + "Walk (", ").png", 10);
	
	this.background			= createImage(bgAssetPath + "BG.png");
}

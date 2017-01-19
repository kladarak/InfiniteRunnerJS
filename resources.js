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
	this.cat.running = [];
	this.cat.running.push( createImage(catAssetPath + "Run (1).png") );
	this.cat.running.push( createImage(catAssetPath + "Run (2).png") );
	this.cat.running.push( createImage(catAssetPath + "Run (3).png") );
	this.cat.running.push( createImage(catAssetPath + "Run (4).png") );
	this.cat.running.push( createImage(catAssetPath + "Run (5).png") );
	this.cat.running.push( createImage(catAssetPath + "Run (6).png") );
	this.cat.running.push( createImage(catAssetPath + "Run (7).png") );
	this.cat.running.push( createImage(catAssetPath + "Run (8).png") );
	
	this.background			= createImage(bgAssetPath + "BG.png");
}

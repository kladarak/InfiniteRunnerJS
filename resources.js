var tilesAssetPath = "freetileset/png/Tiles/";

var numResourcesLoading = 0;

function createImageFilePath(filename)
{
	return tilesAssetPath + filename + ".png";
}

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
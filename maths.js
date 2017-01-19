function getRandomInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function clamp(x, min, max)
{
	return x < min ? min : (x > max ? max : x);
}

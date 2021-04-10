var canvas = document.getElementById("canvas");
var score = document.getElementById("score");
var ctx = canvas.getContext("2d");

var dx = 2;
var dy = -2;
var size = 4; //number of column and row
var isFinished = false;

//Score value
var scoreValue = 0;
//Square
var squareSize = 100;
var spaceSize = 15;
var squares = []; //stock the data of the squares

//Controls
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var isPressed = false;

//Colors
var littleNumberColor = "#776e65";
var bigNumberColor = "#f9f6f2";
var backSquareColor = "#cdc1b4";
var oneColor = "#eee4da"; //2
var twoColor = "#ede0c8"; //4
var threeColor = "#f5af7b";//8
var fourColor = "#f89166";//16
var fiveColor = "#f77b62";//32
var sixColor = "#f95c3f";//64
var sevenColor = "#eeca73";//128
var eightColor = "#eec862";//256
var nineColor = "#efc555";//512
var tenColor = "#edc042";//1024
var elevenColor = "#f1bd2f";//2048
var twelveColor = "#f06570";// ++



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function getRandom(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRow(i){
	return (i / size | 0); // round
}
function getColumn(i){
	return i % size;
}
function initialization(){
	var matrix = [];
	for (
		var i = 0;
		i < size;
		i ++)
	{
		squares[i] = new Array(4);
		for (
			var j = 0;
			j < size;
			j ++)
		{
			squares[i][j] = 0;
		}
	}
	console.log(squares);	
}
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}
function getBacktColor(value){
	var color = twelveColor;
	switch(value){
		case 2:
		color = oneColor;
		break;

		case 4:
		color = twoColor;
		break;

		case 8:
		color = threeColor;
		break;

		case 16:
		color = fourColor;
		break;

		case 32:
		color = fiveColor;
		break;

		case 64:
		color = sixColor;
		break;

		case 128:
		color = sevenColor;
		break;

		case 256:
		color = eightColor;
		break;

		case 512:
		color = nineColor;
		break;

		case 1024:
		color = tenColor;
		break;

		case 2048:
		color = elevenColor;
		break;
	}

	return color;
}
function getTextColor(value){
	var color = littleNumberColor;
	if (value > 4){
		color = bigNumberColor
	}
	return color;
}
function drawSquare(x,y, color, value){
	ctx.beginPath();
	ctx.rect(x, y, squareSize, squareSize);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
	write(x + squareSize/2, y + squareSize/2 + spaceSize, getTextColor(value), value)
}
function write(x, y, color, text){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.font = "52px Arial";
	ctx.textAlign = "center";
	ctx.fillText(text, x, y);
}
function drawBackSquare(x,y){
	ctx.beginPath();
	ctx.rect(x,y,squareSize, squareSize);
	ctx.fillStyle = backSquareColor;
	ctx.fill();
	ctx.closePath();
}
function drawBackSquares(){
	for (
		var row = 0; 
		row < size; 
		row ++ )
	{
		for (
			var column = 0;
			column < size;
			column ++)
		{
			drawBackSquare(spaceSize + row*(squareSize + spaceSize), spaceSize + column*(squareSize + spaceSize));
		}
	}
}
function drawSquares(){
	for (
		var row = 0;
		row < size;
		row ++)
	{
		for (
			var column = 0;
			column < size;
			column ++)
		{
			if (squares[column][row] != 0)
			{
			drawSquare(
				spaceSize + row*(squareSize + spaceSize), 
				spaceSize + column*(squareSize + spaceSize), 
				getBacktColor(squares[column][row]),
				squares[column][row]);
			}
		}
	}
}
function setScore(value){
	scoreValue += value;
	score.textContent = scoreValue;
}
function getIndex(row, column)
{
	return row * 4 + column;
}
function moveLeft(){
	for (
		var row = 0;
		row < size;
		row ++)
	{
		for(
			var column = 0;
			column < size;
			column ++)
		{
			if(squares[row][column] != 0 
				&& column != 0)
			{
				var tmp = column - 1;
				while(squares[row][tmp] == 0 
					&& tmp != 0)
				{			
					tmp --;
				}
				if (squares[row][column] == squares[row][tmp]) //same
				{
					squares[row][column] = 0;
					squares[row][tmp] = squares[row][tmp]*2;
					setScore(squares[row][tmp]);
				}
				else
				{
					var tmpValue = squares[row][column];
					squares[row][column] = 0;
					if (squares[row][tmp] == 0)
					{
						squares[row][tmp] = tmpValue;	
					}
					else
					{
						squares[row][tmp + 1] = tmpValue;						
					}
				}
			}
		}
	}
}
function moveUp(){
	for (
		var row = 0;
		row < size;
		row ++)
	{
		for(
			var column = 0;
			column < size;
			column ++)
		{
			if(squares[row][column] != 0 
				&& row != 0)
			{
				var tmp = row - 1;
				while(squares[tmp][column] == 0
					&& tmp != 0)
				{
					tmp --;
				}
				if(squares[tmp][column] == squares[row][column])
				{
					squares[row][column] = 0;
					squares[tmp][column] *= 2;
					setScore(squares[tmp][column]);
				}
				else
				{
					var tmpValue = squares[row][column];
					squares[row][column] = 0;
					if (squares[tmp][column] == 0)
					{
						squares[tmp][column] = tmpValue;
					}
					else
					{
						squares[tmp + 1][column] = tmpValue;
					}
				}
			}
		}
	}
}
function moveRight(){ //changer le sens du parcours de la matrice
	for (
		var row = size -1;
		row > - 1;
		row --)
	{
		for(
			var column = size -1;
			column > - 1;
			column --)
		{
			if(squares[row][column] != 0 
				&& column != size - 1)
			{
				var tmp = column + 1;
				while(squares[row][tmp] == 0 
					&& tmp != size - 1)
				{
					tmp ++;
				}
				if (squares[row][column] == squares[row][tmp])
				{
					squares[row][column] = 0;
					squares[row][tmp] *= 2;					
					setScore(squares[row][tmp]);
				}
				else
				{
					var tmpValue = squares[row][column];
					squares[row][column] = 0;
					if(squares[row][tmp] == 0)
					{
						squares[row][tmp] = tmpValue;
					}
					else
					{
						squares[row][tmp -1] = tmpValue;
					}
				}
			}
		}
	}
}
function moveDown(){
	for (
		var row = size -1;
		row > - 1;
		row --)
	{
		for(
			var column = size -1;
			column > -1;
			column --)
		{
			if(squares[row][column] != 0 
				&& row != size - 1)
			{
				var tmp = row + 1;
				while(squares[tmp][column] == 0
					&& tmp != size - 1)
				{
					tmp ++;
				}
				if(squares[tmp][column] == squares[row][column])
				{
					squares[row][column] = 0;
					squares[tmp][column] *= 2;					
					setScore(squares[tmp][column]);
				}
				else
				{
					var tmpValue = squares[row][column];
					squares[row][column] = 0;
					if (squares[tmp][column] == 0)
					{
						squares[tmp][column] = tmpValue;
					}
					else
					{
						squares[tmp - 1][column] = tmpValue;
					}
				}
			}
		}
	}
}
function hasNeighbors(row, column)
{
	var count = 0;
	if(row != 0)
	{
		if(squares[row][column] == squares[row - 1][column])
		{
			count ++;
		}
	}	
	if (column != 0)
	{
		if(squares[row][column] == squares[row][column - 1])
		{
			count ++;
		}
	}
	if (row != size - 1)
	{
		if(squares[row][column] == squares[row + 1][column])
		{
			count ++;
		}
	}

	if (column != size - 1)
	{
		if(squares[row][column] == squares[row][column + 1])
		{
			count ++;
		}
	}
	return count != 0;
}
function getNeighbors()
{
	var count = 0;
	for (
		var row = 0;
		row < size;
		row ++){
		for (
			var column = 0;
			column < size;
			column ++){
			if(hasNeighbors(row, column))
			{
				count ++;
			}
		}
	}
	return count;
}
function isLost()
{
	//TODO
	if (isFull())
	{
		console.log("isFull : " + isFull() + " getNeighbors : " + getNeighbors())
		return getNeighbors() == 0;  
	}
	else
	{
		return false;
	}
	
	
}
function isFull()
{
	var count = 0;
	for(
		var row = 0;
		row < size;
		row ++)
	{
		for (
			var column = 0;
			column < size;
			column ++)
		{
			if(squares[row][column] == 0)
			{
				count ++;
			}
		}
	}
	if (count == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}
function add(){
	var isPossible = false;
	while(!isPossible 
		&& !isFull())
	{
		var i = getRandom(0, size -1);
		var j = getRandom(0, size - 1);
		var k = getRandom(0, 1);

		if (squares[i][j] == 0)
		{
			var value = 2;
			if (k == 1)
			{
				value = 4;
			}
			squares[i][j] = value;
			isPossible = true;
		}
	}
}
function draw() {
	if (!isFinished)
	{
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    drawBackSquares();
	    drawSquares();
	    if(!isLost())
	    {
	   		document.onkeydown = function (event) {
			    if (leftPressed)
			    {
			    	console.log("left");
			    	moveLeft();
			    	add();
			    }
			    else if (upPressed)
			    {
			    	console.log("up");
			    	moveUp();
			    	add();
			    }
			    else if (rightPressed)
			    {
			    	console.log("right");
			    	moveRight();
			    	add();
			    }
			    else if (downPressed)
			    {
			    	console.log("down");
			    	moveDown();
			    	add();
			    }
			}
	    }
	    else
	    { 
	    	isFinished = true;
	    	
	    }
	}
	else
	{
		alert("Perdu !");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
	}
}
    //drawSquare(spaceSize, spaceSize, twoColor, 2);



initialization();
add();
var interval = setInterval(draw, 50);
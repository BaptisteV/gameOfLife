var gridSize = 30;
var cellSize = 20;
var margin = 20;

var initialPopulationRate = 0.6;

var speedSlider;
var populationSlider;
var resetButton;
var cells = [[]];
function surrondingCells(cell){
	var surrondings = new Array();
	for(var i = 0; i < gridSize; i++){
		for(var j = 0; j < gridSize; j++){
			var currentCell = cells[i][j];
			// top left
			if(currentCell.x == cell.x - 1 && currentCell.y == cell.y - 1){
				surrondings.push(currentCell);
			}
			// top
			else if(currentCell.x == cell.x && currentCell.y == cell.y - 1){
				surrondings.push(currentCell);
			}
			// top right
			else if(currentCell.x == cell.x + 1 && currentCell.y == cell.y - 1){
				surrondings.push(currentCell);
			}
			// right
			else if(currentCell.x == cell.x + 1 && currentCell.y == cell.y){
				surrondings.push(currentCell);
			}
			// bottom right
			else if(currentCell.x == cell.x + 1 && currentCell.y == cell.y + 1){
				surrondings.push(currentCell);
			}
			// bottom
			else if(currentCell.x == cell.x && currentCell.y == cell.y + 1){
				surrondings.push(currentCell);
			}
			// bottom left
			else if(currentCell.x == cell.x - 1 && currentCell.y == cell.y  + 1){
				surrondings.push(currentCell);
			}
			// left
			else if(currentCell.x == cell.x - 1 && currentCell.y == cell.y){
				surrondings.push(currentCell);
			}
		}
	}
	return(surrondings);
}
function countSurrondingLivingCells(cell){
	var count = 0;
	surrondingCells(cell).forEach((currentCell, i) => {
		if(currentCell.isAlive){
			count++;
		}
	});
	return count;
}

function processCells(){
	var nextGen = [[]];
	for(var i = 0; i < gridSize; i++){
		nextGen[i] = new Array();
		for(var j = 0; j < gridSize; j++){
			var aliveSurrondingCellsCount = countSurrondingLivingCells(cells[i][j]);
			if (aliveSurrondingCellsCount == 3){
				nextGen[i][j] = new Cell(cells[i][j].x, cells[i][j].y, true);
			}
			else if(aliveSurrondingCellsCount == 2){
				nextGen[i][j] = cells[i][j];
			}
			else if((aliveSurrondingCellsCount < 2) || (aliveSurrondingCellsCount > 3)){
				nextGen[i][j] = new Cell(cells[i][j].x, cells[i][j].y, false);
			}
			else{
				nextGen[i][j] = cells[i][j];
			}
		}
	}
	cells = nextGen;
}
function resetGame(){
	for(var i = 0; i < gridSize; i++){
		cells[i] = new Array();
		for(var j = 0; j < gridSize; j++){
			cells[i][j] = new Cell(i, j, Math.random() > initialPopulationRate);
		}
	}
}
class Cell{
	constructor(x, y, isAlive){
		this.x = x;
		this.y = y;
		this.isAlive = isAlive;
	}
}

function setup() {
	
	background(255, 255, 255);
	textSize(22);
	createCanvas(cellSize * gridSize + 1000 , cellSize * gridSize + 1);
	x = width / 2;
	y = height / 2;
	
	resetGame();
	
	resetButton = createButton('Reset');
	resetButton.position(margin + gridSize * cellSize);
	resetButton.mousePressed(resetGame);
	
	speedSlider = createSlider(1,10,100);
	speedSlider.position(gridSize * cellSize + margin, margin);
	
	populationSlider = createSlider(1,10,100);
	populationSlider.position(gridSize * cellSize + margin, margin * 2);
}

function draw() {
	background(240, 240, 240);
	for(var i = 0; i < gridSize; i++){
		for(var j = 0; j < gridSize; j++){
			// Draw a rectangle with rounded corners, each having a radius of 20.
			cells[i][j].isAlive ? fill(0) : fill(255);
			stroke(100);
			rect(cells[i][j].x*20, cells[i][j].y*20, 20, 20);
		}};
		
		if(frameCount % speedSlider.value() == 0){
			processCells();
		}
		// Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
		var fps = frameRate();
		text("FPS: " + fps.toFixed(2), cellSize * gridSize + margin, height - gridSize);
		
		text("Speed", cellSize * gridSize + margin + speedSlider.width + 10, 25);
		text("Population", cellSize * gridSize + margin + populationSlider.width + 10, 45);
}

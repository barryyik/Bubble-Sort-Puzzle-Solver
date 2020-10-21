let arrList = [];
let arrButton = [];
let slider1;
let slider2;
let slider3;
let colorTextR;
let colorTextG;
let colorTextB;
let canvas;

let startButton;
let resetButton;
let generateButton;

let inputField;
let continueButton;

let questionCodeString;
let questionCodeTextField;

let solutionBox;

let totalCol;
let totalColTemp;
let totalColList;
let totalColSetButton;

let emptyCol;
let emptyColTemp;
let emptyColList;
let emptyColSetButton;


let showColorBall = false;
let arrColorSchemeTableBall = [];
let arrColorSchemeTableBallColor = [];
let arrColorSchemeTableButton = [];
let arrColorSchemeTableButtonFx = [];

let arrColorInputBox = [];
let arrColorBallInTube = [];
let arrColorBallInTubeColor = [];

let arrCheckColorNumber = [];
let checkVar;
let checkOK;
let proceedButton;

let arrAllSpacesInTube = [];
let arrAllSpacesInTubeForUse = [];
let arrCurrentSteps = [];
let arrPreviousSteps = [];  // Deleted
let numberOfMovesPerformed;
let numberOfBackwardMoves;
let solvedState;
let arrTempCheckNearlyPerfect = [];
let arrMasterHistory = [];

let finalEndState;
let numberOfExtraMovesPerformed;
let numberOfExtraBackwardMoves;

let showProgressText;
let progressText1;
let progressText2;
let progressText3;
let progressText4;
let progressLine;
let progressLineAngle;
let showDeadendText;
let deadendText;

let showContinueText;



function setup() {
  numberOfMovesPerformed = 0;
  numberOfBackwardMoves = 0;
  solvedState = false;
  showDeadendText = false;
  
  finalEndState = false;
  numberOfExtraMovesPerformed = 0;
  numberOfExtraBackwardMoves = 0;
  showContinueText = false;

  checkVar = 0;
  checkOK = false;
  showProgressText = false;

  progressLineAngle = 0;

  canvas = createCanvas(windowWidth, windowHeight);
  slider1 = createSlider(0,255, random(255));
  slider2 = createSlider(0,255, random(255));
  slider3 = createSlider(0,255, random(255));

  slider1.position(10,10);
  slider2.position(10,40);
  slider3.position(10,70);

  slider1.size(150,20);
  slider2.size(150,20);
  slider3.size(150,20);

  // ---------Buttons---------

  

  resetButton = createButton('Reset');
  resetButton.position(10,120);
  resetButton.mousePressed(resetPressed);

  // ---------Lists---------

  totalColList = createSelect();
  totalColList.position(10,150);
  totalColList.size(75,25);

  for (let i = 3; i < 31; i++) {
    totalColList.option(i);
  }

  totalColSetButton = createButton('1. Set Total Number Of Columns');
  totalColSetButton.position(85,150);
  totalColSetButton.size(250,25);
  totalColSetButton.mousePressed(setTotalCol);

}


function draw() {
  noStroke();
  background(slider1.value(), slider2.value(), slider3.value());

  // Text of RGB
  fill(((slider1.value()+slider2.value()+slider3.value())/3+128)%255);

  colorTextR = text(String('R = ' + slider1.value()), 170, 20);
  colorTextR.textStyle(BOLD);
  colorTextR.textSize(20);

  colorTextG = text(String('G = ' + slider2.value()), 170, 50);
  colorTextG.textStyle(BOLD);
  colorTextG.textSize(20);

  colorTextB = text(String('B = ' + slider3.value()), 170, 80);
  colorTextB.textStyle(BOLD);
  colorTextB.textSize(20);


  // Draw Set Ball Color

  if(showColorBall == true){

    for (let i = 0; i < totalCol-emptyCol; i++) {

      stroke(((slider1.value()+slider2.value()+slider3.value())/3+128)%255);
      strokeWeight(1);

      // Draw Ball Color Table
      fill(arrColorSchemeTableBallColor[i]);
      arrColorSchemeTableBall[i] = circle(50+i*100, 250, 50);

      // Draw Balls in Tubes

    }

    for (let i = 0; i < totalCol; i++) {
      // Draw Tubes

      noFill();
      arc(50+i*100, 600, 60, 60, 0, PI);
      line(20+i*100, 420, 20+i*100, 600);
      line(80+i*100, 420, 80+i*100, 600);

      arrColorBallInTube[i] = [];
      arrColorBallInTubeColor[i] = [];

      if(i < totalCol-emptyCol){
        for (let j = 0; j < 4; j++){
          arrColorBallInTubeColor[i][j] = arrColorSchemeTableBallColor[(arrColorInputBox[i][j].value()-1)];
          fill(arrColorBallInTubeColor[i][j]);
          arrColorBallInTube[i][j] = circle(50+i*100, 600-j*50, 50);
        }
      }
    }
  }

  if(showProgressText == true){
      noStroke();
      fill(((slider1.value()+slider2.value()+slider3.value())/3+128)%255);
      progressText1 = text('testing progressText', 300, 50);
	  progressText2 = text('Solved: ' + String(solvedState), 300, 70);
	  progressText3 = text('The number of moves performed: ' + String(numberOfMovesPerformed), 300, 90);
	  progressText4 = text('The number of backward moves performed: ' + String(numberOfBackwardMoves), 300, 110);
	  
	  
	  if(showDeadendText == true){
		  noStroke();
		  fill(((slider1.value()+slider2.value()+slider3.value())/3+128)%255);
		  
		  deadendText = text('---!!!****Sorry, no solutions found.****!!!---', 300, 130);
	  }

      stroke(((slider1.value()+slider2.value()+slider3.value())/3+128)%255);
      strokeWeight(4);
      translate(545,40)
      rotate(progressLineAngle);
      progressLine = line(-25,0,25,0);
      progressLineAngle+=0.05;
  }
  
}


// Custom Functions

function resetPressed(){
  
  totalColSetButton.removeAttribute('disabled');
  totalColList.removeAttribute('disabled');

  if(emptyColList != null){emptyColList.remove();}
  if(emptyColSetButton != null){emptyColSetButton.remove();}
  

  showColorBall = false;
  arrColorSchemeTableButtonFx.length = 0;
  
  for (let i = 0; i < totalCol-emptyCol; i++) {
    arrColorSchemeTableButton[i].remove();

    for(let j = 0; j < 4; j++){
      arrColorInputBox[i][j].remove();
    }

  }

  arrCheckColorNumber.length = 0;
  checkVar = 0;
  checkOK = false;
  if(startButton != null){startButton.remove();}
  if(proceedButton != null){proceedButton.remove();}
  if(generateButton != null){generateButton.remove();}
  if(inputField != null){inputField.remove();}
  if(continueButton != null){continueButton.remove();}
  if(questionCodeTextField != null){questionCodeTextField.remove();}
  if(solutionBox != null){solutionBox.remove();}
  
  
  arrColorBallInTubeColor.length = 0;
  arrAllSpacesInTube.length = 0;
  showProgressText = false;
  arrCurrentSteps.length = 0;
  arrPreviousSteps.length = 0;
  solvedState = false;
  numberOfMovesPerformed = 0;
  numberOfBackwardMoves = 0;
  arrMasterHistory.length = 0;
  showDeadendText = false;
  
  finalEndState = false;
  numberOfExtraMovesPerformed = 0;
  numberOfExtraBackwardMoves = 0;
  showContinueText = false;
}


function setTotalCol(){
  var totalColTemp = totalColList.value();
  totalCol = totalColTemp;
  totalColSetButton.attribute('disabled', '');
  totalColList.disable();

  // Set Empty Column List & Button

  emptyColList = createSelect();
  emptyColList.position(10,180);
  emptyColList.size(75,25);

  for (let i = 1; i < totalCol-1; i++) {
    emptyColList.option(i);
  }

  emptyColSetButton = createButton('2. Set Empty Columns Number');
  emptyColSetButton.position(85,180);
  emptyColSetButton.size(250,25);
  emptyColSetButton.mousePressed(setEmptyCol);

  // Resize Canvas
  if(totalCol*100 < 800){
    resizeCanvas(1000, windowHeight + 500);
  }else{
    resizeCanvas(10+totalCol*100, windowHeight + 500);
  }

  if(totalCol > 3){emptyColList.selected(2);}

}

function setEmptyCol(){
  var emptyColTemp = emptyColList.value();
  emptyCol = emptyColTemp;
  emptyColSetButton.attribute('disabled', '');
  emptyColList.disable();

  showColorBall = true;

  for (let i = 0; i < totalCol-emptyCol; i++) {
    arrColorSchemeTableButton[i] = createButton('Set Color - ' + String(i+1));
    arrColorSchemeTableButton[i].position(10+i*100, 300);
    arrColorSchemeTableButton[i].size(99, 25);
    arrColorSchemeTableButtonFx[i] = function() {
      // Button function
      var tempR = slider1.value();
      var tempG = slider2.value();
      var tempB = slider3.value();
      arrColorSchemeTableBallColor[i] = color(tempR, tempG, tempB);
      //arrColorSchemeTableButton[i].attribute('disabled', '');
    }
    arrColorSchemeTableButton[i].mousePressed(arrColorSchemeTableButtonFx[i]);


    // Generate Random Colors to Balls
    var c = color(random(255), random(255), random(255));
    arrColorSchemeTableBallColor[i] = c;

    // Create Input For Balls Color
    arrColorInputBox[i] = [];
    for(let j = 0; j < 4; j++){
      arrColorInputBox[i][j] = createSelect();
      arrColorInputBox[i][j].size(65, 25);
      arrColorInputBox[i][j].position(25+i*100, 740-j*30);

      for(let k = 0; k < totalCol-emptyCol; k++){
        arrColorInputBox[i][j].option(k+1);
        if(k == totalCol-emptyCol-1){arrColorInputBox[i][j].selected(i+1);}
      }
    }
  }

  // Create Start Button (whith 'check' function)
  startButton = createButton('Final Check');
  startButton.position(100,800);
  startButton.mousePressed(startPressed);
  
  // Create Generate Button
  generateButton = createButton('Generate');
  generateButton.position(10,800);
  generateButton.mousePressed(generateQuestion);
  
  // Create Text Field
  inputField = createInput('Paste your "Code" here (if you have)');
  inputField.size(500, 25);
  inputField.position(10,830);
  inputField.input(inputCheck);

}

// The 'Final Check' button's function - Checking if everything is all right before moving to next step

function generateQuestion(){
	// Now Generate Questions
	var arrFilled = [];
	var arrColorsRemained = [];
	var arrAvailableColor = [];
	var arrAvailableColumn = [];
	for(let i = 0; i < totalCol-emptyCol; i++){
		arrFilled[i] = 0;
		arrColorsRemained[i] = 0;
		arrAvailableColor[i] = i+1;
		arrAvailableColumn[i] = i;
	}
	
	for(let i = 0; i < (totalCol-emptyCol)*4; i++){
		var randColor = arrAvailableColor[Math.floor(Math.random() * arrAvailableColor.length)];
		var randColumn = arrAvailableColumn[Math.floor(Math.random() * arrAvailableColumn.length)];
		var numOfBox = arrFilled[randColumn];
		var indexOfColor = arrAvailableColor.indexOf(randColor);
		var indexOfColumn = arrAvailableColumn.indexOf(randColumn);
		arrColorInputBox[randColumn][numOfBox].selected(randColor);
		arrColorsRemained[randColor-1] += 1;
		arrFilled[randColumn] += 1;
		if(arrColorsRemained[randColor-1] == 4){
			arrAvailableColor.splice(indexOfColor,1);
		}
		if(arrFilled[randColumn] == 4){
			arrAvailableColumn.splice(indexOfColumn,1);
		}
	}
}

function startPressed(){
  for(let i = -1; i < totalCol-emptyCol+2; i++){
    if(i == -1){
      arrCheckColorNumber.length = 0; // Step 0: Reset Status
      checkVar = 0;
      checkOK = false;
    }
    if(i != -1 && i < totalCol-emptyCol){
      arrCheckColorNumber[i] = 0; // Step 1: Create an array of '0's.
    }else if(i == totalCol-emptyCol){
      for(let j = 0; j < totalCol-emptyCol; j++){
        for(let k = 0; k < 4; k++){
          arrCheckColorNumber[arrColorInputBox[j][k].value()-1] += 1; // Step 2: Check 4*(totalCol-emptyCol) times
        }
      }
    }else if(i == totalCol-emptyCol+1){
      for(let j = 0; j < totalCol-emptyCol+1; j++){
        if(j < totalCol-emptyCol){
          if(arrCheckColorNumber[j] == (4)){
            checkVar = checkVar + 1; // Step 3: Check if all (totalCol-emptyCol) tubes = 4
          }
        }else if(j == totalCol-emptyCol){
          if(checkVar == (totalCol-emptyCol)){
            checkOK = true;
            startButton.attribute('disabled', '');
			generateButton.attribute('disabled', '');
			inputField.attribute('disabled', '');
            proceedButton = createButton('Press To Solve');
            proceedButton.position(190,800);
            proceedButton.mousePressed(proceedPressed);

            // Stop Changing Values
            for (let i = 0; i < totalCol-emptyCol; i++) {
              for(let j = 0; j < 4; j++){
                arrColorInputBox[i][j].disable();
              }
            }
          }
        }
      }
    }
  }
}

function inputCheck(){
	var arrFirstRead = splitTokens(this.value(), '|');
	if(arrFirstRead.length == 2){
		var arrSecondRead = splitTokens(arrFirstRead[0], ',');
		if(arrSecondRead.length == 2){
			if(arrSecondRead[0] == totalCol && arrSecondRead[1] == emptyCol){
				var arrThirdRead = splitTokens(arrFirstRead[1], ';');
				if(arrThirdRead.length == totalCol){
					var setInputBox = false;
					SplitLoop:
					for(let i = 0; i < totalCol; i++){
						var tempThirdRead = arrThirdRead[i];
						var splitThirdRead = splitTokens(tempThirdRead, ',');
						if(splitThirdRead.length != 4){
							break SplitLoop;
						}
						arrThirdRead[i] = [];
						for(let j = 0; j < 4; j++){
							arrThirdRead[i][j] = splitThirdRead[j];
						}
						if(i == totalCol - 1){
							setInputBox = true;
						}
					}
					if(setInputBox == true){
						// Now set inputbox
						for(let i = 0; i < totalCol-emptyCol; i++){
							for(let j = 0; j < 4; j++){
								arrColorInputBox[i][j].selected(arrThirdRead[i][j]);
							}
						}
					}
				}
			}
		}
	}
}


/* 
TODO: Create the following steps:
Step 1: Disable the button
Step 2: Create the 'original state' for reading
Step 3: Create a new copy of 'original state' for manipulation
Step 4: NOW SOLVE
Step 4.1: Check if all are perfect
Step 4.2: Check if all are perfect
Step --2nd last--: set PreviosSteps = CurrentSteps reached -- No, do it other way: (1) MasterHistory[] OR (2) Reverse Steps
Step --move to last--: Check if deadend reached

*/


function proceedPressed(){
	
	var date1 = new Date();
	var time1 = date1.getTime();
  showProgressText = true;

  // 1. Disable the button
  proceedButton.attribute('disabled', '');

  // 2. Create an array: 0-3 = all spaces within the tubes, 4 = number of balls inside, 5 = top ball color (empty will show 0), 6 = check if same color (empty OR same will show 0, else > 0), 7 = show 1 if perfect, 8 = last received from, 9 = last moved to
  for(let i = 0; i < totalCol; i++){
    arrAllSpacesInTube[i] = [];
	arrAllSpacesInTubeForUse[i] = []; // Create a copy for use
  }
  
  

  for(let i = 0; i < totalCol; i++){
	  if(i < totalCol-emptyCol){
		  for(let j = 0; j < 11; j++){
			  if(j < 4){
				  arrAllSpacesInTube[i][j] = arrColorInputBox[i][j].value();
				  arrAllSpacesInTubeForUse[i][j] = arrColorInputBox[i][j].value();
			  }else if(j == 4){
				  arrAllSpacesInTube[i][4] = 0; // Reset as 0
				  arrAllSpacesInTubeForUse[i][4] = 0;
				  for(let k = 0; k < 4; k++){
					  if(arrAllSpacesInTube[i][k] > 0){
						  arrAllSpacesInTube[i][4] += 1;
						  arrAllSpacesInTubeForUse[i][4] += 1;
					  }
				  }
			  }else if(j == 5){
				  if(arrAllSpacesInTube[i][4] == 0){
					  arrAllSpacesInTube[i][5] = 0;
					  arrAllSpacesInTubeForUse[i][5] = 0;
				  }else{
					  arrAllSpacesInTube[i][5] = arrAllSpacesInTube[i][arrAllSpacesInTube[i][4]-1];
					  arrAllSpacesInTubeForUse[i][5] = arrAllSpacesInTubeForUse[i][arrAllSpacesInTubeForUse[i][4]-1];
				  }
			  }else if(j == 6){
				  arrAllSpacesInTube[i][6] = 0; // Reset as 0
				  arrAllSpacesInTubeForUse[i][6] = 0; // Reset as 0
				  if(arrAllSpacesInTube[i][4] == 0){
					  arrAllSpacesInTube[i][6] = 0;
					  arrAllSpacesInTubeForUse[i][6] = 0;
				  }else{
					  for(let k = 0; k < arrAllSpacesInTube[i][4]; k++){
						  if(arrAllSpacesInTube[i][k] != arrAllSpacesInTube[i][0]){
							  arrAllSpacesInTube[i][6] += 1;
							  arrAllSpacesInTubeForUse[i][6] += 1;
						  }
					  }
				  }
			  }else if(j == 7){
				  if(arrAllSpacesInTube[i][4] == 4){
					  if(arrAllSpacesInTube[i][0] == arrAllSpacesInTube[i][1] && arrAllSpacesInTube[i][1] == arrAllSpacesInTube[i][2] && arrAllSpacesInTube[i][2] == arrAllSpacesInTube[i][3]){
						  arrAllSpacesInTube[i][7] = 1;
						  arrAllSpacesInTubeForUse[i][7] = 1;
					  }else{
						  arrAllSpacesInTube[i][7] = 0;
						  arrAllSpacesInTubeForUse[i][7] = 0;
					  }
				  }else{
					  arrAllSpacesInTube[i][7] = 0;
					  arrAllSpacesInTubeForUse[i][7] = 0;
				  }
			  }else if(j > 7){
				  arrAllSpacesInTube[i][j] = null;
				  arrAllSpacesInTubeForUse[i][j] = null;
			  }
		  }
	  }else{
		  for(let j = 0; j < 11; j++){
			  if(j > 7){
				  arrAllSpacesInTube[i][j] = null;
				  arrAllSpacesInTubeForUse[i][j] = null;
			  }else{
				  arrAllSpacesInTube[i][j] = 0;
				  arrAllSpacesInTubeForUse[i][j] = 0;
			  }
			}
	    }
	
  }
  
  //  // Print Question Code
  var arrString;
  for(let i = -2; i < totalCol*4; i++){
	  if(i == -2){
		  arrString = String(totalCol);
	  }
	  if(i == -1){
		  arrString += ',';
		  arrString += String(emptyCol);
	  }
	  if(i > -1){
		  var colNum = (i - i%4)/4;
		  var ballNum = i%4;
		  if(i == 0){
			  arrString += '|';
		  }else if(i%4 == 0){
			  arrString += ';';
		  }else{
			  arrString += ',';
		  }
		  arrString += String(arrAllSpacesInTube[colNum][ballNum]);
	  }
  }
  questionCodeString = arrString;
  questionCodeTextField = createInput(arrString);
  questionCodeTextField.size(500, 25);
  questionCodeTextField.position(10,870);
  questionCodeTextField.input(inputCheck);


  // 1st MasterHistory Record
  var tempAllSpacesForFirst = [];
  var MHLengthForFirst = arrMasterHistory.length ;
  for(let i = 0; i < totalCol; i++){
	tempAllSpacesForFirst[i] = [];
  	for(let j = 0; j < 11; j++){
	  tempAllSpacesForFirst[i][j] = arrAllSpacesInTubeForUse[i][j];
	}
  }

  arrMasterHistory[MHLengthForFirst] = tempAllSpacesForFirst;
  
  
  // Create (totalCol-emptyCol) x copies of arrAllSpacesInTubeForUse
  var arrTotalAllSpaces = [];
  for(let i = 0; i < totalCol - emptyCol; i++){
	  arrTotalAllSpaces[i] = [];
	  arrTotalAllSpaces[i][0] = []; // arrAllSpacesInTubeForUse
	  arrTotalAllSpaces[i][1] = []; // arrCurrentSteps
	  arrTotalAllSpaces[i][2] = []; // arrMasterHistory  
	  arrTotalAllSpaces[i][3] = 0; // numberOfMovesPerformed
	  arrTotalAllSpaces[i][4] = 0; // numberOfBackwardMoves
	  
	  // Create arrAllSpacesInTubeForUse & arrMasterHistory
	  for(let j = 0; j < totalCol; j++){
		  arrTotalAllSpaces[i][0][j] = [];
		  if(j == 0){arrTotalAllSpaces[i][2][0] = [];}
		  arrTotalAllSpaces[i][2][0][j] = [];
		  for(let k = 0; k < 11; k++){
			  arrTotalAllSpaces[i][0][j][k] = arrAllSpacesInTubeForUse[(j+i)%totalCol][k];
			  arrTotalAllSpaces[i][2][0][j][k] = arrAllSpacesInTubeForUse[(j+i)%totalCol][k];
		  }
	  }
  }
  
  //print(arrTotalAllSpaces);
  
  var takeTurnNum = 0;
  
  // 4. NOW SOLVE
  Solvingloop:
  while(solvedState == false){ // loop while 'solvedState == false'

	// Now take turn
	arrAllSpacesInTubeForUse = arrTotalAllSpaces[takeTurnNum][0];
	arrCurrentSteps = arrTotalAllSpaces[takeTurnNum][1];
	arrMasterHistory = arrTotalAllSpaces[takeTurnNum][2];
	//numberOfMovesPerformed = arrTotalAllSpaces[takeTurnNum][3];
	//numberOfBackwardMoves = arrTotalAllSpaces[takeTurnNum][4];
	
	var checkPerfect = 0;
    for(let i = 0; i < totalCol; i++){ // 4.1 Check if all are perfect
      checkPerfect += arrAllSpacesInTubeForUse[i][7];
    }
    if(checkPerfect == totalCol-emptyCol){ // [4.1 - Perfect Case]
      solvedState = true;
      break Solvingloop;
    }else{ // [4.1 - Non-Perfect Case]
      // 4.2. Set arrTempCheckNearlyPerfect to check 'nearly perfect' case. If found, move them first

      // 4.2.1. Check the number of 'same color but not perfect' before creating arrTempCheckNearlyPerfect
      var needToCheckPerfect = 0;
      for(let i = 0; i < totalCol; i++){ // Check each tube if they are 'same color but not perfect'
        if(arrAllSpacesInTubeForUse[i][4] != 0 && arrAllSpacesInTubeForUse[i][4] < 4 && arrAllSpacesInTubeForUse[i][6] == 0){
          needToCheckPerfect += 1;
        }
      }
      // 4.2.2. Create arrTempCheckNearlyPerfect when number of 'same color but not perfect' > 1
      if(needToCheckPerfect > 1){
        arrTempCheckNearlyPerfect.length = 0; // Reset every time before creating it
        for(let i = 0; i < totalCol-emptyCol; i++){ // Create 0 in the 0th & 1th place in the array
          arrTempCheckNearlyPerfect[i] = [];
          arrTempCheckNearlyPerfect[i][0] = 0; // Default value for number of 'nearly perfect' for each color
        }

        arrTempCheckNearlyPerfect[totalCol-emptyCol] = []; // Last position of this array = (color -1) with more than 1 'nearly perfect'
        
		var maxBall = [];
		for(let i = 0; i < totalCol - emptyCol; i++){
			maxBall[i] = 0;
		}
        // Now check & create arrTempCheckNearlyPerfect
        for(let i = 0; i < totalCol; i++){ // Loop all columns
          if(arrAllSpacesInTubeForUse[i][4] != 0 && arrAllSpacesInTubeForUse[i][4] < 4 && arrAllSpacesInTubeForUse[i][6] == 0){ // if the (i)th tube is nearly perfect
            var tempArrLength = arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)].length;
            arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][0] += 1; // arrTempCheckNearlyPerfect[color - 1][0 = number of 'nearly perfect', 1 = first tube, 2+ = rest of them] && arrTempCheckNearlyPerfect[totalCol-emptyCol] = color(s) with more than 1 'nearly perfect'
            arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][tempArrLength] = i; // Record tube position to [1+]
		    if(arrAllSpacesInTubeForUse[i][4] > maxBall[(arrAllSpacesInTubeForUse[i][5]-1)]){
				maxBall[(arrAllSpacesInTubeForUse[i][5]-1)] = arrAllSpacesInTubeForUse[i][4];
				if(arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][0] > 1){
					var tempOldMax = arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][1];
					var tempNewMax = arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)].length-1];
					arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][1] = tempNewMax;
					arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)].length-1] = tempOldMax;
				}
			}
            if(arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][0] == 2){ // Record the (color -1) to the last position of arrTempCheckNearlyPerfect[] array
              var tempArrLengthOutter = arrTempCheckNearlyPerfect[totalCol-emptyCol].length;
              arrTempCheckNearlyPerfect[totalCol-emptyCol][tempArrLengthOutter] = (arrAllSpacesInTubeForUse[i][5]-1); // Mark the color (color-1) to the last position of arrTempCheckNearlyPerfect[totalCol-emptyCol]
            }
          }
        }
        // 4.2.3. Move - when NearlyPerfect exists
        if(arrTempCheckNearlyPerfect[totalCol-emptyCol].length > 0){
			// Write a for-loop to do all the nearly perfect tubes
			for(let i = 0; i < arrTempCheckNearlyPerfect[totalCol-emptyCol].length; i++){
				var tempCurrentSameColor = arrTempCheckNearlyPerfect[totalCol-emptyCol][i]; // (Color -1)
				for(let j = 2; j < arrTempCheckNearlyPerfect[tempCurrentSameColor].length; j++){
					var tempCurrentSameTo = arrTempCheckNearlyPerfect[tempCurrentSameColor][1];
					var tempCurrentSameFrom = arrTempCheckNearlyPerfect[tempCurrentSameColor][j];
					var tempCurrentSameToNumOfBall = arrAllSpacesInTubeForUse[tempCurrentSameTo][4];
					var tempCurrentSameFromNumOfBall = arrAllSpacesInTubeForUse[tempCurrentSameFrom][4];
					var tempRealColor = arrAllSpacesInTubeForUse[tempCurrentSameFrom][5];
					for(let k = 0; k < tempCurrentSameFromNumOfBall; k++){
						arrAllSpacesInTubeForUse[tempCurrentSameFrom][tempCurrentSameFromNumOfBall-1-k] = 0; // Removing the last tube ball
						arrAllSpacesInTubeForUse[tempCurrentSameTo][tempCurrentSameToNumOfBall+k] = tempRealColor; // Adding the ball to the first tube
						
						// Update array - [4] - Number Of Balls
						arrAllSpacesInTubeForUse[tempCurrentSameFrom][4] += -1;
						arrAllSpacesInTubeForUse[tempCurrentSameTo][4] += 1;
						
						// Update array - [5] - Top Ball Color
						if(arrAllSpacesInTubeForUse[tempCurrentSameFrom][4] == 0){
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][5] = 0;
						}
						
						// Update array - [6] : N/A
						// Update array - [7] - Show 1 if it is a Perfect Tube
						if(arrAllSpacesInTubeForUse[tempCurrentSameTo][4] == 4){
							arrAllSpacesInTubeForUse[tempCurrentSameTo][7] = 1;
						}
						
						// Reset Before Updating [8] & [9]
						var fromOther;
						var toOther;
						// From
						if(arrAllSpacesInTubeForUse[tempCurrentSameFrom][8] != null){
							fromOther = arrAllSpacesInTubeForUse[tempCurrentSameFrom][8];
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][8] = null;
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][9] = null;
							arrAllSpacesInTubeForUse[fromOther][8] = null;
							arrAllSpacesInTubeForUse[fromOther][9] = null;
						}else if(arrAllSpacesInTubeForUse[tempCurrentSameFrom][9] != null){
							fromOther = arrAllSpacesInTubeForUse[tempCurrentSameFrom][9];
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][8] = null;
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][9] = null;
							arrAllSpacesInTubeForUse[fromOther][8] = null;
							arrAllSpacesInTubeForUse[fromOther][9] = null;
						}
						// To
						if(arrAllSpacesInTubeForUse[tempCurrentSameTo][8] != null){
							toOther = arrAllSpacesInTubeForUse[tempCurrentSameTo][8];
							arrAllSpacesInTubeForUse[tempCurrentSameTo][8] = null;
							arrAllSpacesInTubeForUse[tempCurrentSameTo][9] = null;
							arrAllSpacesInTubeForUse[toOther][8] = null;
							arrAllSpacesInTubeForUse[toOther][9] = null;
						}else if(arrAllSpacesInTubeForUse[tempCurrentSameTo][9] != null){
							toOther = arrAllSpacesInTubeForUse[tempCurrentSameTo][9];
							arrAllSpacesInTubeForUse[tempCurrentSameTo][8] = null;
							arrAllSpacesInTubeForUse[tempCurrentSameTo][9] = null;
							arrAllSpacesInTubeForUse[toOther][8] = null;
							arrAllSpacesInTubeForUse[toOther][9] = null;
						}
						// Update array - [8] - 'last received from'
						arrAllSpacesInTubeForUse[tempCurrentSameTo][8] = tempCurrentSameFrom;
						// Update array - [9] - 'last moved to'
						arrAllSpacesInTubeForUse[tempCurrentSameFrom][9] = tempCurrentSameTo;
						// Update array - [10] - 'Dumb Step 3' reset
						arrAllSpacesInTubeForUse[tempCurrentSameFrom][10] = null;
						arrAllSpacesInTubeForUse[tempCurrentSameTo][10] = null;
						for(let m = 0; m < totalCol; m++){
							if(arrAllSpacesInTubeForUse[m][10] == tempCurrentSameFrom || arrAllSpacesInTubeForUse[m][10] == tempCurrentSameTo){
								arrAllSpacesInTubeForUse[m][10] = null;
							}
						}
						
						
						// Record Steps
						var stepLength = arrCurrentSteps.length;
						arrCurrentSteps[stepLength] = []; // arrCurrentSteps: [0] show 1 if it is a MUST step, [1] = 'from', [2] = 'to', [3] = arrays of [color (show -1 if to is empty), from, to]***a MUST step do not have [3]***
						arrCurrentSteps[stepLength][0] = 1;
						arrCurrentSteps[stepLength][1] = tempCurrentSameFrom;
						arrCurrentSteps[stepLength][2] = tempCurrentSameTo;
						
						// Update MasterHistory
						var MHLength = arrMasterHistory.length;
						arrMasterHistory[MHLength] = [];
						for(let m = 0; m < totalCol; m++){ // Create tempAllSpaces (corrected)
							arrMasterHistory[MHLength][m] = [];
						    for(let n = 0; n < 11; n++){
								arrMasterHistory[MHLength][m][n] = arrAllSpacesInTubeForUse[m][n];
							}
						}
						
						// Update Number Of Move Performed
						arrTotalAllSpaces[takeTurnNum][3] += 1;
						//deBugTextShow(); //**********************************************************************************
						
						if(i == arrTempCheckNearlyPerfect[totalCol-emptyCol].length - 1 && j == arrTempCheckNearlyPerfect[tempCurrentSameColor].length - 1 && k == tempCurrentSameFromNumOfBall - 1){
							takeTurnNum = (takeTurnNum + 1)%(totalCol-emptyCol);
							continue Solvingloop;
						}
					}
				}

			}
		  
        }
      }
	  
	  // 2nd MUST steps: 'From: 4 balls not perfect --> To: nearly perfect && results = perfect'
	  // check again, because last step moved
      var arrNeedToCheckPerfect2 = [];
      for(let i = 0; i < totalCol; i++){ // Check each tube if they are 'same color but not perfect'
        if(arrAllSpacesInTubeForUse[i][4] != 0 && arrAllSpacesInTubeForUse[i][4] < 4 && arrAllSpacesInTubeForUse[i][6] == 0){
			var tempLengthCheck = arrNeedToCheckPerfect2.length;
			arrNeedToCheckPerfect2[tempLengthCheck] = [];
			arrNeedToCheckPerfect2[tempLengthCheck][0] = arrAllSpacesInTubeForUse[i][5]; // arrNeedToCheckPerfect2[tempLengthCheck]: 0 = color, 1 = position
			arrNeedToCheckPerfect2[tempLengthCheck][1] = i;
		}
      }
	  
	  if(arrNeedToCheckPerfect2.length > 0){
		  for(let i = 0; i < arrNeedToCheckPerfect2.length; i++){
			  var tempColor = arrNeedToCheckPerfect2[i][0];
			  var tempTo = arrNeedToCheckPerfect2[i][1];
			  var arrAllSameColor = []; // arrAllSameColor[i]: 0 = position of 'from', 1 = number of same color ball from top
			  for(let j = 0; j < totalCol; j++){
				  if(j != tempTo && arrAllSpacesInTubeForUse[j][5] == tempColor){
					  var tempFromNum = 0;
					  var topNum = arrAllSpacesInTubeForUse[j][4];
					  CountingLoop:
					  for(let k = 0; k < topNum; k++){
						  if(arrAllSpacesInTubeForUse[j][topNum-1-k] == tempColor){
							  tempFromNum += 1;
						  }else{break CountingLoop;}
					  }
					  var totalSameColor = arrAllSameColor.length;
					  arrAllSameColor[totalSameColor] = [];
					  arrAllSameColor[totalSameColor][0] = j;
					  arrAllSameColor[totalSameColor][1] = tempFromNum;
				  }
			  }
			  // Check if sum of tempFromNum == 4
			  if(arrAllSameColor.length == 0){
				  // Skip no results
			  }else{
				  var tempSum = 0;
				  for(let j = 0; j < arrAllSameColor.length; j++){
					  tempSum += arrAllSameColor[j][1];
				  }
				  if(tempSum + arrAllSpacesInTubeForUse[tempTo][4] == 4){ // Perfect case, move
					  for(let j = 0; j < arrAllSameColor.length; j++){
						  var numOfBallToMove = arrAllSameColor[j][1];
						  var currentFrom = arrAllSameColor[j][0];
						  var numOfBallFrom = arrAllSpacesInTubeForUse[currentFrom][4];
						  var numOfBallTo = arrAllSpacesInTubeForUse[tempTo][4];
						  var tempRealColor = arrAllSpacesInTubeForUse[currentFrom][5];
						  // Loop for moving
						  for(let k = 0; k < numOfBallToMove; k++){
							  arrAllSpacesInTubeForUse[currentFrom][numOfBallFrom-1-k] = 0; // Removing the ball
							  arrAllSpacesInTubeForUse[tempTo][numOfBallTo+k] = tempRealColor; // Adding the ball
							  // Update array - [4] - Number Of Balls
							  arrAllSpacesInTubeForUse[currentFrom][4] += -1;
							  arrAllSpacesInTubeForUse[tempTo][4] += 1;
							  // Update array - [5] - Top Ball Color
							  if(arrAllSpacesInTubeForUse[currentFrom][4] == 0){
								  arrAllSpacesInTubeForUse[currentFrom][5] = 0;
							  }else{
								  arrAllSpacesInTubeForUse[currentFrom][5] = arrAllSpacesInTubeForUse[currentFrom][arrAllSpacesInTubeForUse[currentFrom][4]-1];
							  }
							  // Update array - [6] : Same Color Check (empty / same : 0, else > 0) - this case: 'from' only
							  arrAllSpacesInTubeForUse[currentFrom][6] = 0; // Reset as 0
							  if(arrAllSpacesInTubeForUse[currentFrom][4] == 0){
								  arrAllSpacesInTubeForUse[currentFrom][6] = 0;
							  }else{
								  var tempCount = arrAllSpacesInTubeForUse[currentFrom][4];
								  for(let m = 0; m < arrAllSpacesInTubeForUse[currentFrom][4]; m++){
									  if(arrAllSpacesInTubeForUse[currentFrom][m] != arrAllSpacesInTubeForUse[currentFrom][0]){
										  tempCount = m;
										  break;
									  }
								  }
								  arrAllSpacesInTubeForUse[currentFrom][6] = arrAllSpacesInTubeForUse[currentFrom][4] - tempCount;
							  }
							  // Update array - [7] - Show 1 if it is a Perfect Tube
							  if(arrAllSpacesInTubeForUse[tempTo][4] == 4){
								  arrAllSpacesInTubeForUse[tempTo][7] = 1;
							  }
							  // Reset Before Updating [8] & [9]
							  var fromOther;
							  var toOther;
							  // From
							  if(arrAllSpacesInTubeForUse[currentFrom][8] != null){
							  	fromOther = arrAllSpacesInTubeForUse[currentFrom][8];
							  	arrAllSpacesInTubeForUse[currentFrom][8] = null;
							  	arrAllSpacesInTubeForUse[currentFrom][9] = null;
							  	arrAllSpacesInTubeForUse[fromOther][8] = null;
							  	arrAllSpacesInTubeForUse[fromOther][9] = null;
							  }else if(arrAllSpacesInTubeForUse[currentFrom][9] != null){
							  	fromOther = arrAllSpacesInTubeForUse[currentFrom][9];
							  	arrAllSpacesInTubeForUse[currentFrom][8] = null;
							  	arrAllSpacesInTubeForUse[currentFrom][9] = null;
							  	arrAllSpacesInTubeForUse[fromOther][8] = null;
							  	arrAllSpacesInTubeForUse[fromOther][9] = null;
							  }
							  // To
							  if(arrAllSpacesInTubeForUse[tempTo][8] != null){
							  	toOther = arrAllSpacesInTubeForUse[tempTo][8];
							  	arrAllSpacesInTubeForUse[tempTo][8] = null;
							  	arrAllSpacesInTubeForUse[tempTo][9] = null;
							  	arrAllSpacesInTubeForUse[toOther][8] = null;
							  	arrAllSpacesInTubeForUse[toOther][9] = null;
							  }else if(arrAllSpacesInTubeForUse[tempTo][9] != null){
							  	toOther = arrAllSpacesInTubeForUse[tempTo][9];
							  	arrAllSpacesInTubeForUse[tempTo][8] = null;
							  	arrAllSpacesInTubeForUse[tempTo][9] = null;
							  	arrAllSpacesInTubeForUse[toOther][8] = null;
							  	arrAllSpacesInTubeForUse[toOther][9] = null;
							  }
							  // Update array - [8] - 'last received from'
							  arrAllSpacesInTubeForUse[tempTo][8] = currentFrom;
							  // Update array - [9] - 'last moved to'
							  arrAllSpacesInTubeForUse[currentFrom][9] = tempTo;
							  // Update array - [10] - 'Dumb Step 3' reset
							  arrAllSpacesInTubeForUse[currentFrom][10] = null;
							  arrAllSpacesInTubeForUse[tempTo][10] = null;
							  for(let m = 0; m < totalCol; m++){
								  if(arrAllSpacesInTubeForUse[m][10] == currentFrom || arrAllSpacesInTubeForUse[m][10] == tempTo){
									  arrAllSpacesInTubeForUse[m][10] = null;
								  }
							  }
							  
							  // Record Steps
							  var stepLength = arrCurrentSteps.length;
							  arrCurrentSteps[stepLength] = []; // arrCurrentSteps: [0] show 1 if it is a MUST step, [1] = 'from', [2] = 'to', [3] = arrays of [color (show -1 if to is empty), from, to]***a MUST step do not have [3]***
							  arrCurrentSteps[stepLength][0] = 1;
							  arrCurrentSteps[stepLength][1] = currentFrom;
							  arrCurrentSteps[stepLength][2] = tempTo;
							  // Update MasterHistory
							  var MHLength = arrMasterHistory.length;
							  arrMasterHistory[MHLength] = [];
							  for(let m = 0; m < totalCol; m++){ // Create tempAllSpaces
								  arrMasterHistory[MHLength][m] = [];
								  for(let n = 0; n < 11; n++){
									  arrMasterHistory[MHLength][m][n] = arrAllSpacesInTubeForUse[m][n];
								  }
							  }
							  // Update Number Of Move Performed
							  arrTotalAllSpaces[takeTurnNum][3] += 1;
							  //deBugTextShow(); //**********************************************************************************
							  
							  // Continue the loop
							  if(j == arrAllSameColor.length - 1 && k == numOfBallToMove - 1){
								  takeTurnNum = (takeTurnNum + 1)%(totalCol-emptyCol);
								  continue Solvingloop;
							  }
						  }
					  }
				  }
			  }
		  }
	  }
	  
	  
	  // Check Deadend / Semi-Deadend (Create arrPreviousSteps when Semi-Deadend is reached)
	  // 4.3. Read Previous Step and Move
	  // 4.3.1. Check Semi-Deadend (and Deadend)
	  // 4.3.1.1. Check Empty Tubes
	  var arrTempFromColorCheck = []; // arrTempFromColorCheck: [0] = number of top balls in color (i+1) exclude perfect tubes, [1] = number of 'Same Top Color Balls && < 4', [2] = show 1 if it is available (i.e. not a 'deadend color')
	  var tempEmptyCount = 0;
	  for(let i = 0; i < totalCol; i++){ // Count Number of Empty Tubes
		  if(arrAllSpacesInTubeForUse[i][4] == 0){
			  tempEmptyCount += 1;
		  }
	  }
	  
	  if(tempEmptyCount == 0){ // 4.3.1.2. When tempEmptyCount == 0, Check Same Top Color Balls && < 4
		  for(let i = 0; i < totalCol; i++){ // Generate [0, 0, 0] in each column
			  arrTempFromColorCheck[i] = [0, 0, 0];
		  }
		  for(let i = 0; i < totalCol; i++){
			  if(arrAllSpacesInTubeForUse[i][7] == 0 && arrAllSpacesInTubeForUse[i][5] > 0){
				  arrTempFromColorCheck[arrAllSpacesInTubeForUse[i][5]-1][0] += 1; // Counting the number of top balls in color(i+1) exclude perfect tubes
				  if(arrAllSpacesInTubeForUse[i][4] < 4){ // Counting 'Same Top Color Balls && < 4'
				     arrTempFromColorCheck[arrAllSpacesInTubeForUse[i][5]-1][1] += 1;
				  }
			  }
		  }
		  // Now check Semi-Deadend based on arrTempFromColorCheck
		  var validColorNumber = 0;
		  for(let i = 0; i < totalCol-emptyCol; i++){ // Update color availability & Check the number of available color (Semi-Deadend if == 0)
			  if(arrTempFromColorCheck[i][0] > 1 && arrTempFromColorCheck[i][1] > 0){
				  arrTempFromColorCheck[i][2] += 1;
				  validColorNumber += 1;
			  }
		  }
		  if(validColorNumber == 0){ // 4.3.1.2.1. Handling Semi-Deadend & Deadend
			  // Read MasterHistory & do amendment (1. go back to previous state 2. delete last step)
			  // 4.3.1.2.1.1. Restore to previous state AND Move
			  var keepMovingBackward = true;
			  while(keepMovingBackward == true){
				  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
				  // Check if true Deadend
				  if(previousStepCount < 0){
					  showDeadendText = true;
					  break Solvingloop;
				  }
				  // Now restore to previous state
				  for(let i = 0; i < totalCol; i++){
					  for(let j = 0; j < 11; j++){
						  arrAllSpacesInTubeForUse[i][j] = arrMasterHistory[previousStepCount][i][j];
					  }
				  }
				  
				  
				  arrTotalAllSpaces[takeTurnNum][4] += 1;
				  
				  
				  // Update MasterHistory
				  arrMasterHistory.splice(previousStepCount+1,1);
				  // See if it still needs to 'keepMovingBackward == true' OR Move & Update Steps
				  if(arrCurrentSteps[previousStepCount][0] == 1){ // keepMovingBackward is needed (MUST step)
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else if(arrCurrentSteps[previousStepCount].length == 3){
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else if(arrCurrentSteps[previousStepCount][3].length == 0){
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else{ // No need to go back, now Move & Update Steps
					  // (1.) Move
					  var tempMoveFrom = arrCurrentSteps[previousStepCount][3][0][1];
					  var tempMoveTo = arrCurrentSteps[previousStepCount][3][0][2];
					  var tempMoveColor = arrAllSpacesInTubeForUse[tempMoveFrom][5];
					  var tempMoveFromNumOfBall = arrAllSpacesInTubeForUse[tempMoveFrom][4];
					  var tempMoveToNumOfBall = arrAllSpacesInTubeForUse[tempMoveTo][4];
					  // (1.1) Update Balls
					  arrAllSpacesInTubeForUse[tempMoveFrom][tempMoveFromNumOfBall-1] = 0;
					  arrAllSpacesInTubeForUse[tempMoveTo][tempMoveToNumOfBall] = tempMoveColor;
					  // (1.2) Update array - [4] - Number Of Balls
					  arrAllSpacesInTubeForUse[tempMoveFrom][4] -= 1;
					  arrAllSpacesInTubeForUse[tempMoveTo][4] += 1;
					  // (1.3) Update array - [5] - Top Ball Color
					  if(arrAllSpacesInTubeForUse[tempMoveFrom][4] == 0){
						  arrAllSpacesInTubeForUse[tempMoveFrom][5] = 0;
					  }else{
						  arrAllSpacesInTubeForUse[tempMoveFrom][5] = arrAllSpacesInTubeForUse[tempMoveFrom][arrAllSpacesInTubeForUse[tempMoveFrom][4]-1];
					  }
					  arrAllSpacesInTubeForUse[tempMoveTo][5] = tempMoveColor;
					  // (1.4) Update array - [6] - Same Color Check (empty / same : 0, else > 0)
					  arrAllSpacesInTubeForUse[tempMoveFrom][6] = 0; // Reset as 0
					  arrAllSpacesInTubeForUse[tempMoveTo][6] = 0; // Reset as 0
					  // From
					  if(arrAllSpacesInTubeForUse[tempMoveFrom][4] == 0){
						  arrAllSpacesInTubeForUse[tempMoveFrom][6] = 0;
					  }else{
						  var tempCount = arrAllSpacesInTubeForUse[tempMoveFrom][4];
						  for(let i = 0; i < arrAllSpacesInTubeForUse[tempMoveFrom][4]; i++){
							  if(arrAllSpacesInTubeForUse[tempMoveFrom][i] != arrAllSpacesInTubeForUse[tempMoveFrom][0]){
								  tempCount = i;
								  break;
							  }
						  }
						  arrAllSpacesInTubeForUse[tempMoveFrom][6] = arrAllSpacesInTubeForUse[tempMoveFrom][4] - tempCount;
					  }
					  // To
					  if(arrAllSpacesInTubeForUse[tempMoveTo][4] == 0){
						  arrAllSpacesInTubeForUse[tempMoveTo][6] = 0;
					  }else{
						  var tempCount = arrAllSpacesInTubeForUse[tempMoveTo][4];
						  for(let i = 0; i < arrAllSpacesInTubeForUse[tempMoveTo][4]; i++){
							  if(arrAllSpacesInTubeForUse[tempMoveTo][i] != arrAllSpacesInTubeForUse[tempMoveTo][0]){
								  tempCount = i;
								  break;
							  }
						  }
						  arrAllSpacesInTubeForUse[tempMoveTo][6] = arrAllSpacesInTubeForUse[tempMoveTo][4] - tempCount;
					  }
					  // (1.5) Update array - [7] - Show 1 if it is a Perfect Tube
					  if(arrAllSpacesInTubeForUse[tempMoveTo][6] == 0 && arrAllSpacesInTubeForUse[tempMoveTo][4] == 4){
						  arrAllSpacesInTubeForUse[tempMoveTo][7] = 1;
					  }
					  // Reset Before Updating [8] & [9]
					  var fromOther;
					  var toOther;
					  // From
					  if(arrAllSpacesInTubeForUse[tempMoveFrom][8] != null){
					  	fromOther = arrAllSpacesInTubeForUse[tempMoveFrom][8];
					  	arrAllSpacesInTubeForUse[tempMoveFrom][8] = null;
					  	arrAllSpacesInTubeForUse[tempMoveFrom][9] = null;
					  	arrAllSpacesInTubeForUse[fromOther][8] = null;
					  	arrAllSpacesInTubeForUse[fromOther][9] = null;
					  }else if(arrAllSpacesInTubeForUse[tempMoveFrom][9] != null){
					  	fromOther = arrAllSpacesInTubeForUse[tempMoveFrom][9];
					  	arrAllSpacesInTubeForUse[tempMoveFrom][8] = null;
					  	arrAllSpacesInTubeForUse[tempMoveFrom][9] = null;
					  	arrAllSpacesInTubeForUse[fromOther][8] = null;
					  	arrAllSpacesInTubeForUse[fromOther][9] = null;
					  }
					  // To
					  if(arrAllSpacesInTubeForUse[tempMoveTo][8] != null){
					  	toOther = arrAllSpacesInTubeForUse[tempMoveTo][8];
					  	arrAllSpacesInTubeForUse[tempMoveTo][8] = null;
					  	arrAllSpacesInTubeForUse[tempMoveTo][9] = null;
					  	arrAllSpacesInTubeForUse[toOther][8] = null;
					  	arrAllSpacesInTubeForUse[toOther][9] = null;
					  }else if(arrAllSpacesInTubeForUse[tempMoveTo][9] != null){
					  	toOther = arrAllSpacesInTubeForUse[tempMoveTo][9];
					  	arrAllSpacesInTubeForUse[tempMoveTo][8] = null;
					  	arrAllSpacesInTubeForUse[tempMoveTo][9] = null;
					  	arrAllSpacesInTubeForUse[toOther][8] = null;
					  	arrAllSpacesInTubeForUse[toOther][9] = null;
					  }
					  // Update array - [8] - 'last received from'
					  arrAllSpacesInTubeForUse[tempMoveTo][8] = tempMoveFrom;
					  // Update array - [9] - 'last moved to'
					  arrAllSpacesInTubeForUse[tempMoveFrom][9] = tempMoveTo;
					  // Update array - [10] - 'Dumb Step 3' reset
					  arrAllSpacesInTubeForUse[tempMoveFrom][10] = null;
					  arrAllSpacesInTubeForUse[tempMoveTo][10] = null;
					  for(let i = 0; i < totalCol; i++){
						  if(arrAllSpacesInTubeForUse[i][10] == tempMoveFrom || arrAllSpacesInTubeForUse[i][10] == tempMoveTo){
							  arrAllSpacesInTubeForUse[i][10] = null;
						  }
					  }
					  // Update array - [10] - 'Dumb Step 3' marking
					  if(previousStepCount > 0){ // ignore 1st step
						  if(arrCurrentSteps[previousStepCount][3].length > 1){
							  for(let i = 1; i < arrCurrentSteps[previousStepCount][3].length; i++){
								  if(arrCurrentSteps[previousStepCount][3][i][1] == tempMoveFrom){
									  var markDumb3 = arrCurrentSteps[previousStepCount][3][i][2];
									  arrAllSpacesInTubeForUse[markDumb3][10] = tempMoveTo;
								  }
							  }
						  }
					  }
					  
					  // (2.) Update the step (Mark & Delete)
					  arrCurrentSteps[previousStepCount][1] = tempMoveFrom;
					  arrCurrentSteps[previousStepCount][2] = tempMoveTo;
					  arrCurrentSteps[previousStepCount][3].splice(0,1);
					  // (3.) Update the MasterHistory
					  var MHLength = arrMasterHistory.length;
					  arrMasterHistory[MHLength] = [];
					  for(let i = 0; i < totalCol; i++){ // Create tempAllSpaces (corrected)
						  arrMasterHistory[MHLength][i] = [];
						  for(let j = 0; j < 11; j++){
							  arrMasterHistory[MHLength][i][j] = arrAllSpacesInTubeForUse[i][j];
						  }
					  }
					  // Update Number Of Move Performed
					  arrTotalAllSpaces[takeTurnNum][3] += 1;
					  //deBugTextShow(); //**********************************************************************************
					  
					  // end the movebackloop
					  keepMovingBackward = false;
				  }
			  }
		  }else{ // 4.3.1.2.2. No Semi-Deadend, continue solving
			  // Now Check available tubes - Create arrCurrentSteps[3][0,1,2]
			  // Create All Choices Before Taking A Step (Delete Loop Choices)
			  var arrColorCheck = []; // arrColorCheck[i][0,1,2] = [color (show -1 if to is empty), from, to]
			  var tempColorAvailableCount = []; // tempColorAvailableCount[i][total top (not perfect), total 'to']
			  
			  // Check Color First
			  for(let i = 0; i < totalCol-emptyCol; i++){
				  tempColorAvailableCount[i] = [0, 0];
				  for(let j = 0; j < totalCol; j++){
					  if(arrAllSpacesInTubeForUse[j][7] == 0 && arrAllSpacesInTubeForUse[j][5] - 1 == i){
						  tempColorAvailableCount[i][0] += 1;
						  if(arrAllSpacesInTubeForUse[j][4] < 4){
							  tempColorAvailableCount[i][1] += 1;
						  }
					  }
				  }
			  }
			  
			  
			  // Now Create arrColorCheck (without -1 : empty)
			  for(let i = 0; i < totalCol; i++){
				  var tempCurrentColor = arrAllSpacesInTubeForUse[i][5];
				  if(arrAllSpacesInTubeForUse[i][7] == 0 && tempColorAvailableCount[tempCurrentColor - 1][0] > 1 && arrAllSpacesInTubeForUse[i][4] < 4){ // Find the 'to' first <-- this line no need to consider -1, coz this is 'no empty' case
					  for(let j = 0; j < totalCol; j++){ // 'From'
						  if(j != i && arrAllSpacesInTubeForUse[j][7] == 0 && arrAllSpacesInTubeForUse[i][5] == arrAllSpacesInTubeForUse[j][5]){
							  // Need to check if it is a loop case
							  var tempFutureState = [];
							  for(let k = 0; k < arrAllSpacesInTubeForUse.length; k++){
								  tempFutureState[k] = [];
								  for(let m = 0; m < 6; m++){
									  tempFutureState[k][m] = arrAllSpacesInTubeForUse[k][m];
								  }
							  }
							  var validFutureStep = true;
							  
							  // Perform the moves (0-4 only)
							  var dummyFrom = j;
							  var dummyTo = i;
							  var dummyFromNumBalls = tempFutureState[dummyFrom][4];
							  var dummyToNumBalls = tempFutureState[dummyTo][4];
							  var dummyColor = tempFutureState[dummyFrom][5];
							  tempFutureState[dummyFrom][dummyFromNumBalls-1] = 0;
							  tempFutureState[dummyTo][dummyToNumBalls] = dummyColor;
							  
							  // Check 'Interchange' dumb steps
							  if(arrAllSpacesInTubeForUse[dummyFrom][8] == dummyTo && arrAllSpacesInTubeForUse[dummyTo][9] == dummyFrom){
								  validFutureStep = false;
							  }
							  
							  // Check 'Dumb Step 3'
							  if(arrAllSpacesInTubeForUse[dummyTo][10] == dummyFrom){
								  validFutureStep = false;
							  }
							  
							  if(validFutureStep == true){
								  var tempCheckLength = arrMasterHistory.length;
								  LoopCheck1:
								  for(let k = 0; k < tempCheckLength; k++){
									  var diffCount = 0;
									  for(let m = 0; m < totalCol; m++){
										  for(let n = 0; n < 4; n++){
											  if(tempFutureState[m][n] != arrMasterHistory[k][m][n]){
												  diffCount += 1;
												  continue LoopCheck1;
											  }
										  }
									  }
									  if(diffCount == 0){
										  validFutureStep = false;
										  break LoopCheck1;
									  }
								  }
							  }
							  
							  if(validFutureStep == true){
								  var tempLength = arrColorCheck.length;
								  arrColorCheck[tempLength] = [];
								  arrColorCheck[tempLength][0] = arrAllSpacesInTubeForUse[i][5] - 1; // Color
								  arrColorCheck[tempLength][1] = j; // From
								  arrColorCheck[tempLength][2] = i; // To
							  }
						  }
					  }
				  }
			  }
			  
			  
			  // Set arrCurrentSteps[i][3] as arrColorCheck
			  var nextStepCount = arrCurrentSteps.length;
			  arrCurrentSteps[nextStepCount] = [];
			  arrCurrentSteps[nextStepCount][3] = [];
			  for(let i = 0; i < arrColorCheck.length; i++){
				  arrCurrentSteps[nextStepCount][3][i] = [];
				  for(let j = 0; j < arrColorCheck[i].length; j++){
					  arrCurrentSteps[nextStepCount][3][i][j] = arrColorCheck[i][j];
				  }
			  }
			  
			  // Check again if the 'Anti-LoopBack Mechanism' has made it a Semi-Deadend
			  if(arrColorCheck.length == 0){ // Semi-Deadend
				  // Delete the arrCurrentSteps[nextStepCount]
				  arrCurrentSteps.splice(nextStepCount,1);
				  // Go back
				  var keepMovingBackward = true;
				  while(keepMovingBackward == true){
					  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
					  // Check if true Deadend
					  if(previousStepCount < 0){
						  showDeadendText = true;
						  break Solvingloop;
					  }
					  // Now restore to previous state
					  for(let i = 0; i < totalCol; i++){
						  for(let j = 0; j < 11; j++){
							  arrAllSpacesInTubeForUse[i][j] = arrMasterHistory[previousStepCount][i][j];
						  }
					  }
					  
					  
					  arrTotalAllSpaces[takeTurnNum][4] += 1;
					  nextStepCount -= 1;
					  
					  
					  // Update MasterHistory
					  arrMasterHistory.splice(previousStepCount+1,1);
					  // See if it still needs to 'keepMovingBackward == true' OR Move & Update Steps
					  if(arrCurrentSteps[previousStepCount][0] == 1){ // keepMovingBackward is needed (MUST step)
						  arrCurrentSteps.splice(previousStepCount,1);
					  }else if(arrCurrentSteps[previousStepCount].length == 3){
						  arrCurrentSteps.splice(previousStepCount,1);
					  }else if(arrCurrentSteps[previousStepCount][3].length == 0){
						  arrCurrentSteps.splice(previousStepCount,1);
					  }else{// end the movebackloop
						  keepMovingBackward = false;
					  }
				  }
			  }
			  
			  
			  // (1.) Now make a Move
			  var newMoveFrom = arrCurrentSteps[nextStepCount][3][0][1];
			  var newMoveTo = arrCurrentSteps[nextStepCount][3][0][2];
			  var newMoveFromNumBall = arrAllSpacesInTubeForUse[newMoveFrom][4];
			  var newMoveToNumBall = arrAllSpacesInTubeForUse[newMoveTo][4];
			  var newMoveColor = arrAllSpacesInTubeForUse[newMoveFrom][5];
			  // (1.1) Update Balls
			  arrAllSpacesInTubeForUse[newMoveFrom][newMoveFromNumBall-1] = 0;
			  arrAllSpacesInTubeForUse[newMoveTo][newMoveToNumBall] = newMoveColor;
			  // (1.2) Update array - [4] - Number Of Balls
			  arrAllSpacesInTubeForUse[newMoveFrom][4] -= 1;
			  arrAllSpacesInTubeForUse[newMoveTo][4] += 1;
			  // (1.3) Update array - [5] - Top Ball Color
			  if(arrAllSpacesInTubeForUse[newMoveFrom][4] == 0){
			  	arrAllSpacesInTubeForUse[newMoveFrom][5] = 0;
			  }else{
			  	arrAllSpacesInTubeForUse[newMoveFrom][5] = arrAllSpacesInTubeForUse[newMoveFrom][arrAllSpacesInTubeForUse[newMoveFrom][4]-1];
			  }
			  arrAllSpacesInTubeForUse[newMoveTo][5] = newMoveColor;
			  // (1.4) Update array - [6] - Same Color Check (empty / same : 0, else > 0)
			  arrAllSpacesInTubeForUse[newMoveFrom][6] = 0; // Reset as 0
			  arrAllSpacesInTubeForUse[newMoveTo][6] = 0; // Reset as 0
			  // From
			  if(arrAllSpacesInTubeForUse[newMoveFrom][4] == 0){
				  arrAllSpacesInTubeForUse[newMoveFrom][6] = 0;
			  }else{
				  var tempCount = arrAllSpacesInTubeForUse[newMoveFrom][4];
				  for(let i = 0; i < arrAllSpacesInTubeForUse[newMoveFrom][4]; i++){
					  if(arrAllSpacesInTubeForUse[newMoveFrom][i] != arrAllSpacesInTubeForUse[newMoveFrom][0]){
						  tempCount = i;
						  break;
					  }
				  }
				  arrAllSpacesInTubeForUse[newMoveFrom][6] = arrAllSpacesInTubeForUse[newMoveFrom][4] - tempCount;
			  }
			  // To
			  if(arrAllSpacesInTubeForUse[newMoveTo][4] == 0){
				  arrAllSpacesInTubeForUse[newMoveTo][6] = 0;
			  }else{
				  var tempCount = arrAllSpacesInTubeForUse[newMoveTo][4];
				  for(let i = 0; i < arrAllSpacesInTubeForUse[newMoveTo][4]; i++){
					  if(arrAllSpacesInTubeForUse[newMoveTo][i] != arrAllSpacesInTubeForUse[newMoveTo][0]){
						  tempCount = i;
						  break;
					  }
				  }
				  arrAllSpacesInTubeForUse[newMoveTo][6] = arrAllSpacesInTubeForUse[newMoveTo][4] - tempCount;
			  }
			  // (1.5) Update array - [7] - Show 1 if it is a Perfect Tube
			  if(arrAllSpacesInTubeForUse[newMoveTo][6] == 0 && arrAllSpacesInTubeForUse[newMoveTo][4] == 4){
				  arrAllSpacesInTubeForUse[newMoveTo][7] = 1;
			  }
			  // Reset Before Updating [8] & [9]
			  var fromOther;
			  var toOther;
			  // From
			  if(arrAllSpacesInTubeForUse[newMoveFrom][8] != null){
			  	fromOther = arrAllSpacesInTubeForUse[newMoveFrom][8];
			  	arrAllSpacesInTubeForUse[newMoveFrom][8] = null;
			  	arrAllSpacesInTubeForUse[newMoveFrom][9] = null;
			  	arrAllSpacesInTubeForUse[fromOther][8] = null;
			  	arrAllSpacesInTubeForUse[fromOther][9] = null;
			  }else if(arrAllSpacesInTubeForUse[newMoveFrom][9] != null){
			  	fromOther = arrAllSpacesInTubeForUse[newMoveFrom][9];
			  	arrAllSpacesInTubeForUse[newMoveFrom][8] = null;
			  	arrAllSpacesInTubeForUse[newMoveFrom][9] = null;
			  	arrAllSpacesInTubeForUse[fromOther][8] = null;
			  	arrAllSpacesInTubeForUse[fromOther][9] = null;
			  }
			  // To
			  if(arrAllSpacesInTubeForUse[newMoveTo][8] != null){
			  	toOther = arrAllSpacesInTubeForUse[newMoveTo][8];
			  	arrAllSpacesInTubeForUse[newMoveTo][8] = null;
			  	arrAllSpacesInTubeForUse[newMoveTo][9] = null;
			  	arrAllSpacesInTubeForUse[toOther][8] = null;
			  	arrAllSpacesInTubeForUse[toOther][9] = null;
			  }else if(arrAllSpacesInTubeForUse[newMoveTo][9] != null){
			  	toOther = arrAllSpacesInTubeForUse[newMoveTo][9];
			  	arrAllSpacesInTubeForUse[newMoveTo][8] = null;
			  	arrAllSpacesInTubeForUse[newMoveTo][9] = null;
			  	arrAllSpacesInTubeForUse[toOther][8] = null;
			  	arrAllSpacesInTubeForUse[toOther][9] = null;
			  }
			  // Update array - [8] - 'last received from'
			  arrAllSpacesInTubeForUse[newMoveTo][8] = newMoveFrom;
			  // Update array - [9] - 'last moved to'
			  arrAllSpacesInTubeForUse[newMoveFrom][9] = newMoveTo;
			  // Update array - [10] - 'Dumb Step 3' reset
			  arrAllSpacesInTubeForUse[newMoveFrom][10] = null;
			  arrAllSpacesInTubeForUse[newMoveTo][10] = null;
			  for(let i = 0; i < totalCol; i++){
				  if(arrAllSpacesInTubeForUse[i][10] == newMoveFrom || arrAllSpacesInTubeForUse[i][10] == newMoveTo){
					  arrAllSpacesInTubeForUse[i][10] = null;
				  }
			  }
			  // Update array - [10] - 'Dumb Step 3' marking
			  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
			  if(previousStepCount > 0){ // ignore 1st step
				  if(arrCurrentSteps[previousStepCount][3].length > 1){
					  for(let i = 1; i < arrCurrentSteps[previousStepCount][3].length; i++){
						  if(arrCurrentSteps[previousStepCount][3][i][1] == newMoveFrom){
							  var markDumb3 = arrCurrentSteps[previousStepCount][3][i][2];
							  arrAllSpacesInTubeForUse[markDumb3][10] = newMoveTo;
						  }
					  }
				  }
			  }
			  
			  // (2.) Update the step (Mark & Delete)
			  arrCurrentSteps[nextStepCount][0] = 0;
			  arrCurrentSteps[nextStepCount][1] = newMoveFrom;
			  arrCurrentSteps[nextStepCount][2] = newMoveTo;
			  arrCurrentSteps[nextStepCount][3].splice(0,1);
			  // (3.) Update the MasterHistory
			  var MHLength = arrMasterHistory.length;
			  arrMasterHistory[MHLength] = [];
			  for(let i = 0; i < totalCol; i++){ // Create tempAllSpaces (corrected)
				  arrMasterHistory[MHLength][i] = [];
				  for(let j = 0; j < 11; j++){
					  arrMasterHistory[MHLength][i][j] = arrAllSpacesInTubeForUse[i][j];
				  }
			  }
			  // Update Number Of Move Performed
			  arrTotalAllSpaces[takeTurnNum][3] += 1;
			  //deBugTextShow(); //**********************************************************************************
			  takeTurnNum = (takeTurnNum + 1)%(totalCol-emptyCol);
			  
		  }
	  }else{ // 4.3.1.3. When tempEmptyCount > 0 (there are empty tube(s))
		  // ***Basically very similar to previous case, be aware of empty tube cases***
		  var arrColorCheck = []; // arrColorCheck[i][0,1,2] = [color (show -1 if to is empty), from, to]
		  var tempColorAvailableCount = []; // tempColorAvailableCount[i][total top (not perfect), total 'to'], where i = color -1
		  
		  // Check Color First
		  for(let i = 0; i < totalCol-emptyCol; i++){
			  tempColorAvailableCount[i] = [0, 0];
			  for(let j = 0; j < totalCol; j++){
				  if(arrAllSpacesInTubeForUse[j][7] == 0 && arrAllSpacesInTubeForUse[j][5] - 1 == i){
					  tempColorAvailableCount[i][0] += 1;
					  if(arrAllSpacesInTubeForUse[j][4] < 4){
						  tempColorAvailableCount[i][1] += 1;
					  }
				  }
			  }
		  }
		  
		  
		  // Now Create arrColorCheck (without -1 : empty)
		  for(let i = 0; i < totalCol; i++){
			  var tempCurrentColor = arrAllSpacesInTubeForUse[i][5];
			  if(arrAllSpacesInTubeForUse[i][4] == 0){
				  // Skip empty tubes
			  }else if(arrAllSpacesInTubeForUse[i][7] == 0 && tempColorAvailableCount[tempCurrentColor - 1][0] > 1 && arrAllSpacesInTubeForUse[i][4] < 4){ // Find the 'to' first <-- this line no need to consider -1, see 'empty' case below
				  for(let j = 0; j < totalCol; j++){ // 'From'
					  if(j != i && arrAllSpacesInTubeForUse[j][7] == 0 && arrAllSpacesInTubeForUse[i][5] == arrAllSpacesInTubeForUse[j][5]){
						  // Need to check if it is a loop case
						  var tempFutureState = [];
						  for(let k = 0; k < arrAllSpacesInTubeForUse.length; k++){
							  tempFutureState[k] = [];
							  for(let m = 0; m < 6; m++){
								  tempFutureState[k][m] = arrAllSpacesInTubeForUse[k][m];
							  }
						  }
						  var validFutureStep = true;
						  
						  // Perform the moves (0-4 only)
						  var dummyFrom = j;
						  var dummyTo = i;
						  var dummyFromNumBalls = tempFutureState[dummyFrom][4];
						  var dummyToNumBalls = tempFutureState[dummyTo][4];
						  var dummyColor = tempFutureState[dummyFrom][5];
						  tempFutureState[dummyFrom][dummyFromNumBalls-1] = 0;
						  tempFutureState[dummyTo][dummyToNumBalls] = dummyColor;
						  
						  
						  // Check 'Interchange' dumb steps
						  if(arrAllSpacesInTubeForUse[dummyFrom][8] == dummyTo && arrAllSpacesInTubeForUse[dummyTo][9] == dummyFrom){
						  	validFutureStep = false;
						  }
						  
						  // Check 'Dumb Step 3'
						  if(arrAllSpacesInTubeForUse[dummyTo][10] == dummyFrom){
							  validFutureStep = false;
						  }
						  
						  if(validFutureStep == true){
							  var tempCheckLength = arrMasterHistory.length;
							  LoopCheck1:
							  for(let k = 0; k < tempCheckLength; k++){
								  var diffCount = 0;
								  for(let m = 0; m < totalCol; m++){
									  for(let n = 0; n < 4; n++){
										  if(tempFutureState[m][n] != arrMasterHistory[k][m][n]){
											  diffCount += 1;
											  continue LoopCheck1;
										  }
									  }
								  }
								  if(diffCount == 0){
									  validFutureStep = false;
									  break LoopCheck1;
								  }
							  }
						  }
						  
						  if(validFutureStep == true){
							  var tempLength = arrColorCheck.length;
							  arrColorCheck[tempLength] = [];
							  arrColorCheck[tempLength][0] = arrAllSpacesInTubeForUse[i][5] - 1; // Color
							  arrColorCheck[tempLength][1] = j; // From
							  arrColorCheck[tempLength][2] = i; // To
						  }
					  }
				  }
			  }
		  }
		  

		  
		  // ***New Thing*** Add empty (-1) to arrColorCheck
		  var firstEmptyTube = -2;
		  LoopFindFirstEmpty1:
		  for(let i = 0; i < totalCol; i++){
			  if(arrAllSpacesInTubeForUse[i][4] == 0){
				  firstEmptyTube = i;
				  break LoopFindFirstEmpty1;
			  }
		  }
		 
		 if(firstEmptyTube != -2){
			 for(let i = 0; i < totalCol; i++){ // 'From'
				 if(i != firstEmptyTube && arrAllSpacesInTubeForUse[i][7] == 0 && arrAllSpacesInTubeForUse[i][4] > 0 && arrAllSpacesInTubeForUse[i][6] > 0){
					 // Need to check if it is a loop case
					 var tempFutureState = [];
					 for(let j = 0; j < arrAllSpacesInTubeForUse.length; j++){
						 tempFutureState[j] = [];
						 for(let k = 0; k < 6; k++){
							 tempFutureState[j][k] = arrAllSpacesInTubeForUse[j][k];
						 }
					 }
					 var validFutureStep = true;
					 
					 
					 // Perform the moves (0-4 only)
					 var dummyFrom = i;
					 var dummyTo = firstEmptyTube;
					 var dummyFromNumBalls = tempFutureState[dummyFrom][4];
					 var dummyToNumBalls = tempFutureState[dummyTo][4];
					 var dummyColor = tempFutureState[dummyFrom][5];
					 tempFutureState[dummyFrom][dummyFromNumBalls-1] = 0;
					 tempFutureState[dummyTo][dummyToNumBalls] = dummyColor;
					 
					 // Check 'Interchange' dumb steps
					 if(arrAllSpacesInTubeForUse[dummyFrom][8] == dummyTo && arrAllSpacesInTubeForUse[dummyTo][9] == dummyFrom){
						 validFutureStep = false;
					 }
					 
					 // Check 'Dumb Step 3'
					 if(arrAllSpacesInTubeForUse[dummyTo][10] == dummyFrom){
						 validFutureStep = false;
					 }
					 
					 if(validFutureStep == true){
						 var tempCheckLength = arrMasterHistory.length;
						 LoopCheck2:
						 for(let j = 0; j < tempCheckLength; j++){
							 var diffCount = 0;
							 for(let k = 0; k < totalCol; k++){
								 for(let m = 0; m < 4; m++){
									 if(tempFutureState[k][m] != arrMasterHistory[j][k][m]){
										 diffCount += 1;
										 continue LoopCheck2;
									 }
								 }
							 }
							 if(diffCount == 0){
								 validFutureStep = false;
								 break LoopCheck2;
							 }
						 }
					 }
					 
					 if(validFutureStep == true){
						 arrColorCheck.splice(0,0,[-1,i,firstEmptyTube])
					 }
				 }
			 }
		 }
		  
		  // Set arrCurrentSteps[i][3] as arrColorCheck
		  var nextStepCount = arrCurrentSteps.length;
		  arrCurrentSteps[nextStepCount] = [];
		  arrCurrentSteps[nextStepCount][3] = [];
		  for(let i = 0; i < arrColorCheck.length; i++){
			  arrCurrentSteps[nextStepCount][3][i] = [];
			  for(let j = 0; j < arrColorCheck[i].length; j++){
				  arrCurrentSteps[nextStepCount][3][i][j] = arrColorCheck[i][j];
			  }
		  }
		  
		  // Check again if the 'Anti-LoopBack Mechanism' has made it a Semi-Deadend
		  if(arrColorCheck.length == 0){ // Semi-Deadend
			  // Delete the arrCurrentSteps[nextStepCount]
			  arrCurrentSteps.splice(nextStepCount,1);
			  // Go back
			  var keepMovingBackward = true;
			  while(keepMovingBackward == true){
				  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
				  // Check if true Deadend
				  if(previousStepCount < 0){
					  showDeadendText = true;
					  break Solvingloop;
				  }
				  // Now restore to previous state
				  for(let i = 0; i < totalCol; i++){
					  for(let j = 0; j < 11; j++){
						  arrAllSpacesInTubeForUse[i][j] = arrMasterHistory[previousStepCount][i][j];
					  }
				  }
				  
				  
				  arrTotalAllSpaces[takeTurnNum][4] += 1;
				  nextStepCount -= 1;
				  
				  
				  // Update MasterHistory
				  arrMasterHistory.splice(previousStepCount+1,1);
				  // See if it still needs to 'keepMovingBackward == true' OR Move & Update Steps
				  if(arrCurrentSteps[previousStepCount][0] == 1){ // keepMovingBackward is needed (MUST step)
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else if(arrCurrentSteps[previousStepCount].length == 3){
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else if(arrCurrentSteps[previousStepCount][3].length == 0){
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else{// end the movebackloop
					  keepMovingBackward = false;
				  }
			  }
		  }
		  
		  
		  // (1.) Now make a Move
		  var newMoveFrom = arrCurrentSteps[nextStepCount][3][0][1];
		  var newMoveTo = arrCurrentSteps[nextStepCount][3][0][2];
		  var newMoveFromNumBall = arrAllSpacesInTubeForUse[newMoveFrom][4];
		  var newMoveToNumBall = arrAllSpacesInTubeForUse[newMoveTo][4];
		  var newMoveColor = arrAllSpacesInTubeForUse[newMoveFrom][5];
		  // (1.1) Update Balls
		  arrAllSpacesInTubeForUse[newMoveFrom][newMoveFromNumBall-1] = 0;
		  arrAllSpacesInTubeForUse[newMoveTo][newMoveToNumBall] = newMoveColor;
		  // (1.2) Update array - [4] - Number Of Balls
		  arrAllSpacesInTubeForUse[newMoveFrom][4] -= 1;
		  arrAllSpacesInTubeForUse[newMoveTo][4] += 1;
		  // (1.3) Update array - [5] - Top Ball Color
		  if(arrAllSpacesInTubeForUse[newMoveFrom][4] == 0){
		  	arrAllSpacesInTubeForUse[newMoveFrom][5] = 0;
		  }else{
		  	arrAllSpacesInTubeForUse[newMoveFrom][5] = arrAllSpacesInTubeForUse[newMoveFrom][arrAllSpacesInTubeForUse[newMoveFrom][4]-1];
		  }
		  arrAllSpacesInTubeForUse[newMoveTo][5] = newMoveColor;
		  // (1.4) Update array - [6] - Same Color Check (empty / same : 0, else > 0)
		  arrAllSpacesInTubeForUse[newMoveFrom][6] = 0; // Reset as 0
		  arrAllSpacesInTubeForUse[newMoveTo][6] = 0; // Reset as 0
		  // From
		  if(arrAllSpacesInTubeForUse[newMoveFrom][4] == 0){
			  arrAllSpacesInTubeForUse[newMoveFrom][6] = 0;
		  }else{
			  var tempCount = arrAllSpacesInTubeForUse[newMoveFrom][4];
			  for(let i = 0; i < arrAllSpacesInTubeForUse[newMoveFrom][4]; i++){
				  if(arrAllSpacesInTubeForUse[newMoveFrom][i] != arrAllSpacesInTubeForUse[newMoveFrom][0]){
					  tempCount = i;
					  break;
				  }
			  }
			  arrAllSpacesInTubeForUse[newMoveFrom][6] = arrAllSpacesInTubeForUse[newMoveFrom][4] - tempCount;
		  }
		  // To
		  if(arrAllSpacesInTubeForUse[newMoveTo][4] == 0){
			  arrAllSpacesInTubeForUse[newMoveTo][6] = 0;
		  }else{
			  var tempCount = arrAllSpacesInTubeForUse[newMoveTo][4];
			  for(let i = 0; i < arrAllSpacesInTubeForUse[newMoveTo][4]; i++){
				  if(arrAllSpacesInTubeForUse[newMoveTo][i] != arrAllSpacesInTubeForUse[newMoveTo][0]){
					  tempCount = i;
					  break;
				  }
			  }
			  arrAllSpacesInTubeForUse[newMoveTo][6] = arrAllSpacesInTubeForUse[newMoveTo][4] - tempCount;
		  }
		  // (1.5) Update array - [7] - Show 1 if it is a Perfect Tube
		  if(arrAllSpacesInTubeForUse[newMoveTo][6] == 0 && arrAllSpacesInTubeForUse[newMoveTo][4] == 4){
			  arrAllSpacesInTubeForUse[newMoveTo][7] = 1;
		  }
		  // Reset Before Updating [8] & [9]
		  var fromOther;
		  var toOther;
		  // From
		  if(arrAllSpacesInTubeForUse[newMoveFrom][8] != null){
		  	fromOther = arrAllSpacesInTubeForUse[newMoveFrom][8];
		  	arrAllSpacesInTubeForUse[newMoveFrom][8] = null;
		  	arrAllSpacesInTubeForUse[newMoveFrom][9] = null;
		  	arrAllSpacesInTubeForUse[fromOther][8] = null;
		  	arrAllSpacesInTubeForUse[fromOther][9] = null;
		  }else if(arrAllSpacesInTubeForUse[newMoveFrom][9] != null){
		  	fromOther = arrAllSpacesInTubeForUse[newMoveFrom][9];
		  	arrAllSpacesInTubeForUse[newMoveFrom][8] = null;
		  	arrAllSpacesInTubeForUse[newMoveFrom][9] = null;
		  	arrAllSpacesInTubeForUse[fromOther][8] = null;
		  	arrAllSpacesInTubeForUse[fromOther][9] = null;
		  }
		  // To
		  if(arrAllSpacesInTubeForUse[newMoveTo][8] != null){
		  	toOther = arrAllSpacesInTubeForUse[newMoveTo][8];
		  	arrAllSpacesInTubeForUse[newMoveTo][8] = null;
		  	arrAllSpacesInTubeForUse[newMoveTo][9] = null;
		  	arrAllSpacesInTubeForUse[toOther][8] = null;
		  	arrAllSpacesInTubeForUse[toOther][9] = null;
		  }else if(arrAllSpacesInTubeForUse[newMoveTo][9] != null){
		  	toOther = arrAllSpacesInTubeForUse[newMoveTo][9];
		  	arrAllSpacesInTubeForUse[newMoveTo][8] = null;
		  	arrAllSpacesInTubeForUse[newMoveTo][9] = null;
		  	arrAllSpacesInTubeForUse[toOther][8] = null;
		  	arrAllSpacesInTubeForUse[toOther][9] = null;
		  }
		  // Update array - [8] - 'last received from'
		  arrAllSpacesInTubeForUse[newMoveTo][8] = newMoveFrom;
		  // Update array - [9] - 'last moved to'
		  arrAllSpacesInTubeForUse[newMoveFrom][9] = newMoveTo;
		  // Update array - [10] - 'Dumb Step 3' reset
		  arrAllSpacesInTubeForUse[newMoveFrom][10] = null;
		  arrAllSpacesInTubeForUse[newMoveTo][10] = null;
		  for(let i = 0; i < totalCol; i++){
			  if(arrAllSpacesInTubeForUse[i][10] == newMoveFrom || arrAllSpacesInTubeForUse[i][10] == newMoveTo){
				  arrAllSpacesInTubeForUse[i][10] = null;
			  }
		  }
		  // Update array - [10] - 'Dumb Step 3' marking
		  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
		  if(previousStepCount > 0){ // ignore 1st step
			  if(arrCurrentSteps[previousStepCount][3].length > 1){
				  for(let i = 1; i < arrCurrentSteps[previousStepCount][3].length; i++){
					  if(arrCurrentSteps[previousStepCount][3][i][1] == newMoveFrom){
						  var markDumb3 = arrCurrentSteps[previousStepCount][3][i][2];
						  arrAllSpacesInTubeForUse[markDumb3][10] = newMoveTo;
					  }
				  }
			  }
		  }
		  
		  // (2.) Update the step (Mark & Delete)
		  arrCurrentSteps[nextStepCount][0] = 0;
		  arrCurrentSteps[nextStepCount][1] = newMoveFrom;
		  arrCurrentSteps[nextStepCount][2] = newMoveTo;
		  arrCurrentSteps[nextStepCount][3].splice(0,1);
		  
		  // (3.) Update the MasterHistory
		  var MHLength = arrMasterHistory.length;
		  arrMasterHistory[MHLength] = [];
		  for(let i = 0; i < totalCol; i++){ // Create tempAllSpaces (corrected)
			  arrMasterHistory[MHLength][i] = [];
			  for(let j = 0; j < 11; j++){
				  arrMasterHistory[MHLength][i][j] = arrAllSpacesInTubeForUse[i][j];
			  }
		  }
		  
		  
		  // Update Number Of Move Performed
		  arrTotalAllSpaces[takeTurnNum][3] += 1;
		  //deBugTextShow(); //**********************************************************************************
		  takeTurnNum = (takeTurnNum + 1)%(totalCol-emptyCol);
	  }

    }
	/*
	if(numberOfMovesPerformed > 0 ){ //&& arrCurrentSteps[4][3].length > 7
		var arrSee1 = [];
		var arrSee2 = [];
		for(let i = 0; i < arrMasterHistory.length; i++){
			arrSee1[i] = [];
			for(let j = 0; j < arrMasterHistory[i].length; j++){
				arrSee1[i][j] = arrMasterHistory[i][j];
			}
		}
		for(let i = 0; i < arrCurrentSteps.length; i++){
			arrSee2[i] = [];
			for(let j = 0; j < arrCurrentSteps[i].length; j++){
				arrSee2[i][j] = arrCurrentSteps[i][j];
			}
		}
		print(numberOfMovesPerformed);
		//break Solvingloop;
		print(arrSee1);
		print(arrSee2);
	}
	*/
  }
  
  numberOfMovesPerformed = arrTotalAllSpaces[takeTurnNum][3];
  numberOfBackwardMoves = arrTotalAllSpaces[takeTurnNum][4];
  
  // Convert Back
  if(takeTurnNum != 0){
	  // arrAllSpacesInTubeForUse
	  for(let i = 0; i < takeTurnNum; i++){
		  arrAllSpacesInTubeForUse.splice(0, 0, arrAllSpacesInTubeForUse.splice(arrAllSpacesInTubeForUse.length-1, 1)[0]);
	  }
	  // arrMasterHistory
	  for(let i = 0; i < arrMasterHistory.length; i++){
		  for(let j = 0; j < takeTurnNum; j++){
			  arrMasterHistory[i].splice(0, 0, arrMasterHistory[i].splice(arrMasterHistory[i].length-1, 1)[0]);
		  }
	  }
	  // arrCurrentSteps
	  for(let i = 0; i < arrCurrentSteps.length; i++){
		  arrCurrentSteps[i][1] = (arrCurrentSteps[i][1] + takeTurnNum)%totalCol;
		  arrCurrentSteps[i][2] = (arrCurrentSteps[i][2] + takeTurnNum)%totalCol;
		  if(arrCurrentSteps[i].length == 4){
			  for(let j = 0; j < arrCurrentSteps[i][3].length; j++){
				  if(arrCurrentSteps[i][3][j].length > 0){
					  arrCurrentSteps[i][3][j][1] = (arrCurrentSteps[i][3][j][1] + takeTurnNum)%totalCol;
					  arrCurrentSteps[i][3][j][2] = (arrCurrentSteps[i][3][j][2] + takeTurnNum)%totalCol;
				  }
			  }
		  }
	  }
  }
  
  //print('takeTurnNum : ' + takeTurnNum);
  // Show Message?
  //print(arrAllSpacesInTubeForUse);
  //print('Ended');
  print(arrCurrentSteps);
  //print(arrAllSpacesInTubeForUse);
  

  var date2 = new Date();
  var time2 = date2.getTime();
  var secElapsed = (time2 - time1)/1000;
  print('Time elapsed = ' + secElapsed + ' second(s).');
  
  solutionBox = createElement('textarea', '');
  solutionBox.position(10,905);
  solutionBox.size(400, 100);
  solutionBox.style('resize', 'none');
  solutionBox.id('outputtext1');
  
  var finalSolutionArray = [];
  for(let i = 0; i < arrCurrentSteps.length; i++){
	  finalSolutionArray[i] = [];
	  finalSolutionArray[i][0] = '[Step ' + (i+1) +']';
	  finalSolutionArray[i][1] = arrCurrentSteps[i][1];
	  finalSolutionArray[i][2] = arrCurrentSteps[i][2];
	  finalSolutionArray[i][3] = "\n";
  }
  
  var solutionString = finalSolutionArray.toString();
  document.getElementById('outputtext1').value = 'Time elapsed = ' + secElapsed + ' second(s).' + "\n" + "\n" + solutionString;
  //print(arrTotalAllSpaces);
  

  /* FOR NEXT STEP, STILL UNDER DEVELOPMENT
  if(numberOfMovesPerformed != 0 && solvedState == true){
	  // Create a Button - Continue Solving
	  continueButton = createButton('Continue To Solve');
	  continueButton.position(300,800);
	  continueButton.mousePressed(continueSolvingIt);

  }*/
}





// NEXT STEP ****************************************************************************************************************************************************************************************
/* STILL UNDER DEVELOPMENT
function continueSolvingIt(){
	showContinueText = true;
	var date3 = new Date();
	var time3 = date3.getTime();
	
	var arrBestStepsSoFar = [];
	var arrBestFinalState = [];
	var bestStepCount;
	

  // Update arrBestStepsSoFar
  for(let i = 0; i < arrCurrentSteps.length; i++){
	  arrBestStepsSoFar[i] = [];
	  for(let j = 1; j < 3; j++){
		  arrBestStepsSoFar[i][j] = arrCurrentSteps[i][j];
	  }
  }
  
  // Update arrBestFinalState
  for(let i = 0; i < totalCol; i++){
	  arrBestFinalState[i] = [];
	  for(let j = 0; j < 11; j++){
		  arrBestFinalState[i][j] = arrAllSpacesInTubeForUse[i][j];
	  }
  }
  
  // Update bestStepCount
  bestStepCount = arrCurrentSteps.length;
	
  // NOW CONTINUE TO SOLVE
  ContinueSolvingloop:
  while(finalEndState == false){ // loop while 'finalEndState == false'
	
	var checkPerfect = 0;
    for(let i = 0; i < totalCol; i++){ // 4.1 Check if all are perfect
      checkPerfect += arrAllSpacesInTubeForUse[i][7];
    }
    if(checkPerfect == totalCol-emptyCol){ // [4.1 - Perfect Case]
      
	  // If new BEST solution appear
	  if(arrCurrentSteps.length < bestStepCount){
		  
		  // Reset the 3 variables
		  arrBestStepsSoFar = [];
		  arrBestFinalState = [];
		  bestStepCount = 0;
		  
		  // Update arrBestStepsSoFar
		  for(let i = 0; i < arrCurrentSteps.length; i++){
			  arrBestStepsSoFar[i] = [];
			  for(let j = 1; j < 3; j++){
				  arrBestStepsSoFar[i][j-1] = arrCurrentSteps[i][j];
			  }
		  }
		  
		  // Update arrBestFinalState
		  for(let i = 0; i < totalCol; i++){
			  arrBestFinalState[i] = [];
			  for(let j = 0; j < 11; j++){
				  arrBestFinalState[i][j] = arrAllSpacesInTubeForUse[i][j];
			  }
		  }
		  
		  // Update bestStepCount
		  bestStepCount = arrCurrentSteps.length;
	  }
	  
	  // Go back
	  var keepMovingBackward = true;
	  while(keepMovingBackward == true){
		  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
		  // Check if true Deadend
		  if(previousStepCount < 0){
			  finalEndState = true;
			  break ContinueSolvingloop;
		  }
		  // Now restore to previous state
		  for(let i = 0; i < totalCol; i++){
			  for(let j = 0; j < 11; j++){
				  arrAllSpacesInTubeForUse[i][j] = arrMasterHistory[previousStepCount][i][j];
			  }
		  }
		  
		  
		  numberOfExtraBackwardMoves += 1;
		  
		  
		  // Update MasterHistory
		  arrMasterHistory.splice(previousStepCount+1,1);
		  // See if it still needs to 'keepMovingBackward == true' OR Move & Update Steps
		  if(arrCurrentSteps[previousStepCount][0] == 1){ // keepMovingBackward is needed (MUST step)
			  arrCurrentSteps.splice(previousStepCount,1);
			  }else if(arrCurrentSteps[previousStepCount].length == 3){
				  arrCurrentSteps.splice(previousStepCount,1);
			  }else if(arrCurrentSteps[previousStepCount][3].length == 0){
				  arrCurrentSteps.splice(previousStepCount,1);
			  }else{ // No need to go back, now Move & Update Steps
			  // (1.) Move
			  var tempMoveFrom = arrCurrentSteps[previousStepCount][3][0][1];
			  var tempMoveTo = arrCurrentSteps[previousStepCount][3][0][2];
			  var tempMoveColor = arrAllSpacesInTubeForUse[tempMoveFrom][5];
			  var tempMoveFromNumOfBall = arrAllSpacesInTubeForUse[tempMoveFrom][4];
			  var tempMoveToNumOfBall = arrAllSpacesInTubeForUse[tempMoveTo][4];
			  // (1.1) Update Balls
			  arrAllSpacesInTubeForUse[tempMoveFrom][tempMoveFromNumOfBall-1] = 0;
			  arrAllSpacesInTubeForUse[tempMoveTo][tempMoveToNumOfBall] = tempMoveColor;
			  // (1.2) Update array - [4] - Number Of Balls
			  arrAllSpacesInTubeForUse[tempMoveFrom][4] -= 1;
			  arrAllSpacesInTubeForUse[tempMoveTo][4] += 1;
			  // (1.3) Update array - [5] - Top Ball Color
			  if(arrAllSpacesInTubeForUse[tempMoveFrom][4] == 0){
				  arrAllSpacesInTubeForUse[tempMoveFrom][5] = 0;
			  }else{
				  arrAllSpacesInTubeForUse[tempMoveFrom][5] = arrAllSpacesInTubeForUse[tempMoveFrom][arrAllSpacesInTubeForUse[tempMoveFrom][4]-1];
			  }
			  arrAllSpacesInTubeForUse[tempMoveTo][5] = tempMoveColor;
			  // (1.4) Update array - [6] - Same Color Check (empty / same : 0, else > 0)
			  arrAllSpacesInTubeForUse[tempMoveFrom][6] = 0; // Reset as 0
			  arrAllSpacesInTubeForUse[tempMoveTo][6] = 0; // Reset as 0
			  // From
			  if(arrAllSpacesInTubeForUse[tempMoveFrom][4] == 0){
				  arrAllSpacesInTubeForUse[tempMoveFrom][6] = 0;
			  }else{
				  var tempCount = arrAllSpacesInTubeForUse[tempMoveFrom][4];
				  for(let i = 0; i < arrAllSpacesInTubeForUse[tempMoveFrom][4]; i++){
					  if(arrAllSpacesInTubeForUse[tempMoveFrom][i] != arrAllSpacesInTubeForUse[tempMoveFrom][0]){
						  tempCount = i;
						  break;
					  }
				  }
				  arrAllSpacesInTubeForUse[tempMoveFrom][6] = arrAllSpacesInTubeForUse[tempMoveFrom][4] - tempCount;
			  }
			  // To
			  if(arrAllSpacesInTubeForUse[tempMoveTo][4] == 0){
				  arrAllSpacesInTubeForUse[tempMoveTo][6] = 0;
			  }else{
				  var tempCount = arrAllSpacesInTubeForUse[tempMoveTo][4];
				  for(let i = 0; i < arrAllSpacesInTubeForUse[tempMoveTo][4]; i++){
					  if(arrAllSpacesInTubeForUse[tempMoveTo][i] != arrAllSpacesInTubeForUse[tempMoveTo][0]){
						  tempCount = i;
						  break;
					  }
				  }
				  arrAllSpacesInTubeForUse[tempMoveTo][6] = arrAllSpacesInTubeForUse[tempMoveTo][4] - tempCount;
			  }
			  // (1.5) Update array - [7] - Show 1 if it is a Perfect Tube
			  if(arrAllSpacesInTubeForUse[tempMoveTo][6] == 0 && arrAllSpacesInTubeForUse[tempMoveTo][4] == 4){
				  arrAllSpacesInTubeForUse[tempMoveTo][7] = 1;
			  }
			  // Reset Before Updating [8] & [9]
			  var fromOther;
			  var toOther;
			  // From
			  if(arrAllSpacesInTubeForUse[tempMoveFrom][8] != null){
				fromOther = arrAllSpacesInTubeForUse[tempMoveFrom][8];
				arrAllSpacesInTubeForUse[tempMoveFrom][8] = null;
				arrAllSpacesInTubeForUse[tempMoveFrom][9] = null;
				arrAllSpacesInTubeForUse[fromOther][8] = null;
				arrAllSpacesInTubeForUse[fromOther][9] = null;
			  }else if(arrAllSpacesInTubeForUse[tempMoveFrom][9] != null){
				fromOther = arrAllSpacesInTubeForUse[tempMoveFrom][9];
				arrAllSpacesInTubeForUse[tempMoveFrom][8] = null;
				arrAllSpacesInTubeForUse[tempMoveFrom][9] = null;
				arrAllSpacesInTubeForUse[fromOther][8] = null;
				arrAllSpacesInTubeForUse[fromOther][9] = null;
			  }
			  // To
			  if(arrAllSpacesInTubeForUse[tempMoveTo][8] != null){
				toOther = arrAllSpacesInTubeForUse[tempMoveTo][8];
				arrAllSpacesInTubeForUse[tempMoveTo][8] = null;
				arrAllSpacesInTubeForUse[tempMoveTo][9] = null;
				arrAllSpacesInTubeForUse[toOther][8] = null;
				arrAllSpacesInTubeForUse[toOther][9] = null;
			  }else if(arrAllSpacesInTubeForUse[tempMoveTo][9] != null){
				toOther = arrAllSpacesInTubeForUse[tempMoveTo][9];
				arrAllSpacesInTubeForUse[tempMoveTo][8] = null;
				arrAllSpacesInTubeForUse[tempMoveTo][9] = null;
				arrAllSpacesInTubeForUse[toOther][8] = null;
				arrAllSpacesInTubeForUse[toOther][9] = null;
			  }
			  // Update array - [8] - 'last received from'
			  arrAllSpacesInTubeForUse[tempMoveTo][8] = tempMoveFrom;
			  // Update array - [9] - 'last moved to'
			  arrAllSpacesInTubeForUse[tempMoveFrom][9] = tempMoveTo;
			  // Update array - [10] - 'Dumb Step 3' reset
			  arrAllSpacesInTubeForUse[tempMoveFrom][10] = null;
			  arrAllSpacesInTubeForUse[tempMoveTo][10] = null;
			  for(let i = 0; i < totalCol; i++){
				  if(arrAllSpacesInTubeForUse[i][10] == tempMoveFrom || arrAllSpacesInTubeForUse[i][10] == tempMoveTo){
					  arrAllSpacesInTubeForUse[i][10] = null;
				  }
			  }
			  // Update array - [10] - 'Dumb Step 3' marking
			  if(previousStepCount > 0){ // ignore 1st step
				  if(arrCurrentSteps[previousStepCount][3].length > 1){
					  for(let i = 1; i < arrCurrentSteps[previousStepCount][3].length; i++){
						  if(arrCurrentSteps[previousStepCount][3][i][1] == tempMoveFrom){
							  var markDumb3 = arrCurrentSteps[previousStepCount][3][i][2];
							  arrAllSpacesInTubeForUse[markDumb3][10] = tempMoveTo;
						  }
					  }
				  }
			  }
			  
			  // (2.) Update the step (Mark & Delete)
			  arrCurrentSteps[previousStepCount][1] = tempMoveFrom;
			  arrCurrentSteps[previousStepCount][2] = tempMoveTo;
			  arrCurrentSteps[previousStepCount][3].splice(0,1);
			  // (3.) Update the MasterHistory
			  var MHLength = arrMasterHistory.length;
			  arrMasterHistory[MHLength] = [];
			  for(let i = 0; i < totalCol; i++){ // Create tempAllSpaces (corrected)
				  arrMasterHistory[MHLength][i] = [];
				  for(let j = 0; j < 11; j++){
					  arrMasterHistory[MHLength][i][j] = arrAllSpacesInTubeForUse[i][j];
				  }
			  }
			  // Update Number Of Move Performed
			  numberOfExtraMovesPerformed += 1;
			  //deBugTextShow(); //**********************************************************************************
			  
			  // end the movebackloop
			  keepMovingBackward = false;
		  }
	  }
	  continue ContinueSolvingloop;
	  
    }else{ // [4.1 - Non-Perfect Case]
      
	  // Check if stepCount > bestStepCount
	  var tempScore = 0;
	  for(let i = 0; i < totalCol; i++){
		  tempScore += arrAllSpacesInTubeForUse[i][6];
	  }
	  if((totalCol - emptyCol - checkPerfect) > tempScore){
		  tempScore = (totalCol - emptyCol - checkPerfect);
	  }
	  if(arrCurrentSteps.length + tempScore >= bestStepCount){
		  // Go back
		  var keepMovingBackward = true;
		  while(keepMovingBackward == true){
			  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
			  // Check if true Deadend
			  if(previousStepCount < 0){
				  finalEndState = true;
				  break ContinueSolvingloop;
			  }
			  // Now restore to previous state
			  for(let i = 0; i < totalCol; i++){
				  for(let j = 0; j < 11; j++){
					  arrAllSpacesInTubeForUse[i][j] = arrMasterHistory[previousStepCount][i][j];
				  }
			  }
			  
			  
			  numberOfExtraBackwardMoves += 1;
			  
			  
			  // Update MasterHistory
			  arrMasterHistory.splice(previousStepCount+1,1);
			  // See if it still needs to 'keepMovingBackward == true' OR Move & Update Steps
			  if(arrCurrentSteps[previousStepCount][0] == 1){ // keepMovingBackward is needed (MUST step)
				  arrCurrentSteps.splice(previousStepCount,1);
			  }else if(arrCurrentSteps[previousStepCount].length == 3){
				  arrCurrentSteps.splice(previousStepCount,1);
			  }else if(arrCurrentSteps[previousStepCount][3].length == 0){
				  arrCurrentSteps.splice(previousStepCount,1);
			  }else{ // No need to go back, now Move & Update Steps
				  // (1.) Move
				  var tempMoveFrom = arrCurrentSteps[previousStepCount][3][0][1];
				  var tempMoveTo = arrCurrentSteps[previousStepCount][3][0][2];
				  var tempMoveColor = arrAllSpacesInTubeForUse[tempMoveFrom][5];
				  var tempMoveFromNumOfBall = arrAllSpacesInTubeForUse[tempMoveFrom][4];
				  var tempMoveToNumOfBall = arrAllSpacesInTubeForUse[tempMoveTo][4];
				  // (1.1) Update Balls
				  arrAllSpacesInTubeForUse[tempMoveFrom][tempMoveFromNumOfBall-1] = 0;
				  arrAllSpacesInTubeForUse[tempMoveTo][tempMoveToNumOfBall] = tempMoveColor;
				  // (1.2) Update array - [4] - Number Of Balls
				  arrAllSpacesInTubeForUse[tempMoveFrom][4] -= 1;
				  arrAllSpacesInTubeForUse[tempMoveTo][4] += 1;
				  // (1.3) Update array - [5] - Top Ball Color
				  if(arrAllSpacesInTubeForUse[tempMoveFrom][4] == 0){
					  arrAllSpacesInTubeForUse[tempMoveFrom][5] = 0;
				  }else{
					  arrAllSpacesInTubeForUse[tempMoveFrom][5] = arrAllSpacesInTubeForUse[tempMoveFrom][arrAllSpacesInTubeForUse[tempMoveFrom][4]-1];
				  }
				  arrAllSpacesInTubeForUse[tempMoveTo][5] = tempMoveColor;
				  // (1.4) Update array - [6] - Same Color Check (empty / same : 0, else > 0)
				  arrAllSpacesInTubeForUse[tempMoveFrom][6] = 0; // Reset as 0
				  arrAllSpacesInTubeForUse[tempMoveTo][6] = 0; // Reset as 0
				  // From
				  if(arrAllSpacesInTubeForUse[tempMoveFrom][4] == 0){
					  arrAllSpacesInTubeForUse[tempMoveFrom][6] = 0;
				  }else{
					  var tempCount = arrAllSpacesInTubeForUse[tempMoveFrom][4];
					  for(let i = 0; i < arrAllSpacesInTubeForUse[tempMoveFrom][4]; i++){
						  if(arrAllSpacesInTubeForUse[tempMoveFrom][i] != arrAllSpacesInTubeForUse[tempMoveFrom][0]){
							  tempCount = i;
							  break;
						  }
					  }
					  arrAllSpacesInTubeForUse[tempMoveFrom][6] = arrAllSpacesInTubeForUse[tempMoveFrom][4] - tempCount;
				  }
				  // To
				  if(arrAllSpacesInTubeForUse[tempMoveTo][4] == 0){
					  arrAllSpacesInTubeForUse[tempMoveTo][6] = 0;
				  }else{
					  var tempCount = arrAllSpacesInTubeForUse[tempMoveTo][4];
					  for(let i = 0; i < arrAllSpacesInTubeForUse[tempMoveTo][4]; i++){
						  if(arrAllSpacesInTubeForUse[tempMoveTo][i] != arrAllSpacesInTubeForUse[tempMoveTo][0]){
							  tempCount = i;
							  break;
						  }
					  }
					  arrAllSpacesInTubeForUse[tempMoveTo][6] = arrAllSpacesInTubeForUse[tempMoveTo][4] - tempCount;
				  }
				  // (1.5) Update array - [7] - Show 1 if it is a Perfect Tube
				  if(arrAllSpacesInTubeForUse[tempMoveTo][6] == 0 && arrAllSpacesInTubeForUse[tempMoveTo][4] == 4){
					  arrAllSpacesInTubeForUse[tempMoveTo][7] = 1;
				  }
				  // Reset Before Updating [8] & [9]
				  var fromOther;
				  var toOther;
				  // From
				  if(arrAllSpacesInTubeForUse[tempMoveFrom][8] != null){
					fromOther = arrAllSpacesInTubeForUse[tempMoveFrom][8];
					arrAllSpacesInTubeForUse[tempMoveFrom][8] = null;
					arrAllSpacesInTubeForUse[tempMoveFrom][9] = null;
					arrAllSpacesInTubeForUse[fromOther][8] = null;
					arrAllSpacesInTubeForUse[fromOther][9] = null;
				  }else if(arrAllSpacesInTubeForUse[tempMoveFrom][9] != null){
					fromOther = arrAllSpacesInTubeForUse[tempMoveFrom][9];
					arrAllSpacesInTubeForUse[tempMoveFrom][8] = null;
					arrAllSpacesInTubeForUse[tempMoveFrom][9] = null;
					arrAllSpacesInTubeForUse[fromOther][8] = null;
					arrAllSpacesInTubeForUse[fromOther][9] = null;
				  }
				  // To
				  if(arrAllSpacesInTubeForUse[tempMoveTo][8] != null){
					toOther = arrAllSpacesInTubeForUse[tempMoveTo][8];
					arrAllSpacesInTubeForUse[tempMoveTo][8] = null;
					arrAllSpacesInTubeForUse[tempMoveTo][9] = null;
					arrAllSpacesInTubeForUse[toOther][8] = null;
					arrAllSpacesInTubeForUse[toOther][9] = null;
				  }else if(arrAllSpacesInTubeForUse[tempMoveTo][9] != null){
					toOther = arrAllSpacesInTubeForUse[tempMoveTo][9];
					arrAllSpacesInTubeForUse[tempMoveTo][8] = null;
					arrAllSpacesInTubeForUse[tempMoveTo][9] = null;
					arrAllSpacesInTubeForUse[toOther][8] = null;
					arrAllSpacesInTubeForUse[toOther][9] = null;
				  }
				  // Update array - [8] - 'last received from'
				  arrAllSpacesInTubeForUse[tempMoveTo][8] = tempMoveFrom;
				  // Update array - [9] - 'last moved to'
				  arrAllSpacesInTubeForUse[tempMoveFrom][9] = tempMoveTo;
				  // Update array - [10] - 'Dumb Step 3' reset
				  arrAllSpacesInTubeForUse[tempMoveFrom][10] = null;
				  arrAllSpacesInTubeForUse[tempMoveTo][10] = null;
				  for(let i = 0; i < totalCol; i++){
					  if(arrAllSpacesInTubeForUse[i][10] == tempMoveFrom || arrAllSpacesInTubeForUse[i][10] == tempMoveTo){
						  arrAllSpacesInTubeForUse[i][10] = null;
					  }
				  }
				  // Update array - [10] - 'Dumb Step 3' marking
				  if(previousStepCount > 0){ // ignore 1st step
					  if(arrCurrentSteps[previousStepCount][3].length > 1){
						  for(let i = 1; i < arrCurrentSteps[previousStepCount][3].length; i++){
							  if(arrCurrentSteps[previousStepCount][3][i][1] == tempMoveFrom){
								  var markDumb3 = arrCurrentSteps[previousStepCount][3][i][2];
								  arrAllSpacesInTubeForUse[markDumb3][10] = tempMoveTo;
							  }
						  }
					  }
				  }
				  
				  // (2.) Update the step (Mark & Delete)
				  arrCurrentSteps[previousStepCount][1] = tempMoveFrom;
				  arrCurrentSteps[previousStepCount][2] = tempMoveTo;
				  arrCurrentSteps[previousStepCount][3].splice(0,1);
				  // (3.) Update the MasterHistory
				  var MHLength = arrMasterHistory.length;
				  arrMasterHistory[MHLength] = [];
				  for(let i = 0; i < totalCol; i++){ // Create tempAllSpaces (corrected)
					  arrMasterHistory[MHLength][i] = [];
					  for(let j = 0; j < 11; j++){
						  arrMasterHistory[MHLength][i][j] = arrAllSpacesInTubeForUse[i][j];
					  }
				  }
				  // Update Number Of Move Performed
				  numberOfExtraMovesPerformed += 1;
				  //deBugTextShow(); //**********************************************************************************
				  
				  // end the movebackloop
				  keepMovingBackward = false;
			  }
		  }
		  continue ContinueSolvingloop; // Include this line ONLY WHEN stepCount >=
	  }
	  
	  // 4.2. Set arrTempCheckNearlyPerfect to check 'nearly perfect' case. If found, move them first

      // 4.2.1. Check the number of 'same color but not perfect' before creating arrTempCheckNearlyPerfect
      var needToCheckPerfect = 0;
      for(let i = 0; i < totalCol; i++){ // Check each tube if they are 'same color but not perfect'
        if(arrAllSpacesInTubeForUse[i][4] != 0 && arrAllSpacesInTubeForUse[i][4] < 4 && arrAllSpacesInTubeForUse[i][6] == 0){
          needToCheckPerfect += 1;
        }
      }
      // 4.2.2. Create arrTempCheckNearlyPerfect when number of 'same color but not perfect' > 1
      if(needToCheckPerfect > 1){
        arrTempCheckNearlyPerfect.length = 0; // Reset every time before creating it
        for(let i = 0; i < totalCol-emptyCol; i++){ // Create 0 in the 0th & 1th place in the array
          arrTempCheckNearlyPerfect[i] = [];
          arrTempCheckNearlyPerfect[i][0] = 0; // Default value for number of 'nearly perfect' for each color
        }

        arrTempCheckNearlyPerfect[totalCol-emptyCol] = []; // Last position of this array = (color -1) with more than 1 'nearly perfect'
        
		var maxBall = [];
		for(let i = 0; i < totalCol - emptyCol; i++){
			maxBall[i] = 0;
		}
        // Now check & create arrTempCheckNearlyPerfect
        for(let i = 0; i < totalCol; i++){ // Loop all columns
          if(arrAllSpacesInTubeForUse[i][4] != 0 && arrAllSpacesInTubeForUse[i][4] < 4 && arrAllSpacesInTubeForUse[i][6] == 0){ // if the (i)th tube is nearly perfect
            var tempArrLength = arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)].length;
            arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][0] += 1; // arrTempCheckNearlyPerfect[color - 1][0 = number of 'nearly perfect', 1 = first tube, 2+ = rest of them] && arrTempCheckNearlyPerfect[totalCol-emptyCol] = color(s) with more than 1 'nearly perfect'
            arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][tempArrLength] = i; // Record tube position to [1+]
		  if(arrAllSpacesInTubeForUse[i][4] > maxBall[(arrAllSpacesInTubeForUse[i][5]-1)]){
				maxBall[(arrAllSpacesInTubeForUse[i][5]-1)] = arrAllSpacesInTubeForUse[i][4];
				if(arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][0] > 1){
					var tempOldMax = arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][1];
					var tempNewMax = arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)].length-1];
					arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][1] = tempNewMax;
					arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)].length-1] = tempOldMax;
				}
			}
            if(arrTempCheckNearlyPerfect[(arrAllSpacesInTubeForUse[i][5]-1)][0] == 2){ // Record the (color -1) to the last position of arrTempCheckNearlyPerfect[] array
              var tempArrLengthOutter = arrTempCheckNearlyPerfect[totalCol-emptyCol].length;
              arrTempCheckNearlyPerfect[totalCol-emptyCol][tempArrLengthOutter] = (arrAllSpacesInTubeForUse[i][5]-1); // Mark the color (color-1) to the last position of arrTempCheckNearlyPerfect[totalCol-emptyCol]
            }
          }
        }
        // 4.2.3. Move - when NearlyPerfect exists
        if(arrTempCheckNearlyPerfect[totalCol-emptyCol].length > 0){
			// Write a for-loop to do all the nearly perfect tubes
			for(let i = 0; i < arrTempCheckNearlyPerfect[totalCol-emptyCol].length; i++){
				var tempCurrentSameColor = arrTempCheckNearlyPerfect[totalCol-emptyCol][i]; // (Color -1)
				for(let j = 2; j < arrTempCheckNearlyPerfect[tempCurrentSameColor].length; j++){
					var tempCurrentSameTo = arrTempCheckNearlyPerfect[tempCurrentSameColor][1];
					var tempCurrentSameFrom = arrTempCheckNearlyPerfect[tempCurrentSameColor][j];
					var tempCurrentSameToNumOfBall = arrAllSpacesInTubeForUse[tempCurrentSameTo][4];
					var tempCurrentSameFromNumOfBall = arrAllSpacesInTubeForUse[tempCurrentSameFrom][4];
					var tempRealColor = arrAllSpacesInTubeForUse[tempCurrentSameFrom][5];
					for(let k = 0; k < tempCurrentSameFromNumOfBall; k++){
						arrAllSpacesInTubeForUse[tempCurrentSameFrom][tempCurrentSameFromNumOfBall-1-k] = 0; // Removing the last tube ball
						arrAllSpacesInTubeForUse[tempCurrentSameTo][tempCurrentSameToNumOfBall+k] = tempRealColor; // Adding the ball to the first tube
						
						// Update array - [4] - Number Of Balls
						arrAllSpacesInTubeForUse[tempCurrentSameFrom][4] += -1;
						arrAllSpacesInTubeForUse[tempCurrentSameTo][4] += 1;
						
						// Update array - [5] - Top Ball Color
						if(arrAllSpacesInTubeForUse[tempCurrentSameFrom][4] == 0){
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][5] = 0;
						}
						
						// Update array - [6] : N/A
						// Update array - [7] - Show 1 if it is a Perfect Tube
						if(arrAllSpacesInTubeForUse[tempCurrentSameTo][4] == 4){
							arrAllSpacesInTubeForUse[tempCurrentSameTo][7] = 1;
						}
						
						// Reset Before Updating [8] & [9]
						var fromOther;
						var toOther;
						// From
						if(arrAllSpacesInTubeForUse[tempCurrentSameFrom][8] != null){
							fromOther = arrAllSpacesInTubeForUse[tempCurrentSameFrom][8];
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][8] = null;
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][9] = null;
							arrAllSpacesInTubeForUse[fromOther][8] = null;
							arrAllSpacesInTubeForUse[fromOther][9] = null;
						}else if(arrAllSpacesInTubeForUse[tempCurrentSameFrom][9] != null){
							fromOther = arrAllSpacesInTubeForUse[tempCurrentSameFrom][9];
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][8] = null;
							arrAllSpacesInTubeForUse[tempCurrentSameFrom][9] = null;
							arrAllSpacesInTubeForUse[fromOther][8] = null;
							arrAllSpacesInTubeForUse[fromOther][9] = null;
						}
						// To
						if(arrAllSpacesInTubeForUse[tempCurrentSameTo][8] != null){
							toOther = arrAllSpacesInTubeForUse[tempCurrentSameTo][8];
							arrAllSpacesInTubeForUse[tempCurrentSameTo][8] = null;
							arrAllSpacesInTubeForUse[tempCurrentSameTo][9] = null;
							arrAllSpacesInTubeForUse[toOther][8] = null;
							arrAllSpacesInTubeForUse[toOther][9] = null;
						}else if(arrAllSpacesInTubeForUse[tempCurrentSameTo][9] != null){
							toOther = arrAllSpacesInTubeForUse[tempCurrentSameTo][9];
							arrAllSpacesInTubeForUse[tempCurrentSameTo][8] = null;
							arrAllSpacesInTubeForUse[tempCurrentSameTo][9] = null;
							arrAllSpacesInTubeForUse[toOther][8] = null;
							arrAllSpacesInTubeForUse[toOther][9] = null;
						}
						// Update array - [8] - 'last received from'
						arrAllSpacesInTubeForUse[tempCurrentSameTo][8] = tempCurrentSameFrom;
						// Update array - [9] - 'last moved to'
						arrAllSpacesInTubeForUse[tempCurrentSameFrom][9] = tempCurrentSameTo;
						// Update array - [10] - 'Dumb Step 3' reset
						arrAllSpacesInTubeForUse[tempCurrentSameFrom][10] = null;
						arrAllSpacesInTubeForUse[tempCurrentSameTo][10] = null;
						for(let m = 0; m < totalCol; m++){
							if(arrAllSpacesInTubeForUse[m][10] == tempCurrentSameFrom || arrAllSpacesInTubeForUse[m][10] == tempCurrentSameTo){
								arrAllSpacesInTubeForUse[m][10] = null;
							}
						}
						
						// Record Steps
						var stepLength = arrCurrentSteps.length;
						arrCurrentSteps[stepLength] = []; // arrCurrentSteps: [0] show 1 if it is a MUST step, [1] = 'from', [2] = 'to', [3] = arrays of [color (show -1 if to is empty), from, to]***a MUST step do not have [3]***
						arrCurrentSteps[stepLength][0] = 1;
						arrCurrentSteps[stepLength][1] = tempCurrentSameFrom;
						arrCurrentSteps[stepLength][2] = tempCurrentSameTo;
						
						// Update MasterHistory
						var MHLength = arrMasterHistory.length;
						arrMasterHistory[MHLength] = [];
						for(let m = 0; m < totalCol; m++){ // Create tempAllSpaces (corrected)
							arrMasterHistory[MHLength][m] = [];
						    for(let n = 0; n < 11; n++){
								arrMasterHistory[MHLength][m][n] = arrAllSpacesInTubeForUse[m][n];
							}
						}
						
						// Update Number Of Move Performed
						numberOfExtraMovesPerformed += 1;
						//deBugTextShow(); //**********************************************************************************
						
						if(i == arrTempCheckNearlyPerfect[totalCol-emptyCol].length - 1 && j == arrTempCheckNearlyPerfect[tempCurrentSameColor].length - 1 && k == tempCurrentSameFromNumOfBall - 1){
							continue ContinueSolvingloop;
						}
					}
				}

			}
		  
        }
      }
	  
	  // 2nd MUST steps: 'From: 4 balls not perfect --> To: nearly perfect && results = perfect'
	  // check again, because last step moved
      var arrNeedToCheckPerfect2 = [];
      for(let i = 0; i < totalCol; i++){ // Check each tube if they are 'same color but not perfect'
        if(arrAllSpacesInTubeForUse[i][4] != 0 && arrAllSpacesInTubeForUse[i][4] < 4 && arrAllSpacesInTubeForUse[i][6] == 0){
			var tempLengthCheck = arrNeedToCheckPerfect2.length;
			arrNeedToCheckPerfect2[tempLengthCheck] = [];
			arrNeedToCheckPerfect2[tempLengthCheck][0] = arrAllSpacesInTubeForUse[i][5]; // arrNeedToCheckPerfect2[tempLengthCheck]: 0 = color, 1 = position
			arrNeedToCheckPerfect2[tempLengthCheck][1] = i;
		}
      }
	  
	  if(arrNeedToCheckPerfect2.length > 0){
		  for(let i = 0; i < arrNeedToCheckPerfect2.length; i++){
			  var tempColor = arrNeedToCheckPerfect2[i][0];
			  var tempTo = arrNeedToCheckPerfect2[i][1];
			  var arrAllSameColor = []; // arrAllSameColor[i]: 0 = position of 'from', 1 = number of same color ball from top
			  for(let j = 0; j < totalCol; j++){
				  if(j != tempTo && arrAllSpacesInTubeForUse[j][5] == tempColor){
					  var tempFromNum = 0;
					  var topNum = arrAllSpacesInTubeForUse[j][4];
					  CountingLoop:
					  for(let k = 0; k < topNum; k++){
						  if(arrAllSpacesInTubeForUse[j][topNum-1-k] == tempColor){
							  tempFromNum += 1;
						  }else{break CountingLoop;}
					  }
					  var totalSameColor = arrAllSameColor.length;
					  arrAllSameColor[totalSameColor] = [];
					  arrAllSameColor[totalSameColor][0] = j;
					  arrAllSameColor[totalSameColor][1] = tempFromNum;
				  }
			  }
			  // Check if sum of tempFromNum == 4
			  if(arrAllSameColor.length == 0){
				  // Skip no results
			  }else{
				  var tempSum = 0;
				  for(let j = 0; j < arrAllSameColor.length; j++){
					  tempSum += arrAllSameColor[j][1];
				  }
				  if(tempSum + arrAllSpacesInTubeForUse[tempTo][4] == 4){ // Perfect case, move
					  for(let j = 0; j < arrAllSameColor.length; j++){
						  var numOfBallToMove = arrAllSameColor[j][1];
						  var currentFrom = arrAllSameColor[j][0];
						  var numOfBallFrom = arrAllSpacesInTubeForUse[currentFrom][4];
						  var numOfBallTo = arrAllSpacesInTubeForUse[tempTo][4];
						  var tempRealColor = arrAllSpacesInTubeForUse[currentFrom][5];
						  // Loop for moving
						  for(let k = 0; k < numOfBallToMove; k++){
							  arrAllSpacesInTubeForUse[currentFrom][numOfBallFrom-1-k] = 0; // Removing the ball
							  arrAllSpacesInTubeForUse[tempTo][numOfBallTo+k] = tempRealColor; // Adding the ball
							  // Update array - [4] - Number Of Balls
							  arrAllSpacesInTubeForUse[currentFrom][4] += -1;
							  arrAllSpacesInTubeForUse[tempTo][4] += 1;
							  // Update array - [5] - Top Ball Color
							  if(arrAllSpacesInTubeForUse[currentFrom][4] == 0){
								  arrAllSpacesInTubeForUse[currentFrom][5] = 0;
							  }else{
								  arrAllSpacesInTubeForUse[currentFrom][5] = arrAllSpacesInTubeForUse[currentFrom][arrAllSpacesInTubeForUse[currentFrom][4]-1];
							  }
							  // Update array - [6] : Same Color Check (empty / same : 0, else > 0) - this case: 'from' only
							  arrAllSpacesInTubeForUse[currentFrom][6] = 0; // Reset as 0
							  if(arrAllSpacesInTubeForUse[currentFrom][4] == 0){
								  arrAllSpacesInTubeForUse[currentFrom][6] = 0;
							  }else{
								  var tempCount = arrAllSpacesInTubeForUse[currentFrom][4];
								  for(let m = 0; m < arrAllSpacesInTubeForUse[currentFrom][4]; m++){
									  if(arrAllSpacesInTubeForUse[currentFrom][m] != arrAllSpacesInTubeForUse[currentFrom][0]){
										  tempCount = m;
										  break;
									  }
								  }
								  arrAllSpacesInTubeForUse[currentFrom][6] = arrAllSpacesInTubeForUse[currentFrom][4] - tempCount;
							  }
							  // Update array - [7] - Show 1 if it is a Perfect Tube
							  if(arrAllSpacesInTubeForUse[tempTo][4] == 4){
								  arrAllSpacesInTubeForUse[tempTo][7] = 1;
							  }
							  // Reset Before Updating [8] & [9]
							  var fromOther;
							  var toOther;
							  // From
							  if(arrAllSpacesInTubeForUse[currentFrom][8] != null){
							  	fromOther = arrAllSpacesInTubeForUse[currentFrom][8];
							  	arrAllSpacesInTubeForUse[currentFrom][8] = null;
							  	arrAllSpacesInTubeForUse[currentFrom][9] = null;
							  	arrAllSpacesInTubeForUse[fromOther][8] = null;
							  	arrAllSpacesInTubeForUse[fromOther][9] = null;
							  }else if(arrAllSpacesInTubeForUse[currentFrom][9] != null){
							  	fromOther = arrAllSpacesInTubeForUse[currentFrom][9];
							  	arrAllSpacesInTubeForUse[currentFrom][8] = null;
							  	arrAllSpacesInTubeForUse[currentFrom][9] = null;
							  	arrAllSpacesInTubeForUse[fromOther][8] = null;
							  	arrAllSpacesInTubeForUse[fromOther][9] = null;
							  }
							  // To
							  if(arrAllSpacesInTubeForUse[tempTo][8] != null){
							  	toOther = arrAllSpacesInTubeForUse[tempTo][8];
							  	arrAllSpacesInTubeForUse[tempTo][8] = null;
							  	arrAllSpacesInTubeForUse[tempTo][9] = null;
							  	arrAllSpacesInTubeForUse[toOther][8] = null;
							  	arrAllSpacesInTubeForUse[toOther][9] = null;
							  }else if(arrAllSpacesInTubeForUse[tempTo][9] != null){
							  	toOther = arrAllSpacesInTubeForUse[tempTo][9];
							  	arrAllSpacesInTubeForUse[tempTo][8] = null;
							  	arrAllSpacesInTubeForUse[tempTo][9] = null;
							  	arrAllSpacesInTubeForUse[toOther][8] = null;
							  	arrAllSpacesInTubeForUse[toOther][9] = null;
							  }
							  // Update array - [8] - 'last received from'
							  arrAllSpacesInTubeForUse[tempTo][8] = currentFrom;
							  // Update array - [9] - 'last moved to'
							  arrAllSpacesInTubeForUse[currentFrom][9] = tempTo;
							  // Update array - [10] - 'Dumb Step 3' reset
							  arrAllSpacesInTubeForUse[currentFrom][10] = null;
							  arrAllSpacesInTubeForUse[tempTo][10] = null;
							  for(let m = 0; m < totalCol; m++){
								  if(arrAllSpacesInTubeForUse[m][10] == currentFrom || arrAllSpacesInTubeForUse[m][10] == tempTo){
									  arrAllSpacesInTubeForUse[m][10] = null;
								  }
							  }
							  
							  // Record Steps
							  var stepLength = arrCurrentSteps.length;
							  arrCurrentSteps[stepLength] = []; // arrCurrentSteps: [0] show 1 if it is a MUST step, [1] = 'from', [2] = 'to', [3] = arrays of [color (show -1 if to is empty), from, to]***a MUST step do not have [3]***
							  arrCurrentSteps[stepLength][0] = 1;
							  arrCurrentSteps[stepLength][1] = currentFrom;
							  arrCurrentSteps[stepLength][2] = tempTo;
							  // Update MasterHistory
							  var MHLength = arrMasterHistory.length;
							  arrMasterHistory[MHLength] = [];
							  for(let m = 0; m < totalCol; m++){ // Create tempAllSpaces
								  arrMasterHistory[MHLength][m] = [];
								  for(let n = 0; n < 11; n++){
									  arrMasterHistory[MHLength][m][n] = arrAllSpacesInTubeForUse[m][n];
								  }
							  }
							  // Update Number Of Move Performed
							  numberOfExtraMovesPerformed += 1;
							  //deBugTextShow(); //**********************************************************************************
							  
							  // Continue the loop
							  if(j == arrAllSameColor.length - 1 && k == numOfBallToMove - 1){
								  continue ContinueSolvingloop;
							  }
						  }
					  }
				  }
			  }
		  }
	  }
	  
	  
	  // Check Deadend / Semi-Deadend (Create arrPreviousSteps when Semi-Deadend is reached)
	  // 4.3. Read Previous Step and Move
	  // 4.3.1. Check Semi-Deadend (and Deadend)
	  // 4.3.1.1. Check Empty Tubes
	  var arrTempFromColorCheck = []; // arrTempFromColorCheck: [0] = number of top balls in color (i+1) exclude perfect tubes, [1] = number of 'Same Top Color Balls && < 4', [2] = show 1 if it is available (i.e. not a 'deadend color')
	  var tempEmptyCount = 0;
	  for(let i = 0; i < totalCol; i++){ // Count Number of Empty Tubes
		  if(arrAllSpacesInTubeForUse[i][4] == 0){
			  tempEmptyCount += 1;
		  }
	  }
	  
	  if(tempEmptyCount == 0){ // 4.3.1.2. When tempEmptyCount == 0, Check Same Top Color Balls && < 4
		  for(let i = 0; i < totalCol; i++){ // Generate [0, 0, 0] in each column
			  arrTempFromColorCheck[i] = [0, 0, 0];
		  }
		  for(let i = 0; i < totalCol; i++){
			  if(arrAllSpacesInTubeForUse[i][7] == 0 && arrAllSpacesInTubeForUse[i][5] > 0){
				  arrTempFromColorCheck[arrAllSpacesInTubeForUse[i][5]-1][0] += 1; // Counting the number of top balls in color(i+1) exclude perfect tubes
				  if(arrAllSpacesInTubeForUse[i][4] < 4){ // Counting 'Same Top Color Balls && < 4'
				     arrTempFromColorCheck[arrAllSpacesInTubeForUse[i][5]-1][1] += 1;
				  }
			  }
		  }
		  // Now check Semi-Deadend based on arrTempFromColorCheck
		  var validColorNumber = 0;
		  for(let i = 0; i < totalCol-emptyCol; i++){ // Update color availability & Check the number of available color (Semi-Deadend if == 0)
			  if(arrTempFromColorCheck[i][0] > 1 && arrTempFromColorCheck[i][1] > 0){
				  arrTempFromColorCheck[i][2] += 1;
				  validColorNumber += 1;
			  }
		  }
		  if(validColorNumber == 0){ // 4.3.1.2.1. Handling Semi-Deadend & Deadend
			  // Read MasterHistory & do amendment (1. go back to previous state 2. delete last step)
			  // 4.3.1.2.1.1. Restore to previous state AND Move
			  var keepMovingBackward = true;
			  while(keepMovingBackward == true){
				  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
				  // Check if true Deadend
				  if(previousStepCount < 0){
					  finalEndState = true;
					  break ContinueSolvingloop;
				  }
				  // Now restore to previous state
				  for(let i = 0; i < totalCol; i++){
					  for(let j = 0; j < 11; j++){
						  arrAllSpacesInTubeForUse[i][j] = arrMasterHistory[previousStepCount][i][j];
					  }
				  }
				  
				  
				  numberOfExtraBackwardMoves += 1;
				  
				  
				  // Update MasterHistory
				  arrMasterHistory.splice(previousStepCount+1,1);
				  // See if it still needs to 'keepMovingBackward == true' OR Move & Update Steps
				  if(arrCurrentSteps[previousStepCount][0] == 1){ // keepMovingBackward is needed (MUST step)
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else if(arrCurrentSteps[previousStepCount].length == 3){
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else if(arrCurrentSteps[previousStepCount][3].length == 0){
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else{ // No need to go back, now Move & Update Steps
					  // (1.) Move
					  var tempMoveFrom = arrCurrentSteps[previousStepCount][3][0][1];
					  var tempMoveTo = arrCurrentSteps[previousStepCount][3][0][2];
					  var tempMoveColor = arrAllSpacesInTubeForUse[tempMoveFrom][5];
					  var tempMoveFromNumOfBall = arrAllSpacesInTubeForUse[tempMoveFrom][4];
					  var tempMoveToNumOfBall = arrAllSpacesInTubeForUse[tempMoveTo][4];
					  // (1.1) Update Balls
					  arrAllSpacesInTubeForUse[tempMoveFrom][tempMoveFromNumOfBall-1] = 0;
					  arrAllSpacesInTubeForUse[tempMoveTo][tempMoveToNumOfBall] = tempMoveColor;
					  // (1.2) Update array - [4] - Number Of Balls
					  arrAllSpacesInTubeForUse[tempMoveFrom][4] -= 1;
					  arrAllSpacesInTubeForUse[tempMoveTo][4] += 1;
					  // (1.3) Update array - [5] - Top Ball Color
					  if(arrAllSpacesInTubeForUse[tempMoveFrom][4] == 0){
						  arrAllSpacesInTubeForUse[tempMoveFrom][5] = 0;
					  }else{
						  arrAllSpacesInTubeForUse[tempMoveFrom][5] = arrAllSpacesInTubeForUse[tempMoveFrom][arrAllSpacesInTubeForUse[tempMoveFrom][4]-1];
					  }
					  arrAllSpacesInTubeForUse[tempMoveTo][5] = tempMoveColor;
					  // (1.4) Update array - [6] - Same Color Check (empty / same : 0, else > 0)
					  arrAllSpacesInTubeForUse[tempMoveFrom][6] = 0; // Reset as 0
					  arrAllSpacesInTubeForUse[tempMoveTo][6] = 0; // Reset as 0
					  // From
					  if(arrAllSpacesInTubeForUse[tempMoveFrom][4] == 0){
						  arrAllSpacesInTubeForUse[tempMoveFrom][6] = 0;
					  }else{
						  var tempCount = arrAllSpacesInTubeForUse[tempMoveFrom][4];
						  for(let i = 0; i < arrAllSpacesInTubeForUse[tempMoveFrom][4]; i++){
							  if(arrAllSpacesInTubeForUse[tempMoveFrom][i] != arrAllSpacesInTubeForUse[tempMoveFrom][0]){
								  tempCount = i;
								  break;
							  }
						  }
						  arrAllSpacesInTubeForUse[tempMoveFrom][6] = arrAllSpacesInTubeForUse[tempMoveFrom][4] - tempCount;
					  }
					  // To
					  if(arrAllSpacesInTubeForUse[tempMoveTo][4] == 0){
						  arrAllSpacesInTubeForUse[tempMoveTo][6] = 0;
					  }else{
						  var tempCount = arrAllSpacesInTubeForUse[tempMoveTo][4];
						  for(let i = 0; i < arrAllSpacesInTubeForUse[tempMoveTo][4]; i++){
							  if(arrAllSpacesInTubeForUse[tempMoveTo][i] != arrAllSpacesInTubeForUse[tempMoveTo][0]){
								  tempCount = i;
								  break;
							  }
						  }
						  arrAllSpacesInTubeForUse[tempMoveTo][6] = arrAllSpacesInTubeForUse[tempMoveTo][4] - tempCount;
					  }
					  // (1.5) Update array - [7] - Show 1 if it is a Perfect Tube
					  if(arrAllSpacesInTubeForUse[tempMoveTo][6] == 0 && arrAllSpacesInTubeForUse[tempMoveTo][4] == 4){
						  arrAllSpacesInTubeForUse[tempMoveTo][7] = 1;
					  }
					  // Reset Before Updating [8] & [9]
					  var fromOther;
					  var toOther;
					  // From
					  if(arrAllSpacesInTubeForUse[tempMoveFrom][8] != null){
						fromOther = arrAllSpacesInTubeForUse[tempMoveFrom][8];
						arrAllSpacesInTubeForUse[tempMoveFrom][8] = null;
						arrAllSpacesInTubeForUse[tempMoveFrom][9] = null;
						arrAllSpacesInTubeForUse[fromOther][8] = null;
						arrAllSpacesInTubeForUse[fromOther][9] = null;
					  }else if(arrAllSpacesInTubeForUse[tempMoveFrom][9] != null){
						fromOther = arrAllSpacesInTubeForUse[tempMoveFrom][9];
						arrAllSpacesInTubeForUse[tempMoveFrom][8] = null;
						arrAllSpacesInTubeForUse[tempMoveFrom][9] = null;
						arrAllSpacesInTubeForUse[fromOther][8] = null;
						arrAllSpacesInTubeForUse[fromOther][9] = null;
					  }
					  // To
					  if(arrAllSpacesInTubeForUse[tempMoveTo][8] != null){
						toOther = arrAllSpacesInTubeForUse[tempMoveTo][8];
						arrAllSpacesInTubeForUse[tempMoveTo][8] = null;
						arrAllSpacesInTubeForUse[tempMoveTo][9] = null;
						arrAllSpacesInTubeForUse[toOther][8] = null;
						arrAllSpacesInTubeForUse[toOther][9] = null;
					  }else if(arrAllSpacesInTubeForUse[tempMoveTo][9] != null){
						toOther = arrAllSpacesInTubeForUse[tempMoveTo][9];
						arrAllSpacesInTubeForUse[tempMoveTo][8] = null;
						arrAllSpacesInTubeForUse[tempMoveTo][9] = null;
						arrAllSpacesInTubeForUse[toOther][8] = null;
						arrAllSpacesInTubeForUse[toOther][9] = null;
					  }
					  // Update array - [8] - 'last received from'
					  arrAllSpacesInTubeForUse[tempMoveTo][8] = tempMoveFrom;
					  // Update array - [9] - 'last moved to'
					  arrAllSpacesInTubeForUse[tempMoveFrom][9] = tempMoveTo;
					  // Update array - [10] - 'Dumb Step 3' reset
					  arrAllSpacesInTubeForUse[tempMoveFrom][10] = null;
					  arrAllSpacesInTubeForUse[tempMoveTo][10] = null;
					  for(let i = 0; i < totalCol; i++){
						  if(arrAllSpacesInTubeForUse[i][10] == tempMoveFrom || arrAllSpacesInTubeForUse[i][10] == tempMoveTo){
							  arrAllSpacesInTubeForUse[i][10] = null;
						  }
					  }
					  // Update array - [10] - 'Dumb Step 3' marking
					  if(previousStepCount > 0){ // ignore 1st step
						  if(arrCurrentSteps[previousStepCount][3].length > 1){
							  for(let i = 1; i < arrCurrentSteps[previousStepCount][3].length; i++){
								  if(arrCurrentSteps[previousStepCount][3][i][1] == tempMoveFrom){
									  var markDumb3 = arrCurrentSteps[previousStepCount][3][i][2];
									  arrAllSpacesInTubeForUse[markDumb3][10] = tempMoveTo;
								  }
							  }
						  }
					  }
					  
					  // (2.) Update the step (Mark & Delete)
					  arrCurrentSteps[previousStepCount][1] = tempMoveFrom;
					  arrCurrentSteps[previousStepCount][2] = tempMoveTo;
					  arrCurrentSteps[previousStepCount][3].splice(0,1);
					  // (3.) Update the MasterHistory
					  var MHLength = arrMasterHistory.length;
					  arrMasterHistory[MHLength] = [];
					  for(let i = 0; i < totalCol; i++){ // Create tempAllSpaces (corrected)
						  arrMasterHistory[MHLength][i] = [];
						  for(let j = 0; j < 11; j++){
							  arrMasterHistory[MHLength][i][j] = arrAllSpacesInTubeForUse[i][j];
						  }
					  }
					  // Update Number Of Move Performed
					  numberOfExtraMovesPerformed += 1;
					  //deBugTextShow(); //**********************************************************************************
					  
					  // end the movebackloop
					  keepMovingBackward = false;
				  }
			  }
		  }else{ // 4.3.1.2.2. No Semi-Deadend, continue solving
			  // Now Check available tubes - Create arrCurrentSteps[3][0,1,2]
			  // Create All Choices Before Taking A Step (Delete Loop Choices)
			  var arrColorCheck = []; // arrColorCheck[i][0,1,2] = [color (show -1 if to is empty), from, to]
			  var tempColorAvailableCount = []; // tempColorAvailableCount[i][total top (not perfect), total 'to']
			  
			  // Check Color First
			  for(let i = 0; i < totalCol-emptyCol; i++){
				  tempColorAvailableCount[i] = [0, 0];
				  for(let j = 0; j < totalCol; j++){
					  if(arrAllSpacesInTubeForUse[j][7] == 0 && arrAllSpacesInTubeForUse[j][5] - 1 == i){
						  tempColorAvailableCount[i][0] += 1;
						  if(arrAllSpacesInTubeForUse[j][4] < 4){
							  tempColorAvailableCount[i][1] += 1;
						  }
					  }
				  }
			  }
			  
			  
			  // Now Create arrColorCheck (without -1 : empty)
			  for(let i = 0; i < totalCol; i++){
				  var tempCurrentColor = arrAllSpacesInTubeForUse[i][5];
				  if(arrAllSpacesInTubeForUse[i][7] == 0 && tempColorAvailableCount[tempCurrentColor - 1][0] > 1 && arrAllSpacesInTubeForUse[i][4] < 4){ // Find the 'to' first <-- this line no need to consider -1, coz this is 'no empty' case
					  for(let j = 0; j < totalCol; j++){ // 'From'
						  if(j != i && arrAllSpacesInTubeForUse[j][7] == 0 && arrAllSpacesInTubeForUse[i][5] == arrAllSpacesInTubeForUse[j][5]){
							  // Need to check if it is a loop case
							  var tempFutureState = [];
							  for(let k = 0; k < arrAllSpacesInTubeForUse.length; k++){
								  tempFutureState[k] = [];
								  for(let m = 0; m < 6; m++){
									  tempFutureState[k][m] = arrAllSpacesInTubeForUse[k][m];
								  }
							  }
							  var validFutureStep = true;
							  
							  // Perform the moves (0-4 only)
							  var dummyFrom = j;
							  var dummyTo = i;
							  var dummyFromNumBalls = tempFutureState[dummyFrom][4];
							  var dummyToNumBalls = tempFutureState[dummyTo][4];
							  var dummyColor = tempFutureState[dummyFrom][5];
							  tempFutureState[dummyFrom][dummyFromNumBalls-1] = 0;
							  tempFutureState[dummyTo][dummyToNumBalls] = dummyColor;
							  
							  // Check 'Interchange' dumb steps
							  if(arrAllSpacesInTubeForUse[dummyFrom][8] == dummyTo && arrAllSpacesInTubeForUse[dummyTo][9] == dummyFrom){
								  validFutureStep = false;
							  }
							  
							  // Check 'Dumb Step 3'
							  if(arrAllSpacesInTubeForUse[dummyTo][10] == dummyFrom){
								  validFutureStep = false;
							  }
							  
							  if(validFutureStep == true){
								  var tempCheckLength = arrMasterHistory.length;
								  LoopCheck1:
								  for(let k = 0; k < tempCheckLength; k++){
									  var diffCount = 0;
									  for(let m = 0; m < totalCol; m++){
										  for(let n = 0; n < 4; n++){
											  if(tempFutureState[m][n] != arrMasterHistory[k][m][n]){
												  diffCount += 1;
												  continue LoopCheck1;
											  }
										  }
									  }
									  if(diffCount == 0){
										  validFutureStep = false;
										  break LoopCheck1;
									  }
								  }
							  }
							  
							  if(validFutureStep == true){
								  var tempLength = arrColorCheck.length;
								  arrColorCheck[tempLength] = [];
								  arrColorCheck[tempLength][0] = arrAllSpacesInTubeForUse[i][5] - 1; // Color
								  arrColorCheck[tempLength][1] = j; // From
								  arrColorCheck[tempLength][2] = i; // To
							  }
						  }
					  }
				  }
			  }
			  
			  
			  // Set arrCurrentSteps[i][3] as arrColorCheck
			  var nextStepCount = arrCurrentSteps.length;
			  arrCurrentSteps[nextStepCount] = [];
			  arrCurrentSteps[nextStepCount][3] = [];
			  for(let i = 0; i < arrColorCheck.length; i++){
				  arrCurrentSteps[nextStepCount][3][i] = [];
				  for(let j = 0; j < arrColorCheck[i].length; j++){
					  arrCurrentSteps[nextStepCount][3][i][j] = arrColorCheck[i][j];
				  }
			  }
			  
			  // Check again if the 'Anti-LoopBack Mechanism' has made it a Semi-Deadend
			  if(arrColorCheck.length == 0){ // Semi-Deadend
				  // Delete the arrCurrentSteps[nextStepCount]
				  arrCurrentSteps.splice(nextStepCount,1);
				  // Go back
				  var keepMovingBackward = true;
				  while(keepMovingBackward == true){
					  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
					  // Check if true Deadend
					  if(previousStepCount < 0){
						  finalEndState = true;
						  break ContinueSolvingloop;
					  }
					  // Now restore to previous state
					  for(let i = 0; i < totalCol; i++){
						  for(let j = 0; j < 11; j++){
							  arrAllSpacesInTubeForUse[i][j] = arrMasterHistory[previousStepCount][i][j];
						  }
					  }
					  
					  
					  numberOfExtraBackwardMoves += 1;
					  nextStepCount -= 1;
					  
					  
					  // Update MasterHistory
					  arrMasterHistory.splice(previousStepCount+1,1);
					  // See if it still needs to 'keepMovingBackward == true' OR Move & Update Steps
					  if(arrCurrentSteps[previousStepCount][0] == 1){ // keepMovingBackward is needed (MUST step)
						  arrCurrentSteps.splice(previousStepCount,1);
					  }else if(arrCurrentSteps[previousStepCount].length == 3){
						  arrCurrentSteps.splice(previousStepCount,1);
					  }else if(arrCurrentSteps[previousStepCount][3].length == 0){
						  arrCurrentSteps.splice(previousStepCount,1);
					  }else{// end the movebackloop
						  keepMovingBackward = false;
					  }
				  }
			  }
			  
			  
			  // (1.) Now make a Move
			  var newMoveFrom = arrCurrentSteps[nextStepCount][3][0][1];
			  var newMoveTo = arrCurrentSteps[nextStepCount][3][0][2];
			  var newMoveFromNumBall = arrAllSpacesInTubeForUse[newMoveFrom][4];
			  var newMoveToNumBall = arrAllSpacesInTubeForUse[newMoveTo][4];
			  var newMoveColor = arrAllSpacesInTubeForUse[newMoveFrom][5];
			  // (1.1) Update Balls
			  arrAllSpacesInTubeForUse[newMoveFrom][newMoveFromNumBall-1] = 0;
			  arrAllSpacesInTubeForUse[newMoveTo][newMoveToNumBall] = newMoveColor;
			  // (1.2) Update array - [4] - Number Of Balls
			  arrAllSpacesInTubeForUse[newMoveFrom][4] -= 1;
			  arrAllSpacesInTubeForUse[newMoveTo][4] += 1;
			  // (1.3) Update array - [5] - Top Ball Color
			  if(arrAllSpacesInTubeForUse[newMoveFrom][4] == 0){
			  	arrAllSpacesInTubeForUse[newMoveFrom][5] = 0;
			  }else{
			  	arrAllSpacesInTubeForUse[newMoveFrom][5] = arrAllSpacesInTubeForUse[newMoveFrom][arrAllSpacesInTubeForUse[newMoveFrom][4]-1];
			  }
			  arrAllSpacesInTubeForUse[newMoveTo][5] = newMoveColor;
			  // (1.4) Update array - [6] - Same Color Check (empty / same : 0, else > 0)
			  arrAllSpacesInTubeForUse[newMoveFrom][6] = 0; // Reset as 0
			  arrAllSpacesInTubeForUse[newMoveTo][6] = 0; // Reset as 0
			  // From
			  if(arrAllSpacesInTubeForUse[newMoveFrom][4] == 0){
				  arrAllSpacesInTubeForUse[newMoveFrom][6] = 0;
			  }else{
				  var tempCount = arrAllSpacesInTubeForUse[newMoveFrom][4];
				  for(let i = 0; i < arrAllSpacesInTubeForUse[newMoveFrom][4]; i++){
					  if(arrAllSpacesInTubeForUse[newMoveFrom][i] != arrAllSpacesInTubeForUse[newMoveFrom][0]){
						  tempCount = i;
						  break;
					  }
				  }
				  arrAllSpacesInTubeForUse[newMoveFrom][6] = arrAllSpacesInTubeForUse[newMoveFrom][4] - tempCount;
			  }
			  // To
			  if(arrAllSpacesInTubeForUse[newMoveTo][4] == 0){
				  arrAllSpacesInTubeForUse[newMoveTo][6] = 0;
			  }else{
				  var tempCount = arrAllSpacesInTubeForUse[newMoveTo][4];
				  for(let i = 0; i < arrAllSpacesInTubeForUse[newMoveTo][4]; i++){
					  if(arrAllSpacesInTubeForUse[newMoveTo][i] != arrAllSpacesInTubeForUse[newMoveTo][0]){
						  tempCount = i;
						  break;
					  }
				  }
				  arrAllSpacesInTubeForUse[newMoveTo][6] = arrAllSpacesInTubeForUse[newMoveTo][4] - tempCount;
			  }
			  // (1.5) Update array - [7] - Show 1 if it is a Perfect Tube
			  if(arrAllSpacesInTubeForUse[newMoveTo][6] == 0 && arrAllSpacesInTubeForUse[newMoveTo][4] == 4){
				  arrAllSpacesInTubeForUse[newMoveTo][7] = 1;
			  }
			  // Reset Before Updating [8] & [9]
			  var fromOther;
			  var toOther;
			  // From
			  if(arrAllSpacesInTubeForUse[newMoveFrom][8] != null){
			  	fromOther = arrAllSpacesInTubeForUse[newMoveFrom][8];
			  	arrAllSpacesInTubeForUse[newMoveFrom][8] = null;
			  	arrAllSpacesInTubeForUse[newMoveFrom][9] = null;
			  	arrAllSpacesInTubeForUse[fromOther][8] = null;
			  	arrAllSpacesInTubeForUse[fromOther][9] = null;
			  }else if(arrAllSpacesInTubeForUse[newMoveFrom][9] != null){
			  	fromOther = arrAllSpacesInTubeForUse[newMoveFrom][9];
			  	arrAllSpacesInTubeForUse[newMoveFrom][8] = null;
			  	arrAllSpacesInTubeForUse[newMoveFrom][9] = null;
			  	arrAllSpacesInTubeForUse[fromOther][8] = null;
			  	arrAllSpacesInTubeForUse[fromOther][9] = null;
			  }
			  // To
			  if(arrAllSpacesInTubeForUse[newMoveTo][8] != null){
			  	toOther = arrAllSpacesInTubeForUse[newMoveTo][8];
			  	arrAllSpacesInTubeForUse[newMoveTo][8] = null;
			  	arrAllSpacesInTubeForUse[newMoveTo][9] = null;
			  	arrAllSpacesInTubeForUse[toOther][8] = null;
			  	arrAllSpacesInTubeForUse[toOther][9] = null;
			  }else if(arrAllSpacesInTubeForUse[newMoveTo][9] != null){
			  	toOther = arrAllSpacesInTubeForUse[newMoveTo][9];
			  	arrAllSpacesInTubeForUse[newMoveTo][8] = null;
			  	arrAllSpacesInTubeForUse[newMoveTo][9] = null;
			  	arrAllSpacesInTubeForUse[toOther][8] = null;
			  	arrAllSpacesInTubeForUse[toOther][9] = null;
			  }
			  // Update array - [8] - 'last received from'
			  arrAllSpacesInTubeForUse[newMoveTo][8] = newMoveFrom;
			  // Update array - [9] - 'last moved to'
			  arrAllSpacesInTubeForUse[newMoveFrom][9] = newMoveTo;
			  // Update array - [10] - 'Dumb Step 3' reset
			  arrAllSpacesInTubeForUse[newMoveFrom][10] = null;
			  arrAllSpacesInTubeForUse[newMoveTo][10] = null;
			  for(let i = 0; i < totalCol; i++){
				  if(arrAllSpacesInTubeForUse[i][10] == newMoveFrom || arrAllSpacesInTubeForUse[i][10] == newMoveTo){
					  arrAllSpacesInTubeForUse[i][10] = null;
				  }
			  }
			  // Update array - [10] - 'Dumb Step 3' marking
			  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
			  if(previousStepCount > 0){ // ignore 1st step
				  if(arrCurrentSteps[previousStepCount][3].length > 1){
					  for(let i = 1; i < arrCurrentSteps[previousStepCount][3].length; i++){
						  if(arrCurrentSteps[previousStepCount][3][i][1] == newMoveFrom){
							  var markDumb3 = arrCurrentSteps[previousStepCount][3][i][2];
							  arrAllSpacesInTubeForUse[markDumb3][10] = newMoveTo;
						  }
					  }
				  }
			  }
			  
			  // (2.) Update the step (Mark & Delete)
			  arrCurrentSteps[nextStepCount][0] = 0;
			  arrCurrentSteps[nextStepCount][1] = newMoveFrom;
			  arrCurrentSteps[nextStepCount][2] = newMoveTo;
			  arrCurrentSteps[nextStepCount][3].splice(0,1);
			  // (3.) Update the MasterHistory
			  var MHLength = arrMasterHistory.length;
			  arrMasterHistory[MHLength] = [];
			  for(let i = 0; i < totalCol; i++){ // Create tempAllSpaces (corrected)
				  arrMasterHistory[MHLength][i] = [];
				  for(let j = 0; j < 11; j++){
					  arrMasterHistory[MHLength][i][j] = arrAllSpacesInTubeForUse[i][j];
				  }
			  }
			  // Update Number Of Move Performed
			  numberOfExtraMovesPerformed += 1;
			  //deBugTextShow(); //**********************************************************************************
			  
		  }
	  }else{ // 4.3.1.3. When tempEmptyCount > 0 (there are empty tube(s))
		  // ***Basically very similar to previous case, be aware of empty tube cases***
		  var arrColorCheck = []; // arrColorCheck[i][0,1,2] = [color (show -1 if to is empty), from, to]
		  var tempColorAvailableCount = []; // tempColorAvailableCount[i][total top (not perfect), total 'to'], where i = color -1
		  
		  // Check Color First
		  for(let i = 0; i < totalCol-emptyCol; i++){
			  tempColorAvailableCount[i] = [0, 0];
			  for(let j = 0; j < totalCol; j++){
				  if(arrAllSpacesInTubeForUse[j][7] == 0 && arrAllSpacesInTubeForUse[j][5] - 1 == i){
					  tempColorAvailableCount[i][0] += 1;
					  if(arrAllSpacesInTubeForUse[j][4] < 4){
						  tempColorAvailableCount[i][1] += 1;
					  }
				  }
			  }
		  }
		  
		  
		  // Now Create arrColorCheck (without -1 : empty)
		  for(let i = 0; i < totalCol; i++){
			  var tempCurrentColor = arrAllSpacesInTubeForUse[i][5];
			  if(arrAllSpacesInTubeForUse[i][4] == 0){
				  // Skip empty tubes
			  }else if(arrAllSpacesInTubeForUse[i][7] == 0 && tempColorAvailableCount[tempCurrentColor - 1][0] > 1 && arrAllSpacesInTubeForUse[i][4] < 4){ // Find the 'to' first <-- this line no need to consider -1, see 'empty' case below
				  for(let j = 0; j < totalCol; j++){ // 'From'
					  if(j != i && arrAllSpacesInTubeForUse[j][7] == 0 && arrAllSpacesInTubeForUse[i][5] == arrAllSpacesInTubeForUse[j][5]){
						  // Need to check if it is a loop case
						  var tempFutureState = [];
						  for(let k = 0; k < arrAllSpacesInTubeForUse.length; k++){
							  tempFutureState[k] = [];
							  for(let m = 0; m < 6; m++){
								  tempFutureState[k][m] = arrAllSpacesInTubeForUse[k][m];
							  }
						  }
						  var validFutureStep = true;
						  
						  // Perform the moves (0-4 only)
						  var dummyFrom = j;
						  var dummyTo = i;
						  var dummyFromNumBalls = tempFutureState[dummyFrom][4];
						  var dummyToNumBalls = tempFutureState[dummyTo][4];
						  var dummyColor = tempFutureState[dummyFrom][5];
						  tempFutureState[dummyFrom][dummyFromNumBalls-1] = 0;
						  tempFutureState[dummyTo][dummyToNumBalls] = dummyColor;
						  
						  
						  // Check 'Interchange' dumb steps
						  if(arrAllSpacesInTubeForUse[dummyFrom][8] == dummyTo && arrAllSpacesInTubeForUse[dummyTo][9] == dummyFrom){
						  	validFutureStep = false;
						  }
						  
						  // Check 'Dumb Step 3'
						  if(arrAllSpacesInTubeForUse[dummyTo][10] == dummyFrom){
							  validFutureStep = false;
						  }
						  
						  if(validFutureStep == true){
							  var tempCheckLength = arrMasterHistory.length;
							  LoopCheck1:
							  for(let k = 0; k < tempCheckLength; k++){
								  var diffCount = 0;
								  for(let m = 0; m < totalCol; m++){
									  for(let n = 0; n < 4; n++){
										  if(tempFutureState[m][n] != arrMasterHistory[k][m][n]){
											  diffCount += 1;
											  continue LoopCheck1;
										  }
									  }
								  }
								  if(diffCount == 0){
									  validFutureStep = false;
									  break LoopCheck1;
								  }
							  }
						  }
						  
						  if(validFutureStep == true){
							  var tempLength = arrColorCheck.length;
							  arrColorCheck[tempLength] = [];
							  arrColorCheck[tempLength][0] = arrAllSpacesInTubeForUse[i][5] - 1; // Color
							  arrColorCheck[tempLength][1] = j; // From
							  arrColorCheck[tempLength][2] = i; // To
						  }
					  }
				  }
			  }
		  }
		  

		  
		  // ***New Thing*** Add empty (-1) to arrColorCheck
		  var firstEmptyTube = -2;
		  LoopFindFirstEmpty1:
		  for(let i = 0; i < totalCol; i++){
			  if(arrAllSpacesInTubeForUse[i][4] == 0){
				  firstEmptyTube = i;
				  break LoopFindFirstEmpty1;
			  }
		  }
		 
		 if(firstEmptyTube != -2){
			 for(let i = 0; i < totalCol; i++){ // 'From'
				 if(i != firstEmptyTube && arrAllSpacesInTubeForUse[i][7] == 0 && arrAllSpacesInTubeForUse[i][4] > 0 && arrAllSpacesInTubeForUse[i][6] > 0){
					 // Need to check if it is a loop case
					 var tempFutureState = [];
					 for(let j = 0; j < arrAllSpacesInTubeForUse.length; j++){
						 tempFutureState[j] = [];
						 for(let k = 0; k < 6; k++){
							 tempFutureState[j][k] = arrAllSpacesInTubeForUse[j][k];
						 }
					 }
					 var validFutureStep = true;
					 
					 
					 // Perform the moves (0-4 only)
					 var dummyFrom = i;
					 var dummyTo = firstEmptyTube;
					 var dummyFromNumBalls = tempFutureState[dummyFrom][4];
					 var dummyToNumBalls = tempFutureState[dummyTo][4];
					 var dummyColor = tempFutureState[dummyFrom][5];
					 tempFutureState[dummyFrom][dummyFromNumBalls-1] = 0;
					 tempFutureState[dummyTo][dummyToNumBalls] = dummyColor;
					 
					 // Check 'Interchange' dumb steps
					 if(arrAllSpacesInTubeForUse[dummyFrom][8] == dummyTo && arrAllSpacesInTubeForUse[dummyTo][9] == dummyFrom){
						 validFutureStep = false;
					 }
					 
					 // Check 'Dumb Step 3'
					 if(arrAllSpacesInTubeForUse[dummyTo][10] == dummyFrom){
						 validFutureStep = false;
					 }
					 
					 if(validFutureStep == true){
						 var tempCheckLength = arrMasterHistory.length;
						 LoopCheck2:
						 for(let j = 0; j < tempCheckLength; j++){
							 var diffCount = 0;
							 for(let k = 0; k < totalCol; k++){
								 for(let m = 0; m < 4; m++){
									 if(tempFutureState[k][m] != arrMasterHistory[j][k][m]){
										 diffCount += 1;
										 continue LoopCheck2;
									 }
								 }
							 }
							 if(diffCount == 0){
								 validFutureStep = false;
								 break LoopCheck2;
							 }
						 }
					 }
					 
					 if(validFutureStep == true){
						 arrColorCheck.splice(0,0,[-1,i,firstEmptyTube])
					 }
				 }
			 }
		 }
		  
		  // Set arrCurrentSteps[i][3] as arrColorCheck
		  var nextStepCount = arrCurrentSteps.length;
		  arrCurrentSteps[nextStepCount] = [];
		  arrCurrentSteps[nextStepCount][3] = [];
		  for(let i = 0; i < arrColorCheck.length; i++){
			  arrCurrentSteps[nextStepCount][3][i] = [];
			  for(let j = 0; j < arrColorCheck[i].length; j++){
				  arrCurrentSteps[nextStepCount][3][i][j] = arrColorCheck[i][j];
			  }
		  }
		  
		  // Check again if the 'Anti-LoopBack Mechanism' has made it a Semi-Deadend
		  if(arrColorCheck.length == 0){ // Semi-Deadend
			  // Delete the arrCurrentSteps[nextStepCount]
			  arrCurrentSteps.splice(nextStepCount,1);
			  // Go back
			  var keepMovingBackward = true;
			  while(keepMovingBackward == true){
				  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
				  // Check if true Deadend
				  if(previousStepCount < 0){
					  finalEndState = true;
					  break ContinueSolvingloop;
				  }
				  // Now restore to previous state
				  for(let i = 0; i < totalCol; i++){
					  for(let j = 0; j < 11; j++){
						  arrAllSpacesInTubeForUse[i][j] = arrMasterHistory[previousStepCount][i][j];
					  }
				  }
				  
				  
				  numberOfExtraBackwardMoves += 1;
				  nextStepCount -= 1;
				  
				  
				  // Update MasterHistory
				  arrMasterHistory.splice(previousStepCount+1,1);
				  // See if it still needs to 'keepMovingBackward == true' OR Move & Update Steps
				  if(arrCurrentSteps[previousStepCount][0] == 1){ // keepMovingBackward is needed (MUST step)
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else if(arrCurrentSteps[previousStepCount].length == 3){
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else if(arrCurrentSteps[previousStepCount][3].length == 0){
					  arrCurrentSteps.splice(previousStepCount,1);
				  }else{// end the movebackloop
					  keepMovingBackward = false;
				  }
			  }
		  }
		  
		  
		  // (1.) Now make a Move
		  var newMoveFrom = arrCurrentSteps[nextStepCount][3][0][1];
		  var newMoveTo = arrCurrentSteps[nextStepCount][3][0][2];
		  var newMoveFromNumBall = arrAllSpacesInTubeForUse[newMoveFrom][4];
		  var newMoveToNumBall = arrAllSpacesInTubeForUse[newMoveTo][4];
		  var newMoveColor = arrAllSpacesInTubeForUse[newMoveFrom][5];
		  // (1.1) Update Balls
		  arrAllSpacesInTubeForUse[newMoveFrom][newMoveFromNumBall-1] = 0;
		  arrAllSpacesInTubeForUse[newMoveTo][newMoveToNumBall] = newMoveColor;
		  // (1.2) Update array - [4] - Number Of Balls
		  arrAllSpacesInTubeForUse[newMoveFrom][4] -= 1;
		  arrAllSpacesInTubeForUse[newMoveTo][4] += 1;
		  // (1.3) Update array - [5] - Top Ball Color
		  if(arrAllSpacesInTubeForUse[newMoveFrom][4] == 0){
		  	arrAllSpacesInTubeForUse[newMoveFrom][5] = 0;
		  }else{
		  	arrAllSpacesInTubeForUse[newMoveFrom][5] = arrAllSpacesInTubeForUse[newMoveFrom][arrAllSpacesInTubeForUse[newMoveFrom][4]-1];
		  }
		  arrAllSpacesInTubeForUse[newMoveTo][5] = newMoveColor;
		  // (1.4) Update array - [6] - Same Color Check (empty / same : 0, else > 0)
		  arrAllSpacesInTubeForUse[newMoveFrom][6] = 0; // Reset as 0
		  arrAllSpacesInTubeForUse[newMoveTo][6] = 0; // Reset as 0
		  // From
		  if(arrAllSpacesInTubeForUse[newMoveFrom][4] == 0){
			  arrAllSpacesInTubeForUse[newMoveFrom][6] = 0;
		  }else{
			  var tempCount = arrAllSpacesInTubeForUse[newMoveFrom][4];
			  for(let i = 0; i < arrAllSpacesInTubeForUse[newMoveFrom][4]; i++){
				  if(arrAllSpacesInTubeForUse[newMoveFrom][i] != arrAllSpacesInTubeForUse[newMoveFrom][0]){
					  tempCount = i;
					  break;
				  }
			  }
			  arrAllSpacesInTubeForUse[newMoveFrom][6] = arrAllSpacesInTubeForUse[newMoveFrom][4] - tempCount;
		  }
		  // To
		  if(arrAllSpacesInTubeForUse[newMoveTo][4] == 0){
			  arrAllSpacesInTubeForUse[newMoveTo][6] = 0;
		  }else{
			  var tempCount = arrAllSpacesInTubeForUse[newMoveTo][4];
			  for(let i = 0; i < arrAllSpacesInTubeForUse[newMoveTo][4]; i++){
				  if(arrAllSpacesInTubeForUse[newMoveTo][i] != arrAllSpacesInTubeForUse[newMoveTo][0]){
					  tempCount = i;
					  break;
				  }
			  }
			  arrAllSpacesInTubeForUse[newMoveTo][6] = arrAllSpacesInTubeForUse[newMoveTo][4] - tempCount;
		  }
		  // (1.5) Update array - [7] - Show 1 if it is a Perfect Tube
		  if(arrAllSpacesInTubeForUse[newMoveTo][6] == 0 && arrAllSpacesInTubeForUse[newMoveTo][4] == 4){
			  arrAllSpacesInTubeForUse[newMoveTo][7] = 1;
		  }
		  // Reset Before Updating [8] & [9]
		  var fromOther;
		  var toOther;
		  // From
		  if(arrAllSpacesInTubeForUse[newMoveFrom][8] != null){
		  	fromOther = arrAllSpacesInTubeForUse[newMoveFrom][8];
		  	arrAllSpacesInTubeForUse[newMoveFrom][8] = null;
		  	arrAllSpacesInTubeForUse[newMoveFrom][9] = null;
		  	arrAllSpacesInTubeForUse[fromOther][8] = null;
		  	arrAllSpacesInTubeForUse[fromOther][9] = null;
		  }else if(arrAllSpacesInTubeForUse[newMoveFrom][9] != null){
		  	fromOther = arrAllSpacesInTubeForUse[newMoveFrom][9];
		  	arrAllSpacesInTubeForUse[newMoveFrom][8] = null;
		  	arrAllSpacesInTubeForUse[newMoveFrom][9] = null;
		  	arrAllSpacesInTubeForUse[fromOther][8] = null;
		  	arrAllSpacesInTubeForUse[fromOther][9] = null;
		  }
		  // To
		  if(arrAllSpacesInTubeForUse[newMoveTo][8] != null){
		  	toOther = arrAllSpacesInTubeForUse[newMoveTo][8];
		  	arrAllSpacesInTubeForUse[newMoveTo][8] = null;
		  	arrAllSpacesInTubeForUse[newMoveTo][9] = null;
		  	arrAllSpacesInTubeForUse[toOther][8] = null;
		  	arrAllSpacesInTubeForUse[toOther][9] = null;
		  }else if(arrAllSpacesInTubeForUse[newMoveTo][9] != null){
		  	toOther = arrAllSpacesInTubeForUse[newMoveTo][9];
		  	arrAllSpacesInTubeForUse[newMoveTo][8] = null;
		  	arrAllSpacesInTubeForUse[newMoveTo][9] = null;
		  	arrAllSpacesInTubeForUse[toOther][8] = null;
		  	arrAllSpacesInTubeForUse[toOther][9] = null;
		  }
		  // Update array - [8] - 'last received from'
		  arrAllSpacesInTubeForUse[newMoveTo][8] = newMoveFrom;
		  // Update array - [9] - 'last moved to'
		  arrAllSpacesInTubeForUse[newMoveFrom][9] = newMoveTo;
		  // Update array - [10] - 'Dumb Step 3' reset
		  arrAllSpacesInTubeForUse[newMoveFrom][10] = null;
		  arrAllSpacesInTubeForUse[newMoveTo][10] = null;
		  for(let i = 0; i < totalCol; i++){
			  if(arrAllSpacesInTubeForUse[i][10] == newMoveFrom || arrAllSpacesInTubeForUse[i][10] == newMoveTo){
				  arrAllSpacesInTubeForUse[i][10] = null;
			  }
		  }
		  // Update array - [10] - 'Dumb Step 3' marking
		  var previousStepCount = arrCurrentSteps.length - 1; // Previous step = 1st step --> show 1, 2nd step show 2, and so on
		  if(previousStepCount > 0){ // ignore 1st step
			  if(arrCurrentSteps[previousStepCount][3].length > 1){
				  for(let i = 1; i < arrCurrentSteps[previousStepCount][3].length; i++){
					  if(arrCurrentSteps[previousStepCount][3][i][1] == newMoveFrom){
						  var markDumb3 = arrCurrentSteps[previousStepCount][3][i][2];
						  arrAllSpacesInTubeForUse[markDumb3][10] = newMoveTo;
					  }
				  }
			  }
		  }
		  
		  // (2.) Update the step (Mark & Delete)
		  arrCurrentSteps[nextStepCount][0] = 0;
		  arrCurrentSteps[nextStepCount][1] = newMoveFrom;
		  arrCurrentSteps[nextStepCount][2] = newMoveTo;
		  arrCurrentSteps[nextStepCount][3].splice(0,1);
		  
		  
		  // (3.) Update the MasterHistory
		  var MHLength = arrMasterHistory.length;
		  arrMasterHistory[MHLength] = [];
		  for(let i = 0; i < totalCol; i++){ // Create tempAllSpaces (corrected)
			  arrMasterHistory[MHLength][i] = [];
			  for(let j = 0; j < 11; j++){
				  arrMasterHistory[MHLength][i][j] = arrAllSpacesInTubeForUse[i][j];
			  }
		  }
		  
		  
		  // Update Number Of Move Performed
		  numberOfExtraMovesPerformed += 1;
		  //deBugTextShow(); //**********************************************************************************
	  }

    }
	
	if(numberOfMovesPerformed > 0 ){ //&& arrCurrentSteps[4][3].length > 7
		var arrSee1 = [];
		var arrSee2 = [];
		for(let i = 0; i < arrMasterHistory.length; i++){
			arrSee1[i] = [];
			for(let j = 0; j < arrMasterHistory[i].length; j++){
				arrSee1[i][j] = arrMasterHistory[i][j];
			}
		}
		for(let i = 0; i < arrCurrentSteps.length; i++){
			arrSee2[i] = [];
			for(let j = 0; j < arrCurrentSteps[i].length; j++){
				arrSee2[i][j] = arrCurrentSteps[i][j];
			}
		}
		print(numberOfMovesPerformed);
		//break ContinueSolvingloop;
		print(arrSee1);
		print(arrSee2);
	}
	
  }
  // Show Message?
  //print(arrAllSpacesInTubeForUse);
  print('Ended-TrueEnd');
  print('bestStepCount : ' + bestStepCount);
  print(arrBestStepsSoFar);
  print(arrBestFinalState);
  
  var arrString;
  for(let i = -2; i < totalCol*4; i++){
	  if(i == -2){
		  arrString = String(totalCol);
	  }
	  if(i == -1){
		  arrString += ',';
		  arrString += String(emptyCol);
	  }
	  if(i > -1){
		  var colNum = (i - i%4)/4;
		  var ballNum = i%4;
		  if(i == 0){
			  arrString += '|';
		  }else if(i%4 == 0){
			  arrString += ';';
		  }else{
			  arrString += ',';
		  }
		  arrString += String(arrAllSpacesInTube[colNum][ballNum]);
	  }
  }
  print(arrString);
  
  var date4 = new Date();
  var time4 = date4.getTime();
  var secElapsed = (time4 - time3)/1000;
  print('Time elapsed (Extra) = ' + secElapsed + ' second(s).');
  
}
function deBugTextShow(){
	var tempShow1 = [];
	var tempShow2 = [];
	for(let i = 0; i < totalCol; i++){
		tempShow1[i] = [];
		for(let j = 0; j < arrAllSpacesInTubeForUse[i].length; j++){
			tempShow1[i][j] = arrAllSpacesInTubeForUse[i][j]
		}
	}
	for(let i = 0; i < arrCurrentSteps.length; i++){
		tempShow2[i] = [];
		for(let j = 0; j < arrCurrentSteps[i].length; j++){
			if(j < 3){
				tempShow2[i][j] = arrCurrentSteps[i][j];
			}else if(j == 3){
				if(arrCurrentSteps[i][3].length > 0){
					tempShow2[i][j] = [];
					for(let k = 0; k < arrCurrentSteps[i][j].length; k++){
						tempShow2[i][j][k] = arrCurrentSteps[i][j][k];
					}
				}
			}
		}
	}
	print('StepCount: ' + arrCurrentSteps.length);
	print(tempShow2);
	print(tempShow1);
}*/
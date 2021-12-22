document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");
 
    for (let button of buttons) {
        button.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit") {
               // alert("You clicked Submit!") to check if button works
               checkAnswer(); // calls function to check if value correct
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }
    
    //waits to see if enter was pressed, if yes the means user entered value and we should check answer loop.
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })
    // added addition because it is our default game so it loads immediately
    
    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType){
    //everytime, loop runs again it deletes the previous value entered by the user.
    document.getElementById("answer-box").value = "";

    // this basicly puts our curser automaticly in this input field so that you can type immediately
    document.getElementById("answer-box").focus();
    //Create two random numbers between 1 and 25
    let num1 = Math.floor(Math.random()*25) +1;
    let num2 = Math.floor(Math.random()*25) +1;

    if (gameType === "addition") {
        displayAdditionalQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion (num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion (num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion (num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw`Unknown game type: ${gameType}. Aborting!`;
    }

}

/**
 * Checks the answer agaist the first element in
 * the returned calculateCorrectAnswer array
 */

function checkAnswer(){
    
    // we cant use inner text as it is an input field, need to use value.
    let userAnswer = parseInt(document.getElementById("answer-box").value);

    let calculatedAnswer = calculateCorrectAnswer();
    // calculatedAnswer is an array [ 2, "addition"] thats why we need to specify first part by adding [0]
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert(`Hey You got it right :D`);
        // if correct increment the score, same for if incorrect
        incrementScore();
    } else {
        alert(`Awwwwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    // tells program which program to run after this loop, basically from array pulling operator it tells to stay on the loop or use different.
    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */

function calculateCorrectAnswer(){

    // we use parseInt so that value return as whole number as default is a string(text)
   let operand1 = parseInt(document.getElementById("operand1").innerText);
   let operand2 = parseInt(document.getElementById("operand2").innerText);
   let operator = document.getElementById("operator").innerText;

   if (operator === "+") {
       // [ array meaning more than one function]
       // First op1 + op will return answer
       // second after , will tell program to continue running Addition loop.

       return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
       return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [parseInt(operand1 / operand2), "division"];
    } else {
        alert(`Unimplemented operator ${gameType}`);
        throw`Unimplemented operator ${gameType}. Aborting!`; 
    }
}

function incrementScore(){
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer(){
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

// operand 1 and 2 are the numbers we will pass on for addition. generated in main game loop. 
// operand 1 and 2 are ID's in the div we will replace textContent.
function displayAdditionalQuestion(operand1, operand2){
    // the .textContent = operand 1 means that the ID text pulled is set to argument i.e operand1
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+"; 
}

function displaySubtractQuestion(operand1, operand2){
   // the .textContent = operand 1 means that the ID text pulled is set to argument i.e operand1
   //back bit, basicly if operand 1 is greater than operand 2 then show operand 1 otherwise operand 2
   document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
   document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
   document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2){
          // the .textContent = operand 1 means that the ID text pulled is set to argument i.e operand1
   document.getElementById('operand1').textContent = operand1;
   document.getElementById('operand2').textContent = operand2;
   document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2){
    // just tp make sure that its always more than operand 2, by making operand 1 multiplied by operand 2
    operand1 = operand1 * operand2;
   
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "/";
}
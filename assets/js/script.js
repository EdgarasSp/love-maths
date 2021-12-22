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
    
    // added addition because it is our default game so it loads immediately
    
    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType){

    //Create two random numbers between 1 and 25
    let num1 = Math.floor(Math.random()*25) +1;
    let num2 = Math.floor(Math.random()*25) +1;

    if (gameType === "addition") {
        displayAdditionalQuestion(num1, num2);
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
    } else {
        alert(`Awwwwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
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
    } else {
        alert(`Unimplemented operator ${gameType}`);
        throw`Unimplemented operator ${gameType}. Aborting!`; 
    }
}


function incrementScore(){
    
}

function incrementWrongAnswer(){
    
}

// operand 1 and 2 are the numbers we will pass on for addition. generated in main game loop. 
// operand 1 and 2 are ID's in the div we will replace textContent.
function displayAdditionalQuestion(operand1, operand2){
    // the .textContent = operand 1 means that the ID text pulled is set to argument i.e operand1
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+"; 
}

function displaySubtractQuestion(){
    
}

function displayMultiplyQuestion(){
    
}

// // function displayDivisionQuestion(operand1, operand2){
//     // the .textContent = operand 1 means that the ID text pulled is set to argument i.e operand1
//     document.getElementById('operand1').textContent = operand1;
//     document.getElementById('operand2').textContent = operand2;
//     document.getElementById('operator').textContent = "/";
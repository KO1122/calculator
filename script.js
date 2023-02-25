const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const decimalPointBtn = document.querySelector('.decimal-point');
const plusMinusBtn = document.querySelector('.plus-minus');
const screenPrevText = document.querySelector('.screen-previous');
const screenCurrText = document.querySelector('.screen-current');

// Initialize starting state
let operand1 = "";
let operand2 = "";
let operator = null;
let haveResult = false; 

numberBtns.forEach(button => {
    button.addEventListener('click', () => clickNumber(button.textContent));
})

function clickNumber(numButtonText) {

    // If a result has previously been computed 
    if (haveResult) {
        // Reinitialize variables for a new calculation 
        // Give current screen value of newly pressed number button and reset previous screen display
        screenCurrText.textContent = numButtonText;
        screenPrevText.textContent= '';
        clearVars();
        return; 
    }

    // If number button clicked is 0, retain screen display as '0'
    if (screenCurrText.textContent === '0') screenCurrText.textContent = numButtonText;
    // Otherwise, append number button value to current screen display
    else screenCurrText.textContent += numButtonText;   
}

operatorBtns.forEach(button => {
    button.addEventListener('click', () => clickOperator(button.textContent));
})

function clickOperator(operatorBtnText) {

    if (haveResult) {
        // Function checks if an error exists
        // Terminates upper nested function if there is an error
        isError();
        let result = screenCurrText.textContent;
        operand1 = result;
        operand2 = "";
        operator = operatorBtnText;
        screenPrevText.textContent= `${result} ${operator}`;
        screenCurrText.textContent = '0';
        haveResult = false; 
        return;
    }

    // If an operator button is clicked for the first time
    if (!operand1) {
        operand1 = screenCurrText.textContent;
        operator = operatorBtnText;
        screenPrevText.textContent = `${operand1} ${operatorBtnText}`;
        screenCurrText.textContent = '0';
    }

    // If an operator button is clicked again successively 
    else {
        // Replace value of old operator with the new one  
        operator = operatorBtnText;
        screenPrevText.textContent = `${operand1} ${operatorBtnText}`;
    }
}

equalBtn.addEventListener('click', () => clickEqual());

function clickEqual() {

    if (haveResult) {
        isError();
        // If result has been calculated, repeatedly clicking on equal button will operate on result ... 
        operand1 = screenCurrText.textContent;
        let result = operate(operator, operand1, operand2);
        screenCurrText.textContent = result;
        screenPrevText.textContent = `${operand1} ${operator} ${operand2} = ${result}`;
        return;
    }
    
    operand2 = screenCurrText.textContent;
    // Only calculate if operand 1, operand 2 and operator have values 
    if (operand1 && operand2 && operator) {
        let result = operate(operator, operand1, operand2);
        screenCurrText.textContent = result;
        screenPrevText.textContent = `${operand1} ${operator} ${operand2} = ${result}`;
        haveResult = true;
    }
}

clearBtn.addEventListener('click', () => {
    fullClear();
});

function clearVars() {
    operand1 = "";
    operand2 = "";
    operator = null;
    haveResult = false; 
}

function fullClear() {
    screenCurrText.textContent = '0';
    screenPrevText.textContent= '';
    clearVars();
}

// Function handles divide by 0 scenario when result becomes 'Error'
function isError() {
    if (screenCurrText.textContent === 'Error') {
        fullClear();
        throw new Error("Error value found in lower screen display");
    }
}

deleteBtn.addEventListener('click', clickDeleteBtn);

function clickDeleteBtn() {
    isError();
    if (haveResult) return;
    if (screenCurrText.textContent.length === 1) screenCurrText.textContent = '0';
    else screenCurrText.textContent = screenCurrText.textContent.slice(0, -1);
    if (screenCurrText.textContent === '-') screenCurrText.textContent = '0';
}

plusMinusBtn.addEventListener('click', clickPlusMinus);

function clickPlusMinus() {
    isError();
    if (haveResult) return;
    screenCurrText.textContent = `${Number(screenCurrText.textContent) * -1}`;
}

decimalPointBtn.addEventListener('click', clickDecimalPoint);

function clickDecimalPoint() {
    isError();
    if (haveResult) return;
    if (!screenCurrText.textContent.includes('.')) screenCurrText.textContent += '.';
}

// Add keyboard support 
document.addEventListener('keydown', typeKey);

function typeKey(e) {
    let operators = ['+', '-', '/', '*', '%']
    if (e.key >= 0 && e.key <= 9) clickNumber(e.key);
    if (operators.includes(e.key)) clickOperator(convertOperator(e.key));
    if (e.key === '=' || e.key === 'Enter') clickEqual();
    if (e.key === 'Escape') fullClear();
    if (e.key === 'Backspace') clickDeleteBtn();
    if (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'm') clickPlusMinus(); 
    if (e.key === '.') clickDecimalPoint();
}

function convertOperator(keyOperator) {
    if (keyOperator === '+' || keyOperator === '-' || keyOperator === '%') return keyOperator;
    else if (keyOperator === '*') return '×';
    else if (keyOperator === '/') return '÷';
}

// Add function for commas ???

// Add function for screen overflow

// Add function for rounding 

// Fix floating point division error 0.2 x 3 = 0.6 not 0.600001

// IF result found, disable all other buttons, e.g. delete, plus-minus

// Add textbox to introduce keyboard support 

function operate(operator, operand1, operand2) {

    let num1 = Number(operand1); 
    let num2 = Number(operand2);

    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "×":
            return num1 * num2; 
        case "÷":
            if (num2 === 0) return 'Error'; 
            else return num1 / num2;
        case "%":
            if (num2 === 0) return 'Error'; 
            else return num1 % num2;
    }
}
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equal');
const clearBtn = document.querySelector('.clear');
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

    // If a result has not yet been computed 
    if (!haveResult) {
        // If number button clicked is 0 
        if (screenCurrText.textContent === '0') screenCurrText.textContent = numButtonText;
        // Otherwise, append number button value to current screen display
        else screenCurrText.textContent += numButtonText;   
    }
    else {
        // Reinitialize variables for a new calculation and reset previous screen  
        screenCurrText.textContent = numButtonText;
        screenPrevText.textContent= '';
        clear();
    }
}

operatorBtns.forEach(button => {
    button.addEventListener('click', () => clickOperator(button.textContent));
})

function clickOperator(operatorBtnText) {

    if (!haveResult) {

        // If an operator button is clicked for the first time
        if (!operand1) {
            operand1 = screenCurrText.textContent;
            operator = operatorBtnText;
            screenPrevText.textContent = `${operand1} ${operatorBtnText}`;
            screenCurrText.textContent = '';
        }

        // If an operator button is clicked again
        else {
            // Replace value of old operator with the new one  
            operator = operatorBtnText;
            screenPrevText.textContent = `${operand1} ${operatorBtnText}`;
        }
    }
    else {
        // If the calculation result is not 'Error' 
        if (screenCurrText.textContent !== 'Error') {
            let result = screenCurrText.textContent;
            operand1 = result;
            operand2 = "";
            operator = operatorBtnText;
            screenPrevText.textContent= `${result} ${operator}`;
            screenCurrText.textContent = '';
            haveResult = false; 
        }
        else {
            screenCurrText.textContent = '0';
            screenPrevText.textContent= '';
            clear();
        }
    }
}

equalBtn.addEventListener('click', () => clickEqual());

function clickEqual() {

    if (!haveResult) {
        operand2 = screenCurrText.textContent;
        
        // Only calculate if operand 1, operand 2 and operator have values 
        if (operand1 && operand2 && operator) {
            let result = operate(operator, operand1, operand2);
            screenCurrText.textContent = result;
            screenPrevText.textContent = `${operand1} ${operator} ${operand2} = ${result}`;
            haveResult = true;
        }
    }
    else {
        if (screenCurrText.textContent !== 'Error') {
            // If result has been calculated, repeatedly clicking on equal button will operate on result ... 
            let result = operate(operator, operand1, operand2);
            operand1 = result;
            screenCurrText.textContent = result;
            screenPrevText.textContent = `${operand1} ${operator} ${operand2} = ${result}`;
        }
        else {
            screenCurrText.textContent = '0';
            screenPrevText.textContent= '';
            clear();
        }
    }
}

clearBtn.addEventListener('click', () => {
    screenCurrText.textContent = '0';
    screenPrevText.textContent= '';
    clear();
});

function clear() {
    operand1 = "";
    operand2 = "";
    operator = null;
    haveResult = false; 
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function modulo(num1, num2) {
    return num1 % num2
}

function operate(operator, operand1, operand2) {

    let num1 = Number(operand1); 
    let num2 = Number(operand2);

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            if (num2 === 0) {
                return 'Error';
            }
            return divide(num1, num2);
        case "%":
            if (num2 === 0) {
                return 'Error';
            }
            return modulo(num1, num2);
    }
}

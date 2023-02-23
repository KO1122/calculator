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

numberBtns.forEach(button => {
    button.addEventListener('click', () => displayNumberBtn(button.textContent));
})

function displayNumberBtn(numberBtnText) {
    if (screenCurrText.textContent === '0') screenCurrText.textContent = numberBtnText;
    else screenCurrText.textContent += numberBtnText;
}

operatorBtns.forEach(button => {
    button.addEventListener('click', () => displayOperator(button.textContent));
})

function displayOperator(operatorBtnText) {
    if (!operand1) {
        operand1 = screenCurrText.textContent;
        operator = operatorBtnText;
        screenPrevText.textContent = `${operand1} ${operatorBtnText}`;
        screenCurrText.textContent = '0';
    }
    else {
        operator = operatorBtnText;
        screenPrevText.textContent = `${operand1} ${operatorBtnText}`;
    }
}

equalBtn.addEventListener('click', () => getResult());

function getResult() {
    if (operand1 && operand2 && operator) {
        screenCurrText.textContent = operate(operator, operand1, operand2);
    }
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

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
        case "%":
            return modulo(num1, num2);
    }
}
const OPERATORS = ['+', '\u2212', '\u00d7', '\u00f7'];

let firstNumber;
let operator;
let secondNumber;

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.getElementById('decimal');
const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');

let input = display.textContent;

// EVENT LISTENERS

digitButtons.forEach((btn) =>
  btn.addEventListener('click', (e) => digitClicked(e.target.textContent)),
);
operatorButtons.forEach((btn) =>
  btn.addEventListener('click', (e) => operatorClicked(e.target.textContent)),
);
decimalButton.addEventListener('click', decimalClicked);
equalsButton.addEventListener('click', () => {
  if (isProperExpression(input)) showResult();
  else showError();
});
deleteButton.addEventListener('click', deleteClicked);
clearButton.addEventListener('click', () => {
  setInput('0');
  setDisplay('0');
});

// CALCULATOR FUNCTIONS

function digitClicked(digit) {
  if (input === '0') {
    setInput('');
    setDisplay('');
  } else if (isOperator(getLastInput())) {
    setDisplay('');
  }

  setInput(input + digit);
  setDisplay(display.textContent + digit);
}

function operatorClicked(operator) {
  if (isOperator(getLastInput())) return;
  else if (isProperExpression(input)) {
    showResult();
  }
  input += operator;
}

function isOperator(char) {
  return OPERATORS.includes(char);
}

function getLastInput() {
  return input.slice(-1);
}

function setInput(text) {
  input = text.toString();
}

function setDisplay(text) {
  display.textContent = text.toString();
}

function isProperExpression(expression) {
  const pattern = /[\d]+[+\u2212\u00d7\u00f7][\d]+/;
  return expression.match(pattern) ? true : false;
}

function showResult() {
  operator = getOperator(input);
  [firstNumber, secondNumber] = input.split(operator);
  [firstNumber, secondNumber] = [+firstNumber, +secondNumber];
  let result = operate(firstNumber, operator, secondNumber);
  result = round(result, 3);

  setInput(result);
  setDisplay(result);
}

function showError() {
  setInput('');
  setDisplay('ERROR');
}

function getOperator(input) {
  for (let operator of OPERATORS) {
    if (input.includes(operator)) return operator;
  }
}

function deleteClicked() {
  if (input.length === 1) {
    setInput('0');
    setDisplay('0');
    return;
  }

  input = input.slice(0, input.length - 1);
  setDisplay(input);
}

function operate(first, op, second) {
  switch (op) {
    case '+':
      return add(first, second);
    case '\u2212':
      return subtract(first, second);
    case '\u00d7':
      return multiply(first, second);
    default:
      return divide(first, second);
  }
}

function hasDecimal(str) {
  return str.includes('.');
}

function decimalClicked() {
  if (!hasDecimal(display.textContent)) {
    setInput(input + '.');
    setDisplay(display.textContent + '.');
  }
}

// MATH OPERATIONS

function round(float, decimals = 0) {
  const multiplier = 10 ** decimals;
  return Math.round((float + Number.EPSILON) * multiplier) / multiplier;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b === 0 ? 'ERROR: Division by zero' : a / b;
}

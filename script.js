const OPERATORS = ['+', '−', '×', '÷'];
const KEYS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
  '+',
  '−',
  '×',
  '÷',
  '=',
  'Enter',
  'c',
  'Backspace',
];

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.getElementById('decimal');
const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');

let userInput = display.textContent;

// EVENT LISTENERS

digitButtons.forEach((btn) =>
  btn.addEventListener('click', (e) => digitClicked(e.target.textContent)),
);
operatorButtons.forEach((btn) =>
  btn.addEventListener('click', (e) => operatorClicked(e.target.textContent)),
);
decimalButton.addEventListener('click', decimalClicked);
equalsButton.addEventListener('click', equalsClicked);
deleteButton.addEventListener('click', deleteClicked);
clearButton.addEventListener('click', clearClicked);

document.addEventListener('keydown', (e) => keyDowned(e));
document.addEventListener('keyup', (e) => keyUpped(e));

// EVENT FUNCTIONS

function digitClicked(digit) {
  if (userInput.includes('ERROR')) return true;
  else if (userInput === '0') {
    setInput('');
    setDisplay('');
  } else if (isOperator(getLastInput())) setDisplay('');

  setInput(userInput + digit);
  setDisplay(display.textContent + digit);
}

function operatorClicked(operator) {
  if (isOperator(getLastInput())) return;
  else if (isProperExpression(userInput)) {
    if (userInput.includes('ERROR')) return;
    showResult();
  }
  userInput += operator;
}

function decimalClicked() {
  if (isOperator(getLastInput(userInput))) {
    setInput(userInput + '.');
    setDisplay('.');
    return;
  }
  if (!hasDecimal(display.textContent)) {
    setInput(userInput + '.');
    setDisplay(display.textContent + '.');
  }
}

function equalsClicked() {
  if (isProperExpression(userInput)) showResult();
  else showError();
}

function deleteClicked() {
  if (userInput.length === 1) {
    setInput('0');
    setDisplay('0');
    return;
  }

  userInput = userInput.slice(0, userInput.length - 1);
  setDisplay(userInput);
}

function clearClicked() {
  setInput('0');
  setDisplay('0');
}

function keyDowned(event) {
  let key = event.key;
  key = convertKey(key);

  if (KEYS.includes(key)) {
    const button = document.querySelector(`[data-key="${key}"]`);
    button.classList.add('btn-hover');
    executeKey(key);
  }
}

function keyUpped(event) {
  let key = event.key;
  key = convertKey(key);

  if (KEYS.includes(key)) {
    const button = document.querySelector(`[data-key="${key}"]`);
    button.classList.remove('btn-hover');
  }
}

// MISCELLANEOUS

function showResult() {
  let operator = getOperator(userInput);
  let numbers = userInput.split(operator);
  numbers = numbers.map((num) => +num);

  let result = operate(numbers[0], operator, numbers[1]);
  if (typeof result === 'number') result = round(result, 3);

  setInput(result);
  setDisplay(result);
}

function showError() {
  setInput('');
  setDisplay('ERROR');
}

function isProperExpression(expression) {
  const pattern = /\d+[+−×÷](?:\d)?(?:\.)?\d+/;
  return expression.match(pattern) ? true : false;
}

// converts the key that the user pressed to the proper key (e.g. '/' -> '÷')
function convertKey(pressedKey) {
  if (pressedKey === '-') return '−';
  if (pressedKey === 'x' || pressedKey === '*') return '×';
  if (pressedKey === '/') return '÷';
  if (pressedKey === 'Enter') return '=';
  return pressedKey;
}

function executeKey(key) {
  if (key === '=') {
    equalsClicked();
    return;
  }
  if (key === 'Backspace') {
    deleteClicked();
    return;
  }
  if (key === '.') {
    decimalClicked();
    return;
  }
  if (key === 'c') {
    clearClicked();
    return;
  }
  if (OPERATORS.includes(key)) {
    operatorClicked(key);
    return;
  }
  digitClicked(key);
}

function isOperator(char) {
  return OPERATORS.includes(char);
}

function getOperator(str) {
  for (let operator of OPERATORS) {
    if (str.includes(operator)) return operator;
  }
}

function hasDecimal(str) {
  return str.includes('.');
}

function setDisplay(text) {
  display.textContent = text.toString();
}

function setInput(text) {
  userInput = text.toString();
}

function getLastInput() {
  return userInput.slice(-1);
}

function operate(first, op, second) {
  switch (op) {
    case '+':
      return add(first, second);
    case '−':
      return subtract(first, second);
    case '×':
      return multiply(first, second);
    default:
      return divide(first, second);
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

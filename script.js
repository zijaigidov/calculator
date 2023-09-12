let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let toResetScreen = false;

const currentExpression = document.getElementById('current-expression');
const lastExpression = document.getElementById('last-expression');
const digitButtons = document.querySelectorAll('.digit-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const decimalButton = document.getElementById('point-btn');
const equalsButton = document.getElementById('equals-btn');
const deleteButton = document.getElementById('delete-btn');
const clearButton = document.getElementById('clear-btn');

digitButtons.forEach((btn) =>
  btn.addEventListener('click', () => addDigit(btn.textContent)),
);
operatorButtons.forEach((btn) =>
  btn.addEventListener('click', () => addOperator(btn.textContent)),
);
decimalButton.addEventListener('click', addPoint);
equalsButton.addEventListener('click', evaluate);
deleteButton.addEventListener('click', deleteChar);
clearButton.addEventListener('click', clear);
window.addEventListener('keydown', keyClicked);

function addDigit(digit) {
  if (currentExpression.textContent === '0' || toResetScreen) resetScreen();
  currentExpression.textContent += digit;
}

function addOperator(operator) {
  if (toResetScreen) resetScreen();
  if (currentOperator) evaluate();
  firstOperand = currentExpression.textContent;
  currentOperator = operator;
  lastExpression.textContent = `${firstOperand} ${currentOperator}`;
  toResetScreen = true;
}

function addPoint() {
  if (toResetScreen) {
    resetScreen();
    currentExpression.textContent = '0';
  }
  if (currentExpression.textContent.includes('.')) return;

  currentExpression.textContent += '.';
}

function deleteChar() {
  if (currentExpression.textContent.length === 1) return;
  currentExpression.textContent = currentExpression.textContent
    .toString()
    .slice(0, -1);
}

function clear() {
  currentExpression.textContent = '0';
  lastExpression.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperator = null;
}

function resetScreen() {
  currentExpression.textContent = '';
  toResetScreen = false;
}

function evaluate() {
  if (currentOperator === null || toResetScreen) return;
  if (currentOperator === '÷' && currentExpression.textContent === '0') {
    alert('ERROR: You cannot divide by zero.');
    return;
  }
  secondOperand = currentExpression.textContent;
  currentExpression.textContent = roundResult(
    operate(+firstOperand, currentOperator, +secondOperand),
    3,
  );
  lastExpression.textContent = `${firstOperand} ${currentOperator} ${secondOperand} =`;
  currentOperator = null;
}

function keyClicked(event) {
  let key = event.key;
  if (0 <= key && key <= 9) addDigit(key);
  if (key === '=' || key === 'Enter') evaluate();
  if (key === 'Backspace') deleteChar();
  if (key === 'Escape') clear();
  if (['+', '-', 'x', '*', '/'].includes(key))
    addOperator(convertOperator(key));
}

function convertOperator(pressedOperator) {
  if (pressedOperator === '+') return '+';
  if (pressedOperator === '-') return '−';
  if (pressedOperator === 'x' || pressedOperator === '*') return '×';
  if (pressedOperator === '/') return '÷';
}

function operate(a, op, b) {
  switch (op) {
    case '+':
      return add(a, b);
    case '−':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    default:
      return divide(a, b);
  }
}

function roundResult(float, decimals = 0) {
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

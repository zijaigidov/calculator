let firstNumber;
let operator;
let secondNumber;

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const clearButton = document.getElementById('clear');

let displayValue = display.textContent;

// EVENT LISTENERS

digitButtons.forEach((btn) =>
  btn.addEventListener('click', (e) => digitClicked(e.target.textContent)),
);
clearButton.addEventListener('click', () => {
  clearDisplay();
  updateDisplay('0');
});

// CALCULATOR FUNCTIONS

function digitClicked(digit) {
  if (display.textContent === '0') clearDisplay();
  updateDisplay(digit);
}

function updateDisplay(input) {
  display.textContent += input;
  displayValue += input;
}

function clearDisplay() {
  display.textContent = '';
  displayValue = '';
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

// MATH OPERATIONS

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

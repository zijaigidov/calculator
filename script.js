let firstNumber;
let secondNumber;
let operator;

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

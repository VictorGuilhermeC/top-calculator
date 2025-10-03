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

function operate(operator, num1, num2) {
  let eval = 0;

  switch (operator) {
    case "+":
      eval = add(num1, num2);
      break;
    case "-":
      eval = subtract(num1, num2);
      break;
    case "*":
      eval = multiply(num1, num2);
      break;
    case "/":
      eval = divide(num1, num2);
      break;
  }
  return eval;
}

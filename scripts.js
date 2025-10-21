//Variables

const Operation = {
  currentValue: null,
  previousValue: null,
  operator: "",
};

const display = document.querySelector(".display");
const calculatorButtons = document.querySelector(".calculator-buttons");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");

//Event handlers

calculatorButtons.addEventListener("click", (event) => {
  if (event.target.classList.contains("digit")) {
    updateDisplay(event);
  } else if (event.target.id === "delete") {
    deleteLastDigit(event);
  } else if (event.target.id === "decimal-separator") {
    takeDecimalSeparator();
  } else if (event.target.classList.contains("operator")) {
    takeOperator(event);
  } else if (event.target.id === "equal") {
    Operation.currentValue = operate(
      Operation.previousValue,
      Operation.operator,
      Operation.currentValue
    );
    Operation.previousValue = null;
    Operation.operator = "";
    display.textContent = Operation.currentValue;
  }
});

clear.addEventListener("click", reset);

//Auxiliary functions

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  if (num2 === 0) {
    reset();
    return (display.textContent = "Can't divide by 0!");
  }
  return num1 / num2;
};

function operate(num1, op, num2) {
  if (!op) return num2;
  else if (op && num2 === null) return num1;
  else
    switch (op) {
      case "+":
        return add(num1, num2);
      case "-":
        return subtract(num1, num2);

      case "/":
        return divide(num1, num2);

      case "*":
        return multiply(num1, num2);
    }
}

function takeOperator(event) {
  if (
    Operation.previousValue !== null &&
    Operation.operator &&
    Operation.currentValue !== null
  ) {
    Operation.previousValue = operate(
      Operation.previousValue,
      Operation.operator,
      Operation.currentValue
    );
    display.textContent = Operation.previousValue;
    Operation.currentValue = null;
    Operation.operator = event.target.textContent;
  } else {
    Operation.operator = event.target.textContent;
    Operation.previousValue = Operation.currentValue;
    Operation.currentValue = null;
  }
}

function reset() {
  Operation.currentValue = null;
  Operation.previousValue = null;
  Operation.operator = "";
  display.textContent = 0;
}

function updateDisplay(event) {
  if (
    display.textContent === "0" ||
    Operation.currentValue === null ||
    display.textContent === "Can't divide by 0!"
  ) {
    display.textContent = event.target.textContent;
  } else if (event.target.classList.contains("digit")) {
    display.textContent += event.target.textContent;
  }
  Operation.currentValue = Number(display.textContent);
}

function takeDecimalSeparator(event) {
  if (!display.textContent.includes(".")) display.textContent += ".";
  if (display.textContent === "0.") Operation.currentValue = 0;
}

function deleteLastDigit(event) {
  display.textContent =
    display.textContent.length > 1
      ? display.textContent.substring(0, display.textContent.length - 1)
      : 0;
  Operation.currentValue = Number(display.textContent);
}

const Operation = {
  currentValue: "",
  previousValue: "",
  operator: "",
  result: "",
};

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => {
  if (num2 === 0) {
    reset();
    return "Can't divide by 0!";
  }
  return num1 / num2;
};

const display = document.querySelector(".display");
const calculatorButtons = document.querySelector(".calculator-buttons");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

calculatorButtons.addEventListener("click", (event) => {
  if (event.target.classList.contains("digit")) {
    takeNumber(event);
  } else if (event.target.classList.contains("operator")) {
    takeOperator(event);
  } else if (event.target.id === "equal") {
    Operation.currentValue = operate(
      Operation.previousValue,
      Operation.operator,
      Operation.currentValue
    );
    Operation.operator = "";
    Operation.previousValue = "";
  }
});

function operate(num1, op, num2) {
  if (num1 === "") {
    return num2;
  } else if (num2 === "") {
    return num1;
  }

  let firstValue = Number(num1);
  let secondValue = Number(num2);

  switch (op) {
    case "+":
      return add(firstValue, secondValue).toString();
    case "-":
      return subtract(firstValue, secondValue).toString();
    case "/":
      return divide(firstValue, secondValue).toString();
    case "*":
      return multiply(firstValue, secondValue).toString();
  }
}

function takeNumber(event) {
  if (Operation.result !== "") {
    Operation.previousValue = Operation.result;
    Operation.currentValue = "";
  }
  Operation.currentValue += event.target.textContent;
}

function takeOperator(event) {
  if (
    Operation.previousValue !== "" &&
    Operation.operator !== "" &&
    Operation.currentValue !== ""
  ) {
    Operation.result = operate(
      Operation.previousValue,
      Operation.operator,
      Operation.currentValue
    );
    Operation.previousValue = Operation.result;
  }
  Operation.previousValue = Operation.currentValue;
  Operation.currentValue = "";
  Operation.operator = event.target.textContent;
}

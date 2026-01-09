let previousInput = "0";
let currentInput = "0";
let operator = "";

const mainDisplay = document.querySelector("#main");
const buttons = document.querySelectorAll("button");
const calculatorButtons = document.querySelector(".calculator-buttons");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");
const delBtn = document.querySelector("#delete");
const sepBtn = document.querySelector("#decimal-separator");

//Event handlers

calculatorButtons.addEventListener("click", (event) => {
  const target = event.target;
  if (target.className === "digit") {
    takeDigit(target.textContent);
  } else if (target.className === "operator") {
    takeOperator(target.textContent);
  }
});

clearBtn.addEventListener("click", (event) => {
  operator = "";
  currentInput = previousInput = "0";
  updateMainDisplay("0");
});

delBtn.addEventListener("click", (event) => {
  currentInput = `${currentInput.slice(0, currentInput.length - 1)}`;
  if (currentInput === "") currentInput = "0";
  updateMainDisplay(currentInput);
});

sepBtn.addEventListener("click", (event) => {
  if (currentInput.includes(".")) return;
  else currentInput += ".";
  updateMainDisplay(currentInput);
});

equalBtn.addEventListener("click", (event) => {
  if (operator === "") return;
  let result = calculate().toString();
  previousInput = result;
  currentInput = "0";
  operator = "";
  updateMainDisplay(result);
});

//Auxiliary functions
mainDisplay.addEventListener("keydown", keys);

function takeOperator(op) {
  if (operator !== "") {
    previousInput = `${calculate()}`;
    updateMainDisplay(previousInput);
  } else {
    previousInput = currentInput;
  }
  currentInput = "0";
  operator = op;
}

function takeDigit(num) {
  if (currentInput === "0") currentInput = num;
  else currentInput += num;
  updateMainDisplay(currentInput);
}

function keys(event) {
  const btn = Array.from(buttons).find((node) => {
    switch (event.key) {
      case "Escape":
        return node.textContent === "Clear";
      case "Enter":
        return node.textContent === "=";
      case "Backspace":
        return node.textContent === "Del";
      default:
        return node.textContent === event.key;
    }
  });
  if (btn) btn.click();
}

function calculate() {
  let prevNum = parseFloat(previousInput);
  let currNum = parseFloat(currentInput);

  switch (operator) {
    case "+":
      return prevNum + currNum;

    case "-":
      return prevNum - currNum;

    case "*":
      return prevNum * currNum;

    case "/":
      if (currNum === 0) {
        mainDisplay.textContent = "Cannot divide by zero!";
        return;
      }
      return prevNum / currNum;
  }
}

function updateMainDisplay(input) {
  mainDisplay.textContent = input;
}

let firstNumber, operator, secondNumber;
let typedNumbers = "";

const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const display = document.querySelector(".display");
const calculatorButtons = document.querySelector(".calculator-buttons");

function updateDisplay(event) {
  if (event.target.id === "zero" && display.textContent.startsWith("0")) {
    return;
  } else if (event.target.classList.contains("digit")) {
    typedNumbers =
      typedNumbers === "0"
        ? event.target.textContent
        : typedNumbers + event.target.textContent;
    display.textContent = typedNumbers;
  } else if (event.target.classList.contains("operator")) {
    typedNumbers = "";
  }
}

calculatorButtons.addEventListener("click", updateDisplay);

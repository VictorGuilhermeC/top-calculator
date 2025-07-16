function sum(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      sum(num1, num2);
      break;

    case "-":
      subtract(num1, num2);
      break;

    case "*":
      multiply(num1, num2);
      break;

    case "/":
      divide(num1, num2);
      break;
  }
}

const display = document.querySelector("#display");
let displayNum = display.innerText;

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
  if (display.innerText[0] === "0") {
    display.innerText = "";
  }
  switch (event.target.id) {
    case "one":
      display.innerText += "1";
      break;
    case "two":
      display.innerText += "2";
      break;
    case "three":
      display.innerText += "3";
      break;
    case "four":
      display.innerText += "4";
      break;
    case "five":
      display.innerText += "5";
      break;
    case "six":
      display.innerText += "6";
      break;
    case "seven":
      display.innerText += "7";
      break;
    case "eight":
      display.innerText += "8";
      break;
    case "nine":
      display.innerText += "9";
      break;
    case "zero":
      display.innerText += "0";
      break;
    case "allClear":
      display.innerText = 0;
  }
});

const state = {
  previous: "0",
  current: "0",
  operator: "",
  wasEvaluated: false,
};

const mainDisplay = document.querySelector("#main");
const buttons = document.querySelectorAll("button");
const calculatorButtons = document.querySelector(".calculator-buttons");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");
const delBtn = document.querySelector("#delete");
const sepBtn = document.querySelector("#decimal-separator");

//Event handlers

calculatorButtons.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("digit")) {
    takeDigit(target.textContent);
  } else if (target.classList.contains("operator")) {
    takeOperator(target.textContent);
  }
});

clearBtn.addEventListener("click", (event) => {
  state.operator = "";
  state.current = state.previous = "0";
  state.wasEvaluated = false;
  updateMainDisplay();
});

delBtn.addEventListener("click", (event) => {
  if (state.wasEvaluated) return;
  state.current = state.current.slice(0, state.current.length - 1);
  if (state.current === "") state.current = "0";
  updateMainDisplay();
});

sepBtn.addEventListener("click", () => {
  if (state.wasEvaluated) {
    state.current = "0.";
    state.wasEvaluated = false;
    updateMainDisplay();
    return;
  }

  if (!state.current.includes(".")) {
    state.current += ".";
    updateMainDisplay();
  }
});

equalBtn.addEventListener("click", () => {
  if (!state.operator) return;

  const result = calculate();
  if (result === null) {
    showError();
    return;
  }

  state.current = result.toString();
  state.previous = "0";
  state.operator = "";
  state.wasEvaluated = true;

  updateMainDisplay();
});

//Auxiliary functions
document.addEventListener("keydown", keys);

function takeOperator(op) {
  if (state.operator !== "" && !state.wasEvaluated) {
    const result = calculate();
    if (result === null) {
      showError();
      return;
    }

    state.previous = result.toString();
    state.current = state.previous;
  } else {
    state.previous = state.current;
  }

  state.operator = op;
  state.current = "0";
  state.wasEvaluated = false;

  updateMainDisplay();
}

function takeDigit(num) {
  if (state.wasEvaluated) {
    state.current = num;
    state.wasEvaluated = false;
  } else if (state.current === "0") {
    state.current = num;
  } else {
    state.current += num;
  }

  updateMainDisplay();
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
  const prevNum = parseFloat(state.previous);
  const currNum = parseFloat(state.current);

  let result;

  switch (state.operator) {
    case "+":
      result = prevNum + currNum;
      break;
    case "-":
      result = prevNum - currNum;
      break;
    case "*":
      result = prevNum * currNum;
      break;
    case "/":
      result = prevNum / currNum;
      break;
    default:
      return null;
  }

  return Number.isFinite(result) ? result : null;
}

function updateMainDisplay(value = state.current) {
  mainDisplay.textContent = value;
}

function showError() {
  updateMainDisplay("Cannot divide by zero");

  state.previous = "0";
  state.current = "0";
  state.operator = "";
  state.wasEvaluated = false;
}

function updateUpperDisplay() {}

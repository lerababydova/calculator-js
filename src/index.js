const operationQueue = [];
let isResult = false;

const init = () => {
  let btnAc = document.querySelector(".ac");
  const equalOperator = document.querySelector(".equal");
  const result = document.querySelector(".result");
  const plusMinusBtn = document.querySelector(".plus-minus");
  const percent = document.querySelector(".percent");
  const dot = document.querySelector(".dot");

  const onSelectDigit = (digit) => {
    if (isResult) {
      operationQueue.length = 0;
      isResult = false;
    }

    const lastElement = operationQueue[operationQueue.length - 1];

    if (isNaN(lastElement)) {
      operationQueue.push(digit);
    } else if (!isNaN(lastElement) && (lastElement + digit).length <= 9) {
      operationQueue[operationQueue.length - 1] = String(
        Number(lastElement + digit)
      );
    }

    result.innerHTML = operationQueue[operationQueue.length - 1];
    console.log(operationQueue);
  };

  const onSelectOperator = (operator) => {
    if (operationQueue.length === 0 && (operator === "*" || operator === "/")) {
      return;
    }

    if (operationQueue.length === 0 && operator === "-") {
    }

    const lastElement = operationQueue[operationQueue.length - 1];

    if (isNaN(lastElement)) {
      operationQueue[operationQueue.length - 1] = operator;
    } else {
      operationQueue.push(operator);
    }
    isResult = false;
  };

  const onEqualClick = () => {
    const calcResult = eval(operationQueue.join(""));
    result.innerHTML = Number(calcResult.toFixed(8));
    operationQueue.length = 0;
    operationQueue.push(calcResult);
    isResult = true;
  };

  const onPlusMinusClick = () => {
    const lastElement = operationQueue[operationQueue.length - 1];
    operationQueue[operationQueue.length - 1] = -lastElement;
    result.innerHTML = -lastElement;
  };

  const onPercentClick = () => {
    const lastElement = operationQueue[operationQueue.length - 1] / 100;
    result.innerHTML = lastElement;
    operationQueue[operationQueue.length - 1] = lastElement;
  };

  const onDotClick = () => {
    console.log(operationQueue);
    const lastElement = operationQueue[operationQueue.length - 1];
    if (!isResult && lastElement.includes(".")) {
      return;
    }
    const nextElement = (isResult ? "0" : lastElement) + ".";
    result.innerHTML = nextElement;
    operationQueue[operationQueue.length - 1] = nextElement;
  };

  const clearAll = () => {
    operationQueue.length = 0;
    const result = document.querySelector(".result");
    result.innerHTML = 0;
  };

  btnAc.addEventListener("click", clearAll);

  [
    document.querySelector(".zero"),
    document.querySelector(".one"),
    document.querySelector(".two"),
    document.querySelector(".three"),
    document.querySelector(".four"),
    document.querySelector(".five"),
    document.querySelector(".six"),
    document.querySelector(".seven"),
    document.querySelector(".eight"),
    document.querySelector(".nine"),
  ].forEach((didgitBtn) =>
    didgitBtn.addEventListener("click", (event) =>
      onSelectDigit(event.target.textContent)
    )
  );

  [
    document.querySelector(".minus"),
    document.querySelector(".plus"),
    document.querySelector(".multiply"),
    document.querySelector(".division"),
  ].forEach((operatorBtn) =>
    operatorBtn.addEventListener("click", (event) =>
      onSelectOperator(event.target.textContent)
    )
  );

  equalOperator.addEventListener("click", onEqualClick);
  plusMinusBtn.addEventListener("click", onPlusMinusClick);
  percent.addEventListener("click", onPercentClick);
  dot.addEventListener("click", onDotClick);

  document.addEventListener("keydown", (event) => {
    console.log(event);
    switch (event.key) {
      case "Enter":
        onEqualClick();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        onSelectDigit(event.key);
        console.log(event);
        break;

      case "-":
      case "+":
      case "/":
      case "*":
        onSelectOperator(event.key);
        break;

      case "%":
        onPercentClick(event.key);
        break;
    }
  });
};

document.addEventListener("DOMContentLoaded", init);

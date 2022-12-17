/* to convert a number to 2 to 2 decimals ====>  x = parseFloat(x).toFixed(2)  */
/*------------------------------------------------------------------*/

window.onload = allClear;

let inputField = document.getElementById(`addNumber`);
let outputField = document.getElementById(`output`);
outputField.readOnly = true;
let num1, num2, num1Int, num2Int, num1Dec, num2Dec, resInt, resDec;
let addition,
  subtraction,
  multiplication,
  division,
  firstCalc = false;
let result, tempResult;

/* -------------------------------------------------------------------------------------- */
/* Function addNum() adds numbers clicked on the keyboard to the input field */

function addNum(num) {
  inputField.value += num;

  let input = ``;
  input = inputField.value;
  input = input.split(`.`);

  if (input.length > 2) {
    // detects if a 2nd dot was used, if so then alert will display and the additional dot will be deleted
    del();
    document.getElementsByClassName(`dot`).onclick = alert(
      `Only one dot can be used`
    );
  }

  if (input[1].length > 2) {
    del();
    document.getElementsByClassName(`box`).onclick = alert(
      `Only 2 decimals can be used`
    );
  }

  if (Number(input[1]) > 15) {
    del();
    document.getElementsByClassName(`box`).onclick = alert(
      `The ounces cannot be higher than 15`
    );
  }

  if (multiplication && inputField.value.indexOf('.') != -1) {
    del();
    document.getElementsByClassName(`box`).onclick = alert(
      `You can only multiply by integers`
    );
  } else if (division && inputField.value.indexOf('.') != -1) {
    del();
    document.getElementsByClassName(`box`).onclick = alert(
      `You can only divide by integers`
    );
  }
}

/* -------------------------------------------------------------------------------------- */
/* Function allClear() adds AC functionality to the calculator */

function allClear() {
  inputField.value = ``;
  outputField.innerHTML = ``;
  addition = subtraction = multiplication = division = firstCalc = false;
  num1 =
    num2 =
    num1Int =
    num2Int =
    num1Dec =
    num2Dec =
    resInt =
    resDec =
    result =
      0;
}

/* -------------------------------------------------------------------------------------- */
/* Function del() deletes the last character put in the input field */

function del() {
  inputField.value = inputField.value.slice(0, inputField.value.length - 1);
}

/* -------------------------------------------------------------------------------------- */
/* Function convert() converts the FIRST number to string for the output and implements distinction mechanism beween decimals like 2.1 and 2.10 */

function convert1(x) {
  let strArray = [];

  if (x - Math.floor(x) > 0) {
    // if the number has any decimals
    x = String(x);
    strArray = x.split(`.`);
    num1Int = strArray[0];
    num1Dec = strArray[1];
    console.log(num1Int + ` and ` + num1Dec);
  } else {
    x = String(x);
    num1Int = x;
    num1Dec = 0;
  }

  if (firstCalc) {
    outputField.innerHTML = ``;
  }

  outputField.innerHTML += `${num1Int} <span class="lboz">lb</span> ${num1Dec} <span class="lboz">oz</span>`;
  return x;
}

/* -------------------------------------------------------------------------------------- */
/* Function convert() converts the SECOND number to string for the output and implements distinction mechanism beween decimals like 2.1 and 2.10 */

function convert2(x) {
  let strArray = [];

  if (x - Math.floor(x) > 0) {
    // if the number has any decimals
    x = String(x);
    strArray = x.split(`.`);
    num2Int = strArray[0];
    num2Dec = strArray[1];
  } else {
    x = String(x);
    num2Int = x;
    num2Dec = String(0);
  }

  if (addition || subtraction) {
    outputField.innerHTML += `${num2Int} <span class="lboz">lb</span> ${num2Dec} <span class="lboz">oz</span> `;
  } else if (multiplication || division) {
    outputField.innerHTML += `${num2Int} `;
  }

  x = Number(x);

  return x;
}

/* -------------------------------------------------------------------------------------- */
/* Function add() == ADDITION  */

function add() {
  addition = true;
  num1 = convert1(inputField.value);
  outputField.innerHTML += ` <span class="asmd">+</span> `;

  inputField.value = ``;
}

/* -------------------------------------------------------------------------------------- */
/* Function subtract() == SUBTRACTION  */

function subtract() {
  subtraction = true;
  num1 = convert1(inputField.value);
  outputField.innerHTML += ` <span class="asmd">-</span> `;
  inputField.value = ``;
}

/* -------------------------------------------------------------------------------------- */
/* Function multiplicate() == MULTIPLICATION  */

function multiplicate() {
  multiplication = true;
  num1 = convert1(inputField.value);
  outputField.innerHTML += ` <span class="asmd">*</span> `;
  inputField.value = ``;
}

/* -------------------------------------------------------------------------------------- */
/* Function divide() == DIVISION  */

function divide() {
  division = true;
  num1 = convert1(inputField.value);
  outputField.innerHTML += ` <span class="asmd">/</span> `;
  inputField.value = ``;
}

/* -------------------------------------------------------------------------------------- */
/* Function equals() == SUMs UP everything, performs the final calculation and display the results */

function equals() {
  firstCalc = true;

  num2 = convert2(inputField.value);

  console.log(`num1Int is ${num1Int} and num2Int is ${num2Int}`);
  console.log(`num1Dec is ${num1Dec} and num2Dec is ${num2Dec}`);

  if (addition) {
    tempResult =
      Number(num1Int) * 16 +
      Number(num1Dec) +
      (Number(num2Int) * 16 + Number(num2Dec));
    console.log(`tempresult is ${tempResult}`);
  } else if (subtraction) {
    tempResult =
      Number(num1Int) * 16 +
      Number(num1Dec) -
      (Number(num2Int) * 16 + Number(num2Dec));
  } else if (multiplication) {
    tempResult = (Number(num1Int) * 16 + Number(num1Dec)) * num2;
  } else if (division) {
    tempResult = (Number(num1Int) * 16 + Number(num1Dec)) / num2;
  }

  resInt = Math.floor(tempResult / 16);
  resDec = tempResult % 16;
  console.log(`resDec is ${resDec}`);
  console.log(`resInt is ${resInt}`);

  if (resDec === 10) {
    result = parseFloat(resInt + resDec / 100).toFixed(2);
  } else {
    result = resInt + resDec / 100;
  }

  console.log(`Result without 0 as the 1st decimal is ${result}`);

  console.log(`result is ${result}`);
  console.log(`addition is ${addition}`);

  inputField.value = result;

  addition = subtraction = multiplication = division = false;
  num1 =
    num2 =
    num1Int =
    num2Int =
    num1Dec =
    num2Dec =
    resInt =
    resDec =
    result =
    tempResult =
      0;
}

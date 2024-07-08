let add = (a, b) => Math.round((a + b) * 100) / 100;
let subtract = (a, b) => Math.round((a - b) * 100) / 100;
let multiply = (a, b) => Math.round((a * b) * 100) / 100;
let divide = (a, b) => {
    if (b != 0) {
        return Math.round((a / b) * 100) / 100;
    }
    else {
        return "SERIOUSLY!?";
    }
};
let operate = (a, op, b) => {
    a = Number(a);
    b = Number(b);
    switch (op) {
        case "+":
            return String(add(a, b));

        case "-":
            return String(subtract(a, b));

        case "*":
            return String(multiply(a, b));

        case "/":
            return String(divide(a, b));
    }
}

function createButtons() {
    let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let rowNumber = 1; rowNumber < 6; rowNumber++) {
        const row = document.createElement("div");
        row.setAttribute("class", "buttonRow");

        for (let buttonNumber = 1; buttonNumber < 5; buttonNumber++) {
            const button = document.createElement("div");
            button.setAttribute("class", "button")

            if (rowNumber == 1) {
                switch (buttonNumber) {
                    case 1:
                        button.textContent = "AC";
                        button.setAttribute("class", "button ac");
                        break;

                    case 2:
                        button.textContent = "DEL";
                        button.setAttribute("class", "button del");
                        break;

                    default:
                        break;
                }
            }

            else if (rowNumber < 5) {
                if (buttonNumber == 4) {
                    switch (rowNumber) {
                        case 2:
                            button.textContent = "+";
                            button.setAttribute("class", "button plus");
                            break;

                        case 3:
                            button.textContent = "-";
                            button.setAttribute("class", "button minus");
                            break;

                        case 4:
                            button.textContent = "*";
                            button.setAttribute("class", "button multiply");
                            break;
                    }
                }

                else {
                    button.textContent = numberArray.shift();
                }
            }

            else {
                switch (buttonNumber) {
                    case 1:
                        button.textContent = ".";
                        button.setAttribute("class", "button period");
                        break;

                    case 2:
                        button.textContent = "0";
                        break;

                    case 3:
                        button.textContent = "=";
                        button.setAttribute("class", "button enter");
                        break;

                    case 4:
                        button.textContent = "/";
                        button.setAttribute("class", "button divide");
                        break;
                }
            }

            if (rowNumber == 1) {
                if (buttonNumber < 3) {
                    row.appendChild(button);
                }
            }

            else {
                row.appendChild(button);
            }
        }
        buttons.appendChild(row);
    }
}

function buttonClicked(ev) {
    let textArray;
    let numArray;
    let delChar;
    let target = ev.target;
    let targetClass = target.getAttribute("class");

    if (targetClass != "buttons"
        && targetClass != "buttonRow"
        && targetClass.includes("button")
        && text.value.length < 20) {
            if (targetClass.includes("ac")) {
                clearVariables();
            }

            else if (targetClass == "button del") {
                if (text.value == "SERIOUSLY!?") {
                    clearVariables()
                }
                
                else {
                    textArray = text.value.split("");
                    delChar = textArray.pop();
    
                    if (delChar == ".") {
                        periodActive = true;
                        periodHistory = false;
    
                        if (operationHistory) {
                            numArray = secondNumber.split("");
                            numArray.pop();
                            secondNumber = numArray.join("");
                        }
    
                        else {
                            numArray = firstNumber.split("");
                            numArray.pop();
                            firstNumber = numArray.join("");
                        }
                    }
    
                    else if (NUMBERS.includes(delChar)) {
                        if (operationHistory) {
                            numArray = secondNumber.split("");
                            numArray.pop();
                            secondNumber = numArray.join("");
    
                            if (!secondNumber.length) {
                                periodActive = false;
                                periodHistory = false;
                                operationActive = false;
                            }
                        }
    
                        else {
                            numArray = firstNumber.split("");
                            numArray.pop();
                            firstNumber = numArray.join("");
    
                            if (!firstNumber.length) {
                                periodActive = false;
                                periodHistory = false;
                                operationActive = false;
                            }
                        }
                    }
    
                    else {
                        operationActive = true;
                        operationHistory = false;
                    }
    
                    text.value = textArray.join("");
                }
            }

            else {
                if (targetClass == "button") {
                    if (text.value != "SERIOUSLY!?") {
                        text.value += target.textContent;
                    }
                    else {
                        clearVariables();
                        text.value += target.textContent;
                    }

                    if (operationHistory) {
                        secondNumber += target.textContent;
                        equalActive = true;
                    }

                    else {
                        firstNumber += target.textContent;
                    }

                    operationActive = true;
                    
                    if (!periodHistory) {
                        periodActive = true;
                    }
                }

                else if (targetClass.includes("period") && periodActive) {
                    operationHistory ? secondNumber += "." : firstNumber += ".";
                    text.value += "."
                    periodActive = false;
                    periodHistory = true;
                }

                else if (targetClass.includes("button")
                    && !targetClass.includes("enter")
                    && !targetClass.includes("period")
                    && operationActive) {
                        if (operationHistory) {
                            firstNumber = operate(firstNumber, operator, secondNumber);
                            
                            if (firstNumber != "SERIOUSLY!?") {
                                secondNumber = "";
                                operator = target.textContent;
                                text.value = firstNumber + target.textContent;
                                operationActive = false;
                                equalActive = false;
                            }

                            else {
                                text.value = firstNumber;
                            }
                        }
                        else {
                            text.value += target.textContent;
                            operator = target.textContent;
                            operationActive = false;
                            operationHistory = true;
                        }
                        periodHistory = false;
                    }

                else if (targetClass == "button enter" && equalActive) {
                    firstNumber = operate(firstNumber, operator, secondNumber);
                    operator = "";
                    secondNumber = "";
                    text.value = firstNumber;
                    operationHistory = false;
                    equalActive = false;
                    periodHistory = false;
                    periodActive = true;
                }
            }
    }
}

function clearVariables() {
    text.value = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    operationActive = false;
    operationHistory = false;
    equalActive = false;
    periodActive = false;
    periodHistory = false;
}

document.addEventListener("DOMContentLoaded", createButtons);

const buttons = document.querySelector(".buttons");
const text = document.querySelector(".displayText");
const NUMBERS = "01233456789";
let operationActive = false;
let operationHistory = false;
let equalActive = false;
let periodActive = false;
let periodHistory = false;
let firstNumber = "";
let operator = "";
let secondNumber = "";

buttons.addEventListener("click", (event) => buttonClicked(event));
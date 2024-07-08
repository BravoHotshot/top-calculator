let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;
let operate = (a, op, b) => {
    switch (op) {
        case "+":
            add(a, b);
            break;

        case "-":
            subtract(a, b);
            break;

        case "*":
            multiply(a, b);
            break;

        case "/":
            divide(a, b);
            break;
    }
}

function createButtons() {
    let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let rowNumber = 1; rowNumber < 5; rowNumber++) {
        const row = document.createElement("div");
        row.setAttribute("class", "buttonRow");

        for (let buttonNumber = 1; buttonNumber < 5; buttonNumber++) {
            const button = document.createElement("div");
            button.setAttribute("class", "button")

            if (rowNumber < 4) {
                if (buttonNumber == 4) {
                    switch (rowNumber) {
                        case 1:
                            button.textContent = "+";
                            button.setAttribute("class", "button plus");
                            break;

                        case 2:
                            button.textContent = "-";
                            button.setAttribute("class", "button minus");
                            break;

                        case 3:
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
                        button.textContent = "AC";
                        button.setAttribute("class", "button ac");
                        break;

                    case 2:
                        button.textContent = "0";
                        break;

                    case 3:
                        button.textContent = "=";
                        break;

                    case 4:
                        button.textContent = "/";
                        button.setAttribute("class", "button divide");
                        break;
                }
            }
            row.appendChild(button);
        }
        buttons.appendChild(row);
    }
}

function buttonClicked(ev) {
    let target = ev.target;
    let targetClass = target.getAttribute("class");

    if (targetClass != "buttons"
        && targetClass != "buttonRow"
        && targetClass.includes("button")
        && text.value.length < 20) {
            if (targetClass.includes("ac")) {
                text.value = "";
            }
            else {
                text.value += target.textContent;
            }
    }
}

document.addEventListener("DOMContentLoaded", createButtons);
const buttons = document.querySelector(".buttons");
const text = document.querySelector(".displayText");
buttons.addEventListener("click", (event) => buttonClicked(event));
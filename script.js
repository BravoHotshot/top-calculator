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
    const buttons = document.querySelector(".buttons");

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
                            break;

                        case 2:
                            button.textContent = "-";
                            break;

                        case 3:
                            button.textContent = "*";
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
                        button.textContent = "0";
                        break;

                    case 2:
                        button.setAttribute("class", "button enter");
                        button.textContent = "ENTER";
                        break;

                    case 3:
                        button.textContent = "/";
                        break;
                }
            }
            if (rowNumber != 4 || buttonNumber != 4) {
                row.appendChild(button);
            }
        }
        buttons.appendChild(row);
    }
}

document.addEventListener("DOMContentLoaded", createButtons);
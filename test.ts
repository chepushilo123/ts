type actionType = "+" | "-" | "*" | "/" | "h";

interface ICAlculator {
    inpuArea: null;
    historyArea: null;
    blockAcrion: boolean;

    handler: (event: MouseEvent) => void;
    updateInput: (symbol: "+" | "-" | "*" | "/" | "h" | "R") => boolean;
    clear: () => void;
    execute: () => void;
    parse: (str: string, tmp: string) => string[];
    run: (firsValue: number, action: string, secondValue: number) => string;
    updateHistory: (value: string) => void;
}

const calculator: ICAlculator = {

    inputArea: null,
    historyArea: null,

    blockAction: false,

    handler: function (event) {
        let target = event.target as HTMLInputElement;
        (this as calculator).inputArea = document.querySelector(".input_area_text");
        (this as calculator).historyArea = document.querySelector(".history");

        switch ((target as).className) {
            case "input_symbol_button":
                calculator.updateInput(target.value);
                break;
            case "action_symbol_ce":
                calculator.clear();
                break;
            case "action_symbol_execute":
                calculator.execute();
        }
    },

    updateInput(symbol) {
        if (symbol === 'R') {
            if (calculator.isActionSymbol(calculator.inputArea.value.at(-1))) {
                calculator.blockAction = false;
            }
            calculator.inputArea.value = calculator.inputArea.value.slice(0, -1);

        } else if (calculator.isActionSymbol(symbol)) {
            if (!calculator.blockAction) {
                calculator.inputArea.value += symbol;
                calculator.blockAction = true;
            }

        } else {
            calculator.inputArea.value += symbol;
        }
    },

    isActionSymbol(symbol) {
        return symbol === "+" || symbol === "-" || symbol === "*" || symbol === "/" || symbol === "h";
    },

    clear() {
        calculator.inputArea.value = "";
        calculator.blockAction = false;
    },

    execute: function () {
        let expression = calculator.parse(calculator.inputArea.value);
        if (expression.length === 3)    {
            let result = calculator.run(expression[0], expression[1], expression[2]).toFixed(3);
            calculator.inputArea.value = result;

            calculator.updateHistory(expression[0] + expression[1] + expression[2] + "=" + result);
            calculator.blockAction = false;
        }                
    },

    parse(str) {
        let result: string[] = [];
        let tmp = '';

        for (let char of str) {
            if ((+char >= 0 && +char <= 9) || char === '.') {
                tmp += char;
            } else {
                result.push(tmp);
                result.push(char);
                tmp = '';
            }
        }
        result.push(tmp);

        return result;
    },

    run(firstValue, action, secondValue) {
        switch (action) {
            case "+":
                return firstValue + secondValue;
            case "-":
                return firstValue - secondValue;
            case "*":
                return firstValue * secondValue;
            case "/":
                return firstValue / secondValue;
            case "h":
                return Math.pow(firstValue, secondValue);
        }
        return "";
    },

    updateHistory(value)    {
        this.historyArea.innerHTML += "<p>" + value + "</p>";
    }

};

let calc = document.querySelector(".calc") as HTMLDivElement;
calc.addEventListener('click', calculator.handler);
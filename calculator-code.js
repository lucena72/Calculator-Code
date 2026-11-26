
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;

        if (value === "AC") {
            expression = "";
            display.value = "";
            return;
        }

        if (value === "DEL") {
            expression = expression.slice(0, -1);
            display.value = expression;
            return;
        }

        if (value === "=") {
            try {
                if (!expression.trim()) return;

                // Converte porcentagens para operações decimais
                let calculation = expression.replace(
                    /(\d+(?:\.\d+)?)%/g,
                    "($1/100)"
                );

                if (!/^[0-9+\-*/().\s]+$/.test(calculation)) {
                    throw new Error("Expressão inválida");
                }

                const result = Function(
                    '"use strict"; return (' + calculation + ')'
                )();

                if (!Number.isFinite(result)) {
                    throw new Error("Resultado inválido");
                }

                expression = String(result);
                display.value = expression;

            } catch {
                display.value = "Erro";
                expression = "";
            }

            return;
        }

        expression += value;
        display.value = expression;
    });
});

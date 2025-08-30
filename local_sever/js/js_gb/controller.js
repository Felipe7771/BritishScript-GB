const data = require("./data_gb");
import {Slave, Coin} from "./types_gb";
import {    new_alias,
    new_coin,
    new_slave,
    obj,
    new_var} from "./functs_gb";

//state:   (BOOLEAN) situação do código estiver certo ou errado
let State = true

function Execute(){

    /*
    code :    (STRING) código bruto do usuário
    lines:    (ARRAY)  código de cada linha
    commands: (ARRAY)  comandos dentro da linha
    */
    const code = document.getElementById("editor");
    const painel = document.getElementById("editorConsole");
    const lines = code.split(/\r?\n/);

    // início do cronometro
    const time_up = performance.now();

    for(let line = 0; line < lines.length; line++){

        let checked = estruture_check(lines[line],line);
        if(setState(checked)){break}
    }

    // fim do cronometro
    const time_down = performance.now();
    const total_time = time_down - time_up;

    if (State){
        painel.innerHTML = painel.innerHTML 
        + 
        `<br><br> Behold! Completed in a mere ${total_time} milliseconds — a triumph of British mastery!`;
    } else {
        painel.innerHTML = painel.innerHTML 
        +
        `<span style="color: rgba(255, 0, 0, 1)">`
        + 
        `<br><br> Egad! An error dares appear on line ${checked.line} — utterly intolerable!<br>.<br>`
        +
        `${checked.message}`
        +
        `The program was terminated in a mere ${total_time} milliseconds — utterly disgraceful!`
        +
        `</span>`;
    }
}

// ======================================================
// TRATAMENTO DE ERROS
// ======================================================
function setState(new_possible_state){
    State = new_possible_state;
    return State
}

function estruture_check(content, line){

    // Verificar se a primeira letra é maiúscula
    if (content[0] !== content[0].toUpperCase()){

        return {result: false,
        message: `Absurd! Division by base zero is a mathematical atrocity.`,
        content: "",
        line: line};
    }

    // Verificar se a linha foi fechada com ",","?" ou "!"
    if (![",","?","!"].includes(content[content.length - 1])){

    }
}
import { vars } from "./data_gb.js";
// import {Slave, Coin} from "./types_gb.js";
import readCommands from "./Readcommand.js";

//State:     (BOOLEAN) situação do código estiver certo ou errado
//checked: (DICTONARY) retorno de resuldados de uma checagem
let State = true
let checked = {}

function Execute(){

    /*
    code :    (STRING) código bruto do usuário
    lines:    (ARRAY)  código de cada linha
    commands: (ARRAY)  comandos dentro da linha
    */

    const code = document.getElementById("editor").innerText;
    let painel = document.getElementById("editorConsole");
    const lines = code.split(/\r?\n/);

    //limpar conteúdo anterior do console
    painel.innerHTML = "";

    // esvariar variável criadas anteriormente
    for (const key of Object.keys(vars)) {
    delete vars[key]; // Remove cada propriedade
    }

    // início do cronometro
    const time_up = performance.now();

    for(let line = 0; line < lines.length; line++){

        if(lines[line] === ''){continue}

        // primeira checagem de a estrurura de linha está correta
        checked = estruture_check(lines[line],line);
        if(!setState(checked.result)){break;}

        // leitura dos comandos escritos
        checked = readCommands(painel, lines[line], line);
        if(!setState(checked.result)){break;}
        
    }

    // for (let key in vars){
    //     painel.innerText = painel.innerText + key + ":" + vars[key].value + " (" + vars[key].constructor.name + ")"
    // }

    // fim do cronometro
    const time_down = performance.now();
    const total_time = time_down - time_up;

    // FINALIZAÇÃO DO CÓDIGO
    // exibição de fim de código ou erro cometido
    finishingCode(State, painel, total_time);
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

        const commands = content.split(" ");

        return {result: false,
        message: `Appalling! A syntax error — the word <strong>"${commands[0]}"</strong> must, by all dignity, commence in upper case`,
        content: "",
        line: line};
    }

    // Verificar se a linha foi fechada com ",","?" ou "!"
    if (![",","?","!"].includes(content[content.length - 1])){
        return {result: false,
        message: `Preposterous! A syntax error — the line must conclude with a period, namely <strong>","</strong>`,
        content: "",
        line: line};
    }

    return {result: true,
    message: ``,
    content: "",
    line: line};
}

function finishingCode(State,painel,total_time){

    if (State){
        painel.innerHTML = painel.innerHTML 
        + 
        `<br><br><i> Behold! Completed in a mere ${total_time} milliseconds — a triumph of British mastery!</i>`;
    } else {
        painel.innerHTML = painel.innerHTML 
        +
        `<span style="color: rgba(255, 0, 0, 1)">`
        + 
        `<br><br><i> Egad! An error dares appear on line ${checked.line+1} — utterly intolerable!<br>.<br></i>`
        +
        `<u>${checked.message}</u>`
        +
        `<br><i>The program was terminated in a mere ${total_time} milliseconds — utterly disgraceful!</i>`
        +
        `</span>`;
    }
}

// ======================================================
// FUNÇÕES PRÁTICAS
// ======================================================

document.getElementById("btn").addEventListener("click", Execute);
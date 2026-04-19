import { types, vars } from "./data_gb.js";
import {new_var, ValuePermited} from "./functs_gb.js";
import { IsNewVar_method } from "./commands/IsNewVar.js";
import { IsShowMessage_method } from "./commands/IsShowMessage.js";

// todo linha de código deve executar algo CASO não seja um comentário
// então, se nada for executado, a linha não está valida ao código, logo, contém erro
let line_valided = false;
let error_detected = false;

export function readCommands(painel, content, line){

    /*
    (painel)  => objeto; div de console do usuário de exibição de informações
    (content) => string; linha de texto escrito
    (line)    => int;    número da linha
    */
    line_valided = false;
    error_detected = false;

    // divisão da linha nos comandos (functs) escritos
    let commands = content.toLowerCase().split(" ");

    let line_comment = commands.length;
    let response = {}
    /**
     * (line_comment) => indice do (commands) a qual os (functs) posteriores sejam ignorados
     * (result)       => retorno de dados
     * 
     */

    // -----

    // Determina parte da linha que é um comentário
    line_comment = IsComment(commands); // ! Atribuindo valor ao (line_comment)
    
    // leitura dos (functs) dentro do (commands)
    for (let item = 0; item < commands.length; item++){

        // Verificar se os próximos (functs) são comentários
        if(item >= line_comment){line_comment = true; break} // ! Encerra essa linha, mas valida ela

        let funct = commands[item];

        // BLOCO DE CHECAGEM ---
        // Checando se nenhum funct foi escrito
        IsNullLine(commands); // ! Altera o estado de (line_valided)

        // ---

        // BLOCO DE COMANDOS ---
        // Detectando se a linha está criando uma Nova variável
        response = IsNewVar_method(commands, line);
        if (!response.result){error_detected = true; break}
        if (response.operation){line_valided = true; break}

        // Detectando se a linha está querendo exibir um texto ao painel
        response = IsShowMessage_method(painel,commands, line);
        if (!response.result){error_detected = true; break}
        if (response.operation){line_valided = true; break}
    }

    if (error_detected) {

        return response;
    } else if (!line_valided) {

        return {result: false, operation: false, message: `Nonsense! The content "${commands}" is unknown within the code.`, content: "", line: line}
    } else {

        return {result: true, operation: true, message: ``, content: "", line: line}
    }
}
// ========================================================================

// * Verifica se a linha está totalmente vazia
// Parametros: commands, todos os comandos digitados
// Retorno:    se vazia, retorna ao programa que a linha não é inválida
function IsNullLine(commands){

    if(commands.length === 1 && commands[0] === ''){
        something_happend = true;
    }
}

// * Determina o ponto onde o inicia os comentários
// Parametros: commands, todos os comandos digitados
// Retorno:    determina indice de aonde está o //
function IsComment(commands){

    return commands.indexOf("//") !== -1? commands.indexOf("//"): commands.length;
}


export default readCommands;
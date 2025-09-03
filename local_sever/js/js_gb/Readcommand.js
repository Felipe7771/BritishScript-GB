import { types, vars } from "./data_gb.js";
import {Slave, Coin} from "./types_gb.js";
import {new_var, ValuePermited} from "./functs_gb.js";

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
        response = IsNewVar(commands, line);
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

// * Executa função de criação de Variável
// Parametros: commands, todos os comandos digitados
//             line, linha que está ocorrendo o processo
// Retorno:    se existir, determina indice de aonde está
function IsNewVar(commands, line){

    // Uma inicialização de nova variável possui
    // [Tipo] [name] = [value], ou
    // [Tipo] [name],
    
    // O nome da variável, acaso esteja sendo criado, deve ser novo ao banco
    if (commands[1] in vars) { return {result: true, operation: false, message: ``, content: "", line: line}}

    // Verificação de, com tamanho superior a 4, possui o comando "do" ou "for"
    if (!(commands.length >= 4 && (commands[2] === "do" || commands[2] === "for")) ){ return {result: true, operation: false, message: ``, content: "", line: line}}

    // Verificação de tipo selecionado existe ao código
    if (!(commands[0] in types)){ return {result: false, operation: false, message: `Absurd! The type "${commands[0]}" exists not within the code.`, content: "", line: line}}

    // Verificação do nome ser válido
    if (!NameValid(commands[1])){ return {result: false, operation: false, message: `Preposterous! The "${commands[1]}" name is no valid variable.`, content: "", line: line}}

    const isNoble = commands[0] == "noble";
    // Criação de Variável
    if (commands[2] === "do"){

        if (commands[0] === "alias"){ return {result: false, operation: false, message: `Absurd! One does not instantiate an Alias with 'do'; employ 'for', if you please.`, content: "", line: line}}

        let check = ValuePermited(commands[0], commands[3], line);
        if (!check.result){return check}

        if (isNoble){ commands[0] = check.type; }
        
        new_var(commands[1],commands[0],commands[3],isNoble,"");
        return {result: true, operation: true, message: ``, content: "", line: line}

    } else if (commands[2] === "for") {


        if(commands[0] !== 'alias'){ return {result: false, operation: false, message: `Preposterous! Only an Alias may use 'for'; others must employ 'do'.`, content: "", line: line}}

        if(!(commands[3] in vars)){ return {result: false, operation: false, message: `Egad! The variable "${commands[1]}", bound to "${commands[3]}", simply does not exist!`, content: "", line: line}}

        new_var(commands[1],commands[0],"",isNoble,commands[3])
        return {result: true, operation: true, message: ``, content: "", line: line}


    } else if (commands[0] !== "noble") {

        new_var(commands[1],commands[0],"",false,"")
        return {result: true, operation: true, message: ``, content: "", line: line}
    }

    return {result: false, operation: false, message: `Intolerable! A noble constant "${commands[1]}" cannot be birthed void of value.`, content: "", line: line}
}

// * Executa função de criação de Variável
// Parametros: name, nome da variável do usuário
// Retorno:    se permitido, retorna true
function NameValid(name){
    /** Para o nome ser válido, ele não pode ter
     * Número na primeira letra do nome
     * Caracteres especiais na primeira e ultima letra do nome
     */
    const special_chars = /^[^a-zA-Z0-9\s]/;
    return !(/\d/.test(name[0]) || special_chars.test(name[0]) || special_chars.test(name[name.length - 1]))
}


export default readCommands;
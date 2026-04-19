import { types, vars } from "./data_gb.js";
import {new_var, ValuePermited} from "./functs_gb.js";

// * Executa função de criação de Variável
// Parametros: commands, todos os comandos digitados
//             line, linha que está ocorrendo o processo
// Processo:
// se o comando estiver na estrutura de criação de vaga,
// ele verifica se todos os parametros estão corretos e executa o
// instanciamento dessa variável
// Retorno: dicionário do resultado da operação
export function IsNewVar_method(commands, line){

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


// * Verifica se o nome da variável é permitida para ser criada
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
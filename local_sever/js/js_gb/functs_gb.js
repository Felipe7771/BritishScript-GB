import { vars } from "./data_gb.js";
import {Slave, Coin} from "./types_gb.js";

export function new_var(name, type,value=null, noble=false, alias_var=""){

    // remove a vírgula da estrutura GB
    value = RemoveComma(value);
    value = RemoveQuote(value);


    switch(type){
        case "slave":
            new_slave(name,value,noble);
            break
        case "coin":
            new_coin(name,parseFloat(value),noble);
            break;
        case "alias":
            new_alias(name, alias_var);

    }
}

function obj(name){
    return vars[name];
}

function new_slave(name, value=null, noble=false,){
    vars[name] = new Slave(name,value,noble)

    return {result: true,
        message: ``,
        content: ""};
}

function new_coin(name, value=null, noble=false){
    vars[name] = new Coin(name,value,noble)

    return {result: true,
            message: ``,
            content: ""};
}

function new_alias(name, alias_var){

    vars[name] = obj(alias_var);
    return {result: true,
        message: ``,
        content: ""};
}

export function ValuePermited(type_var, value, line){
    const regexDecimal = /^\d+(?:\.\d+)?$/;

    switch(type_var){
        case "slave":

            return ValidQuote(value,line);

        case "coin":

            value = RemoveComma(value);
            

            if(regexDecimal.test(value)){
                return {result: true, operation: true, message: ``, content: "", line: line}
            } 
            return {result: false, operation: false, message: `Preposterous! Such a value is unworthy of a Coin variable.`, content: "", line: line}
        
        case "noble":
            value = RemoveComma(value);

            if (Count(value,"'") > 1 || Count(value,'"') > 1){
                return ValidQuote(value,line);

            } 
            
            if (regexDecimal.test(value)){
                return {result: true, operation: true, message: ``, content: "", line: line,type:"coin"}
            }
            return {result: false, operation: false, message: `Preposterous! Such a value is unworthy of a Coin variable.`, content: "", line: line}

    }
}

// Remove a virgula da estrutra base do GB caso venha acompanhado com o valor
function RemoveComma(value){
    return value === null? null: value.endsWith(",")? value.slice(0,-1):value
}

function RemoveQuote(value){
    return value === null? null: value.length > 1? value[0].replace('"','').replace("'","") + value.slice(1,-1) + value[value.length - 1].replace('"','').replace("'",""): value
}

function ValidQuote(value, line){
    value = RemoveComma(value);
    value = value.trim();

    if (value === null){
        return {result: true, operation: true, message: ``, content: "", line: line, type:""}
    }

    
    if(value.startsWith("'") && Count(value,"'") === 2 && (value.endsWith("'") || value.endsWith("',")) || (value.startsWith('"') && Count(value,'"') === 2  && (value.endsWith('"') || value.endsWith('",')))){

        return {result: true, operation: true, message: ``, content: "", line: line,type:"slave"}
    } else {

        return {result: false, operation: false, message: `Appalling! The quotation mark closure is disgracefully incomplete.`, content: "", line: line}
    }

}

function Count(value, item){
    let quant = 0
    for(let i = 0; i < value.length; i++){
        if (value[i] == item){
            quant++
        }
    }

    return quant
}
import { types, vars } from "./data_gb.js";
import { Count, IndicesItem} from "../functs_gb.js";

// * Executa o tratamento dos dados inseridos
// Parametros: commands, todos os comandos digitados
//             line, linha que está ocorrendo o processo
// Processo:
// Diferenciar texto, variável e operação, trocar varivável pelo seu valor
// e executar operação, devolvendo resultado
// Retorno: dicionário do resultado da operação, junto ao valor
export function ValueTreatment_method( content, line){
    localDoubleComma = []
    localMonoComma = []
    lengthContent = content.length

    CommasCheck = ["'",'"']

    for (let j = 0; j < CommasCheck.length; j++){
        let comma = CommasCheck[j]

        const quant_comma = Count(content,comma);

        // verificar se a quantidade de comma é par (está sendo aberto e fechado)
        if( quant_comma%2 !== 0){}

        let indices = IndicesItem(content,comma)

        // transferir textos para uma lista temporária
        // trocar no conteudo original de '"' para _, e "'" para $
        if(indices.length > 0){
            let localid = 0
            for( let idx = 0; idx < indices.length; idx++){

                if(j == 0){
                    localDoubleComma.push(content.slice(indices[idx]+1,indices[idx+1]))
                    content.replace('"'+localDoubleComma[localid]+'"',"_")
                } else {
                    localMonoComma.push(content.slice(indices[idx]+1,indices[idx+1]))
                    content.replace("'"+localMonoComma[localid]+"'","$")
                }

                localid++
            }
        }

    }

    // verificar se os concatenadores "wth" não estão no fim do conteudo
    if(content.lastIndexOf("wth") == lengthContent-1){}

    // local das partes do conteudo   // tipo do conteudo de cada parte
    let parts = [],                      typ_parts = []

    let Wthindices = IndicesItem(content,"wth")

    // separa o conteudo entre os "wth" encontrados,
    // guardados em parts[] e como "some" em typ_parts[]

    if(Wthindices.length > 0){
        length_idWth = Wthindices.length

        for( let idx = 0; idx < length_idWth; idx+=2){

            if (idx == 0){
                parts.push(content.slice(0,Wthindices[idx]))

            } else if(idx == length_idWth - 1){
                parts.push(content.slice(Wthindices[idx]+3))
                
            } else {
                parts.push(content.slice(Wthindices[idx]+3,Wthindices[idx+1]))

            }

            typ_parts.push("some")

        }

        if(indices.length > 0){
            // devolvendo os textos, agora pertencentes a seus lugares no parts[]
            // de _ para o texto em "" do localDoubleComma
            // de $ para o texto em '' do localMonoComma
            // todos agora tendo o valor "str" no typ_parts[]
            let id_for_local = 0
            for( let idx = 0; idx < parts.length; idx++){

                if(parts[idx] == "_"){

                    parts[idx] = localDoubleComma[id_for_local]
                    typ_parts[idx] = "str"
                    id_for_local++
                } else if(parts[idx] == "$"){

                    parts[idx] = localMonoComma[id_for_local]
                    typ_parts[idx] = "str"
                    id_for_local++
                }

                localid++
            }
        }

    } else {
        parts.push(content)
        typ_parts.push("some")
    }

    let response = ConvertPartsToTextFinal(parts, typ_parts, line)

}

// * Executa a conversão de variáveis e contas em valores finais
// Parametros: parts, divisões do conteúdo original
//             typ_parts, tipos do valores de cada divisão do parts[]
//             line, linha que está ocorrendo o processo

// Retorno: dicionário do resultado da operação, junto ao valor
function ConvertPartsToTextFinal(parts, typ_parts, line){
    const length_parts = parts.length

    for( let i = 0; i < length_parts; i++){

        // se a divisão é um texto (typ_parts == "str"), ignore esse, e passa para o próximo
        if (typ_parts[i] === "str"){ continue }

        // trocar valores de variáveis
        parts[i] = SearchVar(parts[i])

        const openBracket = Count(parts[i],"(")
        const closeBracket = Count(parts[i],")")

        // verificar se os parenteses estão se fechando
        if (openBracket !== closeBracket){}

        let operadors = SetOrderOperadors(parts[i], openBracket)

        

    }
}

// * Troca nomes de variáveis por seus valores
// Parametros: content, conteúdo do texto
// Retorno: o mesmo conteúdo agora com seus valores trocados
function SearchVar(content){
    // divsão do conteudo entre +, -, *, /, " "
    let content_list = content.split(/([+\-*/ ])/)

    // pegar os nomes das variáveis instanciadas do usuário e por em ordem decrescente
    let keys = Object.keys(vars)
    keys.sort((a, b) => b.length - a.length);

    for(let k = 0; k < content_list.length; k++){

        for( let key of keys){
            if(content_list[k].includes(key)){
                content_list[k].replace(key,vars[key])
            }
        }
    }

    return content_list.join("")


}

// * Troca nomes de variáveis por seus valores
// Parametros: content, conteúdo do texto
// Retorno: o mesmo conteúdo agora com seus valores trocados
function SetOrderOperadors(content, ThereSoBracket){

    const OpenBracket = "("
    const CloseBracket = ")"

    content.replace(" ","")

    let operation = []

    // verificar se possui parenteses
    if ( ThereSoBracket > 0) {

        for(let i = 0; i < content.length; i++){

            let indices_OpBrack = IndicesItem(content,OpenBracket)
            let indices_ClBrack = IndicesItem(content,CloseBracket)

            const length_idBrack = indices_OpBrack.length

            for(let brackt = 0; brackt < length_idBrack; brackt){

                let sub_content = content.slice(indices_OpBrack[length_idBrack-1-brackt]+1,indices_ClBrack[brackt])
                operation.push(sub_content)
                content.replace("("+sub_content+")","_")
            }

        }
    } else {
        operation.push(content)
    }
    
}
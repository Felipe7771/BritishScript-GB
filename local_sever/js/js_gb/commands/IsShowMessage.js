import { types, vars } from "./data_gb.js";
import { ValueTreatment_method } from "./ValueTreatment.js";

// * Executa função de Exibição de Conteúdo
// Parametros: painel, objeto "console" da página web
//             commands, todos os comandos digitados
//             line, linha que está ocorrendo o processo
// Processo:
// se o comando estiver na estrutura de exibição de texto,
// ele prepara o texto a ser exibido em um único valor string
// para ser exibido no painel
// Retorno: dicionário do resultado da operação
export function IsShowMessage_method(painel, commands, line){

    // uma inicialização de exibição de texto possui
    // Work [texto ...]
    if (commands[0].toLowerCase() !== "work"){ return {result: true, operation: false, message: ``, content: "", line: line}}

    let last = commands[commands.length - 1];

    // removendo o conteudo "," do ultimo comando para impedir problemas
    if (last === ','){ 
        commands.pop() 

    } else if (last.endsWith(',')){
        commands[commands.length - 1] = last.slice(0,-1);
    }

    // determinando todo o conteuto do texto que será exibido
    let content_4_text = commands.slice(1).join("");

    let response = ValueTreatment_method(content_4_text, line);

}
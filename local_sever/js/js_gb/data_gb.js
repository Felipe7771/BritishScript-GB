// local de identificação das variadas criadas
// NameVar: ObjetoVar
export let vars = {}

export let types = {
    'slave':'slave',
    'noble':'noble',
    'coin':'coin',
    'alias':'alias',
    'for':'for',
    'do':'do',
} 

/**
 * Envio de informações geral entre funções de execução ao painel de console
 * 
 * result    (boolean): retorno do resultado, sendo false em ERRO
 * operation (boolean): retorno do resultado da operação
 * message    (String): mensagem do resultado, geralmente usada em erro
 * content    (String): conteudo do resultado
 * line          (Int): linha de execução, geralmente usada em erro
 */


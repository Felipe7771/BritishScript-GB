function check_formatting_lines(id_line, total_lines, line){
    // verificar se tem letra maiúscula no inicio da linha
    console.log(line[0])
    if (line[0] !== line[0].toUpperCase()){
        throw new CaseFormatError(line,'message',id_line+1,0)
    }
    // se for a última linha, verificar se há ' .' no 
    if (id_line == total_lines-1 && line.slice(-2) !== ' .'){
        throw new FinalPointFormatError(line,'message',id_line+1,line.length-1)
    }
    // se for uma qualquer, verificar se há ' ,' no fim
    else if (id_line !== total_lines-1 && line.slice(-2) !== ' ,'){
        throw new EndLineCommaFormatError(line,'message',id_line+1,line.length-1)
    }

}
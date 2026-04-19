function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function run_histora() {
    const Initial_time = performance.now();

    // conteúdo do prompt
    const data_font = highlight.innerText
    const lines_font = data_font.split(/\r?\n/)

    // eliminar linhas vazias do código
    const lines = lines_font.filter((line) => line.trim() !== '')
    const total_lines = lines.length

    console.log(lines)

    // startingTerminal()

    // identificar blocos de comando
    // em breve...

    // analisar cada linha
    try {
        for (let id_line = 0; id_line < total_lines; id_line++) {

            let line = lines[id_line]
            // verificar se a formatação padrão da linha está coerente
            check_formatting_lines(id_line, total_lines, line)
        }

    } catch (err) {

        if (err instanceof HistoraError) {
            let message = `
<div class="terminal_red">
!!! ${err.name} [line ${err.line_error}]

${err.line_content}]
${' '.repeat(err.id_local_error)}^

WarError: ${err.message}
</div>`;

            terminal.innerHTML += message;
            
        } else {
            console.log("Erro interno do sistema:");
            console.error(err);
        }
        
    }

    const Final_time = performance.now();
    
    const Process = Final_time - Initial_time;
    terminal.innerHTML += `
The battle lasted ${Process} milliseconds`;
    log('<br>')

}

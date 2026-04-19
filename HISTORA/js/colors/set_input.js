// Sincroniza scroll
textarea.addEventListener("scroll", () => {
  lineNumbers.scrollTop = textarea.scrollTop;
});

// Atualiza ao digitar
textarea.addEventListener("input", updateLines);

// Inicial
updateLines();
autoResize();

// setar colorização
input.addEventListener('input', () => {
    const raw = input.value
    // setar variáveis coloridas
    parseDeclarations(raw)

    // colorização das tags
    highlight.innerHTML = highlightTags(input.value)

    // salvar conteúdo
    localStorage.setItem('code_user_html', highlight.innerHTML);
    localStorage.setItem('code_user', input.value);

    console.log("code_lines_user: "+lineNumbers.innerHTML)
    localStorage.setItem('code_lines_user', lineNumbers.innerHTML);
})

// setar conteúdo de volta caso tenha resetado a guia
window.onload = () => {
  const textoSalvoHtml = localStorage.getItem('code_user_html');
  const textoSalvo = localStorage.getItem('code_user');
  const linhasSalvo = localStorage.getItem('code_lines_user');

  if (textoSalvoHtml) {
    highlight.innerHTML = textoSalvoHtml;
    input.value = textoSalvo;
    lineNumbers.innerHTML = linhasSalvo
  }
};
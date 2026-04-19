const terminal = document.getElementById("terminal-output");

function log(msg) {
  terminal.innerHTML += "\nC:\\Planet\\Countrys\\Wars\\historical_archive\\machine_guns> " + msg;
}

const textarea = document.getElementById("codeInput");
const lineNumbers = document.getElementById("lineNumbers");

// Atualiza números
function updateLines() {
  const lines = textarea.value.split("\n").length || 1;

  let html = "";
  for (let i = 1; i <= lines; i++) {
    html += i + "<br>";
  }

  lineNumbers.innerHTML = html;
}

function autoResize() {
  textarea.style.height = "auto"; // reseta
  textarea.style.height = textarea.scrollHeight + "px"; // cresce
}

function emptyTerminal(){
  terminal.innerHTML = 'C:\\Planet\\Countrys\\Wars\\historical_archive\\machine_guns> <br>'
}
// Atualiza tudo junto
textarea.addEventListener("input", () => {
  updateLines();
  autoResize();
});

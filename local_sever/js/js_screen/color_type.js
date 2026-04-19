const elemento = document.getElementById("editor");

let highTypeREDStyle = 'color: rgb(255, 0, 0); font-weight: bold;';
let highTypeBLUEStyle = 'color: rgb(0, 0, 255); font-weight: bold;';
let lowTypeStyle = 'color: rgba(144, 212, 255, 1)';

// let types_var = {"slave": "rgb(220, 144, 255)",
//               "coin":  "rgb(220, 144, 255)",
//               "alias": "rgb(220, 144, 255)", 
//               "noble": "rgb(220, 144, 255)",
//               "do":    "rgb(220, 144, 255)", 
//               "wth":    "rgba(84, 109, 255, 1)", 
//               "work":    "rgb(220, 144, 255)", 
//               "for":   "rgb(220, 144, 255)"};

// let var_piece = {"slave": "rgba(144, 212, 255, 1)",
//               "coin":  "rgba(144, 212, 255, 1)",
//               "alias": "rgba(144, 212, 255, 1)", 
//               "noble": "rgba(144, 212, 255, 1)",
//               "do":    "rgba(144, 212, 255, 1)"};

// counteudos que PRECISAM estar isolados para receberem destaque, ou seja, não podem ser parte de outras palavras
let TYPES_ISOLATED = {
    "slave": highTypeREDStyle,
    "coin":  highTypeREDStyle,
    "alias": highTypeBLUEStyle,
    "noble": highTypeBLUEStyle,
}

// conteudos que PODEM receber destaque mesmo quando parte de outras palavras, ou seja, não precisam estar isolados
let TYPES_FREE = {
    "do":    lowTypeStyle,
    "wth":   lowTypeStyle,
    "for":   lowTypeStyle
}
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

elemento.addEventListener("input", () => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  // Salva posição do cursor (offset total)
  const preRange = range.cloneRange();
  preRange.selectNodeContents(elemento);
  preRange.setEnd(range.endContainer, range.endOffset);
  const cursorPosition = preRange.toString().length;

  // Texto puro
  let novoHTML = elemento.innerText;
  

// 🔵 TIPOS LIVRES
for (const [type, style] of Object.entries(TYPES_FREE)) {
  const regex = new RegExp(escapeRegex(type), 'gi');
  novoHTML = novoHTML.replace(regex, `<span style="${style}">$&</span>`);
}

// 🔴 TIPOS ISOLADOS
for (const [type, style] of Object.entries(TYPES_ISOLATED)) {
  const regex = new RegExp(`\\b${escapeRegex(type)}\\b`, 'gi');
  novoHTML = novoHTML.replace(regex, `<span style="${style}">$&</span>`);
}

//   // Aplica highlight (isolado)
//   let novoHTML = texto.replace(/\bOi\b/gi, '<span class="highlight">Oi</span>');

  elemento.innerHTML = novoHTML;

  // Restaurar cursor
  setCursorPosition(elemento, cursorPosition);
});

function setCursorPosition(container, position) {
  let charIndex = 0;
  const range = document.createRange();
  range.setStart(container, 0);
  range.collapse(true);

  const nodeStack = [container];
  let node, found = false;

  while (!found && nodeStack.length) {
    node = nodeStack.pop();

    if (node.nodeType === 3) { // texto
      let nextCharIndex = charIndex + node.length;

      if (position <= nextCharIndex) {
        range.setStart(node, position - charIndex);
        range.collapse(true);
        found = true;
      }

      charIndex = nextCharIndex;
    } else {
      let i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

function countLines(content){
  console.log("Aqui")
  let contator = document.getElementById("list");
  contator.innerHTML = '';

  let lines = content.split(/\r?\n/);
  console.log(lines.length)
  console.log(lines)

  if(lines[lines.length - 1] === ""){
    lines.pop();
  }

  for( let i = 1; i <= lines.length; i++){
    if( i < 1000){
      contator.innerHTML = contator.innerHTML + `<li>${i}</li>`;

    } else if ( i < 10000){
      contator.innerHTML = contator.innerHTML + `<li style="font-size: medium;">${i}</li>`;
      
    } else {
      contator.innerHTML = contator.innerHTML + `<li style="font-size:small;">${i}</li>`;
      
    }
  }

}
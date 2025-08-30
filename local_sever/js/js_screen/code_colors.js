// Exemplo simples: deixa as palavras "alert" vermelhas
const editor = document.getElementById("editor");

types_var = {"slave": "rgb(220, 144, 255)",
              "coin":  "rgb(220, 144, 255)",
              "alias": "rgb(220, 144, 255)", 
              "noble": "rgb(220, 144, 255)",
              "do":    "rgb(220, 144, 255)", 
              "wth":    "rgba(84, 109, 255, 1)", 
              "work":    "rgb(220, 144, 255)", 
              "for":   "rgb(220, 144, 255)"};

var_piece = {"slave": "rgba(144, 212, 255, 1)",
              "coin":  "rgba(144, 212, 255, 1)",
              "alias": "rgba(144, 212, 255, 1)", 
              "noble": "rgba(144, 212, 255, 1)",
              "do":    "rgba(144, 212, 255, 1)"};



function saveCaretPosition(context) {
  const sel = window.getSelection();

  if (sel.rangeCount > 0) {
    const range = sel.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(context);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;
    return start;
  }
  return 0;
}

function restoreCaretPosition(context, chars) {
  const sel = window.getSelection();
  let nodeStack = [context],
    node,
    found = false;
  let charCount = 0,
    range = document.createRange();

  while (!found && (node = nodeStack.pop())) {
    if (node.nodeType === 3) {
      // Text node
      const nextCharCount = charCount + node.length;
      if (chars <= nextCharCount) {
        range.setStart(node, chars - charCount);
        range.collapse(true);
        found = true;
      } else {
        charCount = nextCharCount;
      }
    } else {
      let i = node.childNodes.length;
      while (i--) nodeStack.push(node.childNodes[i]);
    }
  }

  sel.removeAllRanges();
  sel.addRange(range);
}


editor.addEventListener("input", () => {

  let caretPos = saveCaretPosition(editor);

  let content = editor.innerText;

  console.clear()
  console.log(content)



  for( let key in types_var){
    const regex = new RegExp("^" + key.charAt(0).toUpperCase() + key.slice(1)+" ", "gm");
    const regex_last = new RegExp(" " + key + "$", "gm");

    content = content.replaceAll(` ${key} `,` <span style="color: ${types_var[key]}">${key}</span> `);

    content = content.replaceAll(regex,`<span style="color: ${types_var[key]}">${key.charAt(0).toUpperCase() + key.slice(1)}</span> `);

    content = content.replaceAll(` ${key},`,` <span style="color: ${types_var[key]}">${key}</span>,`);
    content = content.replaceAll(` ${key};`,` <span style="color: ${types_var[key]}">${key}</span>,`);

    content = content.replaceAll(regex_last,` <span style="color: ${types_var[key]}">${key}</span>`);

    content = content.replaceAll(`${key.charAt(0).toUpperCase() + key.slice(1)}.`,`<span style="color: ${types_var[key]}">${key.charAt(0).toUpperCase() + key.slice(1)}</span>,`);
    content = content.replaceAll(`${key.charAt(0).toUpperCase() + key.slice(1)};`,`<span style="color: ${types_var[key]}">${key.charAt(0).toUpperCase() + key.slice(1)}</span>,`);

    content = content.replaceAll(`;`,`,`);
  }

  editor.innerHTML = content;
  restoreCaretPosition(editor, caretPos);

});

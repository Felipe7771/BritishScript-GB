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

      // Exemplo simples: deixa as palavras "alert" vermelhas
      const editor = document.getElementById("editor");

      types_var = ["slave", "coin", "alias", "noble", "do", "for"];

      editor.addEventListener("input", () => {
        const caretPos = saveCaretPosition(editor);


        let first_pieces = editor.innerText.split(" ");
        console.log("fist_pieces: "+first_pieces)
        let pieces = [];

        for (let i = 0; i < first_pieces.length; i++) {
          if (first_pieces[i].includes(";")) {
            
            piece = first_pieces[i].replace(";"," ")
            piece = piece.split(" ");
            piece = piece.filter(Boolean);

            piece.splice(1,0,";");

            pieces = pieces.concat(piece);
          } else {
            pieces = pieces.concat(first_pieces[i])
          }

          console.log(i+":"+pieces)
        }

        console.log(pieces);
        editor.innerText = "";
        editor.innerHTML = "";

        let text = [];

        for (let i = 0; i < pieces.length; i++) {
          if (types_var.includes(pieces[i].toLowerCase().trim())) {
            text[i] = `<span style="color: rgb(220, 144, 255);">${pieces[i]}</span>`;
          } else {
            text[i] = `<span>${pieces[i]}</span>`;
          }
        }

        editor.innerHTML = text.join(" ").replaceAll("</span> <span>;",";");
        console.log(text.join(" ").replaceAll("</span> <span>;",";"));
        restoreCaretPosition(editor, caretPos);
      });
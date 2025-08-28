    const texts = ["Mastering programming is also part of the Empire",
                  "25% of the world was too little for us",
                  "I hope Java also has room for tea",
                  "If it compiles, it conquers",
                  "Every exception shall be RAJ-ed",
                  "Tea is not optional. It’s required()"];

    let index = 0;
    let isDeleting = false;
    let textIndex = 0;
    let speed = 100;

    const typeWrite = () => {
      const type_write = document.querySelector("#typewrite");
      const currentText = texts[textIndex];

      if (!isDeleting && index <= currentText.length){
        type_write.textContent = currentText.substring(0,index);
        index++;
        speed = 50;
      } else if(isDeleting && index >= 0){
        type_write.textContent = currentText.substring(0,index);
        index--;

        if(index == currentText.length - 1){
          speed = 2000;
        }else{
          speed = 50;
        }
      }

      if(index > currentText.length){
        isDeleting = true;
      }
      if(index === 0 && isDeleting){
        isDeleting = false;

        if(textIndex < texts.length - 1){
          textIndex++;
        } else {
          textIndex = 0;
        }
      }
      setTimeout(typeWrite,speed);
    };

    window.addEventListener("load", typeWrite);
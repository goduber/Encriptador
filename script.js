const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const copy   = document.querySelector(".btncopiar");

/*La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"*/

function btnEncriptar(){
  if (textArea.value.length > 0){
    var textoFinal = textArea.value;
    if(textoFinal[0] != "#"){textoFinal = textoFinal.toLowerCase();}
    const textoEncriptado = encriptarTexto(textoFinal);
    console.log(textoEncriptado);
    if (textoEncriptado != '-null-') {
        mensaje.value = textoEncriptado;
        mensaje.style.background="white";
        mensaje.style.backgroundImage = "none";    
    }
    else{
        mensaje.value = "";
        mostrar_muñeco();
    }
    textArea.value = "";
  }
  else{alert("Ingrese un texto para encriptar")}
}

function btnDesencriptar(){
  if (textArea.value.length > 0){
    const textoDesencriptado = desencriptarTexto(textArea.value);
    if (textoDesencriptado != '-null-') {
        mensaje.value = textoDesencriptado;
        mensaje.style.background="white";
        mensaje.style.backgroundImage = "none";    
    }
    else{
        textoEncriptado = "";
        mostrar_muñeco();
    }
    textArea.value = "";
  }
  else{alert("Ingrese un texto para desencriptar")}
}

function btn_copias(){
    copiarAlPortapapeles(mensaje.value);
    mensaje.value = "";
    textArea.value = "";
    mensaje.style.backgroundImage = URL("img/Muñeco.png");
    alert("Texto Copiado en el Porta Papeles");
}

function copiarTexto() {
    let copia = mensaje.value;
    if (copia.trim() === '') {
        mensaje.style.background = "RGB(255, 230, 230)";
        alert("Texto encriptado en blanco");
    } else {
        navigator.clipboard.writeText(copia);
        mensaje.value = "";
        textArea.value = "";
        mensaje.style.background="white";
    }
    mostrar_muñeco();
}

function mostrar_muñeco(){
    mensaje.style.backgroundImage = "url('img/Muñeco.png')";
    mensaje.style.backgroundRepeat = "no-repeat";
    mensaje.style.backgroundPosition = "center";
}

function encriptarTexto(texto) {
    var encriptado = "";
    var alerta = false;
    for (var i = 0; i < texto.length; i++) {
      var caracter = texto[i];
      if (caracter ==='#'){
        alert("Texto ya Encriptado");
        alerta = true;
        break;
      }
      if (caracter.match(/[a-záéíóú]/i)) {
        // Obtener el código ASCII del caracter y sumar 1
        var codigoAscii = caracter.charCodeAt(0) + 1;
        // Verificar si se pasa de 'z' o 'ú'
        if (caracter === 'z') {
          codigoAscii = 83;
        } else if (caracter === 'ú') {
          codigoAscii = 87;
        }
        // Obtener el caracter encriptado
        var caracterEncriptado = String.fromCharCode(codigoAscii);
        encriptado += caracterEncriptado;
      } else {
        encriptado += caracter;
      }
    }
    if (!alerta){return encriptado = "#" + encriptado ;}
    else{return encriptado = "-null-";}
  }

  function desencriptarTexto(textoEncriptado) {
    var desencriptado = "";
    var alerta = false;

    if(textoEncriptado[0] != "#") {
        alert("Texto No Encriptado");
        alerta = true;
    }
    else {
      for (var i = 1; i < textoEncriptado.length; i++) {
        var caracter = textoEncriptado[i];
        if (caracter.match(/[a-záéíóúSW]/i)) {
          // Obtener el código ASCII del caracter y restar 1
          var codigoAscii = caracter.charCodeAt(0);
          // Verificar si se pasa de 'z' o 'ú'
          if (codigoAscii=== 83)  {
            codigoAscii = 122;
          } else if (codigoAscii === 87) {
            codigoAscii = 163;
          }
          else{
            codigoAscii -= 1;
          }
          // Obtener el caracter desencriptado
          var caracterDesencriptado = String.fromCharCode(codigoAscii);
          desencriptado += caracterDesencriptado;
        } else {
          desencriptado += caracter;
        }
      }
    }
    if(!alerta){return desencriptado;}
    else{return desencriptado = "-null-";}
  }
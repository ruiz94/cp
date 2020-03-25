var miImagen = document.querySelector("img");
var miBoton = document.querySelector('button');
var miTitulo = document.querySelector( 'h1');

miImagen.onclick = function(){
  var miSrc = miImagen.getAttribute("src");
  console.log(miSrc);
  if (miSrc == 'images/villager_1.png') {
    miImagen.setAttribute('src', 'images/villager_2.jpg');
  }else {
    miImagen.setAttribute('src', 'images/villager_1.png');
  }
}

function establecerNombreUsuario() {
  var miNombre = prompt('Por favor, ingresa tu nombre.');
  localStorage.setItem('nombre', miNombre);
  miTitulo.textContent = miNombre + ' the new friend of Villager.'
}
if (!localStorage.getItem('nombre')) {
  establecerNombreUsuario();
}else {
  let nombreAlmacenado = localStorage.getItem('nombre');
  miTitulo.textContent = nombreAlmacenado+' the best friend of Villager';
}

miBoton.onclick = function(){
  establecerNombreUsuario();
}

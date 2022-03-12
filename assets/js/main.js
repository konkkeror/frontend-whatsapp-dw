console.log('Usuarios', usuariosData);
console.log('Stickers', stickersData);
console.log('Conversaciones', conversacionesData);

if (!localStorage.getItem('usuarios')) {
  localStorage.setItem('usuarios',JSON.stringify(usuariosData));
}

if (!localStorage.getItem('stickers')) {
  localStorage.setItem('stickers', JSON.stringify(stickersData));
}

for (let chatKey in conversacionesData) {
  if (!localStorage.getItem(chatKey)) {
    localStorage.setItem(chatKey, JSON.stringify(conversacionesData[chatKey]));
  }
}

var usuarios = JSON.parse(localStorage.getItem('usuarios'));
var stickers = JSON.parse(localStorage.getItem('stickers'));
let usuarioSeleccionado = null;

function renderizarUsuarios() {
  usuarios.forEach(function(usuario, indice) {
    document.getElementById('lista-usuarios').insertAdjacentHTML("beforeend",
      `<img onclick="seleccionarUsuario(${usuario.id})" class="rounded-circle item-usuario" src="assets/img/profile-pics/${usuario.imagen}">`);
  });
}

renderizarUsuarios();

function seleccionarUsuario(id) {
  usuarioSeleccionado = usuarios.find(function(usuario) {
    return usuario.id == id;
  });
  console.log('Usuario seleccionado', usuarioSeleccionado);
  renderizarConversaciones(usuarioSeleccionado.conversaciones);
}

function renderizarConversaciones(conversaciones) {
  document.getElementById('chats').innerHTML = '';
  conversaciones.forEach(function(conversacion){
    document.getElementById('chats').insertAdjacentHTML("beforeend",
      `<div class="d-flex chat-preview" onclick="verChat('${conversacion.id}')">
        <div>
          <img class="rounded-circle" src="assets/img/profile-pics/${conversacion.imagenDestinatario}">
        </div>
        <div class="ms-2" style="flex: 1">
          <div class="nombre-usuario">${conversacion.nombreDestinatario}</div>
          <div class="ultimo-mensaje">${conversacion.ultimoMensaje}</div>
        </div>
        <div class="hora small">
          <div>${conversacion.horaUltimoMensaje}</div>
        </div>
      </div>`
    );
  });
}

function mostrarSeccion(seccion) {
  document.getElementById('chats').style.display = "none";
  document.getElementById('contactos').style.display = "none";

  document.getElementById(seccion).style.display = "block";

  document.querySelectorAll('.opt-menu').forEach(function(element) {
    element.classList.toggle('selected');
  });
}

function toggleUsuarios() {
  document.getElementById('lista-usuarios').classList.toggle('mostrar-usuarios');
}

function verChat(idChat) {
  document.getElementById('chats').style.display = "none";
  document.getElementById('detalle-chat').classList.toggle('d-flex');
  document.getElementById('lista-usuarios').classList.remove('mostrar-usuarios');

  const mensajes = JSON.parse(localStorage.getItem(idChat));
  console.log('Mensajes', mensajes);
  mensajes.forEach(function(mensaje){
    document.getElementById('mensajes').insertAdjacentHTML("beforeend",
      `<div class="mensaje ${usuarioSeleccionado.id === mensaje.emisor ? 'enviado' : 'recibido'}">
        ${
          mensaje.tipo === 'text' 
            ? mensaje.mensaje 
            : `<img class="w-75" src="assets/img/stickers/${stickers.find((sticker) => sticker.id === mensaje.sticker).sticker}">`
        }
      </div>`);
  });
}

/* <img class="w-75" src="assets/img/stickers/1.png"></img> */
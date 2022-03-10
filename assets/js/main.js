function mostrarSeccion(seccion) {
  document.getElementById('chats').style.display = "none";
  document.getElementById('contactos').style.display = "none";

  document.getElementById(seccion).style.display = "block";

  document.querySelectorAll('.opt-menu').forEach(function(element) {
    element.classList.toggle('selected');
  });
}
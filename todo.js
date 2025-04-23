const input = document.getElementById('nuevaTarea');
const btnAgregar = document.getElementById('btnAgregar');
const lista = document.getElementById('listaTareas');
const mensaje = document.getElementById('mensaje');

btnAgregar.addEventListener('click', () => {
  const texto = input.value.trim();

  if (texto === '') {
    mensaje.textContent = 'Debes escribir una tarea.';
    return;
  }

  mensaje.textContent = '';
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = texto;

  const btnEliminar = document.createElement('button');
  btnEliminar.textContent = 'Eliminar';

  // Funcionalidad para tachar al hacer clic en el texto
  span.addEventListener('click', () => {
    span.classList.toggle('completada');
  });

  // Funcionalidad para eliminar
  btnEliminar.addEventListener('click', () => {
    lista.removeChild(li);
  });

  li.appendChild(span);
  li.appendChild(btnEliminar);
  lista.appendChild(li);
  input.value = '';
});
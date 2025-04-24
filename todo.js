// agarrar los elementos del HTML
const input = document.getElementById("nuevaTarea");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");

// agarrar tareas guardadas o poner una lista vacía
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// función para guardar las tareas en el localStorage
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// función para crear el <li> con su contenido y botones
function crearTarea(texto, completada = false) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto;

    if (completada) {
        span.classList.add("completada");
    }

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";

    // al hacer click en el texto se marca o desmarca
    span.addEventListener("click", function () {
        span.classList.toggle("completada");

        let tarea = tareas.find(t => t.texto === texto);
        if (tarea) {
            tarea.completada = !tarea.completada;
            guardarTareas();
        }
    });

    // eliminar tarea al dar click en el botón
    btnEliminar.addEventListener("click", function () {
        lista.removeChild(li);
        tareas = tareas.filter(t => t.texto !== texto);
        guardarTareas();
    });

    li.appendChild(span);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
}

// mostrar tareas ya guardadas
tareas.forEach(tarea => crearTarea(tarea.texto, tarea.completada));

// cuando le den click a "Agregar"
btnAgregar.addEventListener("click", function () {
    const texto = input.value.trim();

    if (texto === "") {
        mensaje.textContent = "Por favor escribe una tarea";
        return;
    }

    mensaje.textContent = "";

    crearTarea(texto);
    tareas.push({ texto: texto, completada: false });
    guardarTareas();

    input.value = "";
});

import { Serie } from "./serieClass.js";
import { generarId } from "../helpers/generadorId.js";
import {
  validarTitulo,
  validarDescripcion,
  validarUrl,
  validarGenero,
} from "../helpers/validacionesFormSerie.js";
import mostrarOcultarTabla from "./mostrarOcultarTablaAdmin.js";

// Variable con el arreglo de objetos del LS
let listaSeries = JSON.parse(localStorage.getItem("Series"));

// Este if valida, si la key Series no existe en el LS, entonces me genera una nueva key Series con un array vacio
if (!listaSeries) {
  localStorage.setItem("Series", JSON.stringify([]));
  listaSeries = JSON.parse(localStorage.getItem("Series"));
}

// Funcion para verificar si el LS tiene datos muestra la tabla, de lo contrario muestra un texto
mostrarOcultarTabla(listaSeries); 

// Variables de los inputs del form de serie
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let urlImg = document.getElementById("urlImg");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formSerie");
// Variables para manejar el modal
let btnModal = document.getElementById("btnModal");
const modalAdmin = new bootstrap.Modal(document.getElementById("modal"));


// Funcion para generar el id de la Serie
btnModal.addEventListener("click", () => {
  LimpiarFormulario();
  modalAdmin.show();
  // Funcion para crear el codigo
  generarId();
});

// Validaciones en tiempo real
titulo.addEventListener("keyup", () => validarTitulo(titulo));
descripcion.addEventListener("keyup", () => validarDescripcion(descripcion));
urlImg.addEventListener("keyup", () => validarUrl(urlImg));
genero.addEventListener("change", () => validarGenero(genero));

// Creamos la funcion para dar de alta una Serie
const crearSerie = (e) => {
  e.preventDefault();
  // Volver a validar campos antes de enviarlos
  if (
    !validarTitulo(titulo) ||
    !validarDescripcion(descripcion) ||
    !validarUrl(urlImg) ||
    !validarGenero(genero)
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Alguna validacion no es correcta!",
    });
    return;
  }

  const nuevaSerie = new Serie(
    codigo.value,
    titulo.value,
    descripcion.value,
    urlImg.value,
    genero.value
  );

  listaSeries.push(nuevaSerie);
  guardarSerieLS();
  LimpiarFormulario(); // Limpiar los inputs
};

// Funcion para confirmar que la serie se guarde en el LS
const guardarSerieLS = () => {
  Swal.fire({
    title: "Seguro que quiere guardar la serie?",
    text: "La serie se guardara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Guardar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("Series", JSON.stringify(listaSeries));
      borrarFilas() // Borro las filas
      cargaInicial() // Vuelvo a dibujar las filas con el arreglo actualizado
      modalAdmin.hide();
      Swal.fire(
        "Serie guardada!",
        "La serie se guardo correctamente.",
        "success"
      );
    }
  });
};

// Funcion para borrar las filas de la tabla
const borrarFilas = () => {
  const tbody = document.getElementById("tbodySeries");
  tbody.innerHTML = "";
}

// Funcion para limpiar los inputs del form
function LimpiarFormulario() {
  formulario.reset();
  titulo.className = "form-control";
  descripcion.className = "form-control";
  urlImg.className = "form-control";
  genero.className = "form-select";
  generarId();
}

// Agrego el evento submit al form con su funcion para dar de alta la serie
formulario.addEventListener("submit", crearSerie);

// Con estas funciones agrego las filas a la tabla con los datos almacenados en el LS
const cargaInicial = () => {
  if (listaSeries.length > 0) {
    listaSeries.forEach((serie) => {
      crearFilas(serie);
    });
  }
};

const crearFilas = (serie) => {
  const tbody = document.getElementById("tbodySeries");
  if (tbody) {
    tbody.innerHTML += `
        <tr>
          <td scope="row">${serie.codigo}</td>
          <td>${serie.titulo}</td>
          <td>
            <div class="td-descripcion">
              ${serie.descripcion}
            </div>
          </td>
          <td>
            ${serie.urlImg}
          </td>
          <td>${serie.genero}</td>
          <td class="buttons-table tex-center">
            <button class="btn btn-warning">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-danger ms-1">
              <i class="bi bi-x-square"></i>
            </button>
          </td>
        </tr>
        `;
  }
};

cargaInicial();

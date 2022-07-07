import { Serie } from "./serieClass.js";
import { generarId } from "../helpers/generadorId.js";
import {
  validarTitulo,
  validarDescripcion,
  validarUrl,
  validarGenero,
} from "../helpers/validacionesFormSerie.js";

// Traemos los elementos que nos interesan
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let urlImg = document.getElementById("urlImg");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formSerie");
let listaSeries = [];
let abrirModal = document.getElementById("abrirModal");

// Funcion para generar el id de la Serie
abrirModal.addEventListener("click", generarId);

// Agregar validaciones
titulo.addEventListener("keyup", () => validarTitulo(titulo));
descripcion.addEventListener("keyup", () => validarDescripcion(descripcion));
urlImg.addEventListener("keyup", () => validarUrl(urlImg));
genero.addEventListener("change", () => validarGenero(genero));

// Creamos la funcion para dar de alta una Serie
const crearSerie = (e) => {
  e.preventDefault();
  // Volver a validar campos
  const nuevaSerie = new Serie(
    codigo.value,
    titulo.value,
    descripcion.value,
    urlImg.value,
    genero.value
  );
  console.log(nuevaSerie);
  listaSeries.push(nuevaSerie);
  console.log(listaSeries);

  LimpiarFormulario(); // Limpiar los inputs
};

function LimpiarFormulario() {
  formulario.reset();
}

formulario.addEventListener("submit", crearSerie);

import { Serie } from "./serieClass.js";

let nuevaSerie = new Serie(
  1,
  "Game of Thrones",
  "Descripcion",
  "urlImg",
  "genero"
);

// Traemos los elementos que nos interesan

let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let urlImg = document.getElementById("urlImg");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formSerie");
let listaSeries = [];

// Agregar validaciones

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

  // Limpiar los inputs
  LimpiarFormulario();
};

function LimpiarFormulario() {
  formulario.reset();
}

formulario.addEventListener("submit", crearSerie);

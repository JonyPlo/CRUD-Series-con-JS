import { Serie } from "./serieClass.js";
import { generarId } from "../helpers/generadorId.js";
import {
  validarTitulo,
  validarDescripcion,
  validarUrl,
  validarGenero,
} from "../helpers/validacionesFormSerie.js";
import mostrarOcultarTabla from "./mostrarOcultarTablaAdmin.js";

// Variable con el arreglo donde se guardaran los datos del LS
let listaSeries = [];

// Este if valida si el LS tiene datos, los guarda en el array listaSeries, de lo contrario, crea un array vacio detro del LS
if (localStorage.length > 0) {
  listaSeries = JSON.parse(localStorage.getItem("Series")); //Si LS tiene datos, los cargo en el arreglo
} else {
  localStorage.setItem("Series", JSON.stringify([])); //Si no, creo una key Series con un array vacio dentro del LS
}

// Funcion para verificar si el LS tiene datos muestra la tabla, de lo contrario muestra un texto
mostrarOcultarTabla(listaSeries);

// Variables de los inputs del form de serie
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let urlImg = document.getElementById("urlImg");
let genero = document.getElementById("genero");
// Variable del formulario
const formulario = document.getElementById("formSerie");
// Variables para manejar el modal
const btnModalCrear = document.getElementById("btnModal");
const modalAdmin = new bootstrap.Modal(document.getElementById("modal"));
//Variable bandera que me indicara cuando se creara o modificara una serie
let bandera = false; // false = crear, true = modificar
//Variable del btn submit del modal
const btnSubmit = document.getElementById("btnSubmit");

// Funcion para abrir el modal
btnModalCrear.addEventListener("click", () => {
  bandera = false; //Bandera para cambiar el nombre del btn submit
  btnSubmit.innerHTML = "Crear"; //Cambio el nombre del btn submit
  limpiarFormulario();
  generarId(codigo); // Funcion para crear el codigo
  modalAdmin.show(); // Muestro el modal
});

// Validaciones en tiempo real
titulo.addEventListener("keyup", () => validarTitulo(titulo));
descripcion.addEventListener("keyup", () => validarDescripcion(descripcion));
urlImg.addEventListener("keyup", () => validarUrl(urlImg));
genero.addEventListener("change", () => validarGenero(genero));

// Creamos la funcion para dar de alta una Serie
const crearSerie = () => {
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

  // Si paso las validaciones de los inputs, ejectuto el alert de confirmacion para crear la serie
  Swal.fire({
    title: `Seguro que quiere crear la serie ${titulo.value}?`,
    text: "La serie se creara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Crear",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Creo un nuevo objeto de la clase Serie y almaceno los valores de los inputs del form
      const nuevaSerie = new Serie(
        codigo.value,
        titulo.value,
        descripcion.value,
        urlImg.value,
        genero.value
      );
      listaSeries.push(nuevaSerie); // Agrego el objeto al arreglo de series
      localStorage.setItem("Series", JSON.stringify(listaSeries)); // Guardo el arreglo con el nuevo objeto en el LS
      mostrarOcultarTabla(listaSeries); // Esta funcion tambien borra todas las filas que tenga la tabla
      cargaInicial(); // Vuelvo a dibujar las filas con el arreglo actualizado
      modalAdmin.hide();
      limpiarFormulario(); // Limpiar los inputs
      Swal.fire("Serie creada!", "La serie se creó correctamente.", "success");
    }
  });
};

// Funcion para limpiar los inputs del form
const limpiarFormulario = () => {
  formulario.reset(); // .reset() es un metodo de etiquetas form para borrar los valores de los inputs
  //Solo hay 1 solo select por eso no se hace un for
  let selects = document.getElementsByClassName("form-select");
  selects[0].classList.remove("is-valid");
  selects[0].classList.remove("is-invalid");

  //Quito la clase is-valid, is-invalid de los inputs con un for
  let inputs = document.getElementsByClassName("form-control");
  for (let i = 1; i < inputs.length; i++) {
    inputs[i].classList.remove("is-valid");
    inputs[i].classList.remove("is-invalid");
  }
};

// Funcion que se encarga de crear o modifocar una serie
const guardarSerieLS = (e) => {
  e.preventDefault();
  if (bandera) {
    modificarSerie();
  } else {
    crearSerie();
  }
};

// Agrego el evento submit al form con su funcion para dar de alta la serie
formulario.addEventListener("submit", guardarSerieLS);

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
          <td class='text-capitalize'>${serie.genero}</td>
          <td class="buttons-table tex-center">
            <button class="btn btn-warning" onclick="btnModalModificar('${serie.codigo}')">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-danger ms-1" onclick="eliminarSerie('${serie.codigo}', '${serie.titulo}')">
              <i class="bi bi-x-square"></i>
            </button>
          </td>
        </tr>
        `;
};

cargaInicial();

// Funcion para eliminar una serie de la tabla
window.eliminarSerie = (codigo, titulo) => {
  Swal.fire({
    title: `Esta seguro que desea eliminar la serie ${titulo}?`,
    text: "Si la elimina no se podra recuperar!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let nuevaLista = listaSeries.filter(
        (itemSerie) => itemSerie.codigo !== codigo
      );
      listaSeries = nuevaLista; //Guardo el arreglo nuevo sin la serie que acabamos de eliminar en el arreglo principal
      localStorage.setItem("Series", JSON.stringify(listaSeries)); // Guardo el arreglo actualizado en el LS
      mostrarOcultarTabla(listaSeries); // Esta funcion tambien borra todas las filas que tenga la tabla
      cargaInicial(); // Vuelvo a dibujar las tablas con el arreglo actualizado
      Swal.fire(
        "Serie eliminada!",
        "La serie se elimino correctamente",
        "success"
      );
    }
  });
};

// Funcion para perparar la serie a modificar en el form
window.btnModalModificar = (codigoParam) => {
  bandera = true; // Cambiar esta bandera a true indica que estoy en modificar
  btnSubmit.innerHTML = "Modificar"; // Cambio el nombre del btn submit
  let serie = listaSeries.find((itemSerie) => itemSerie.codigo === codigoParam); // Busco la serie a modificar en el arreglo de series con el codigo que traigo por parametro

  // Una vez encontrada la serie a modificar guardo los valores de sus propiedades en los inputs del form
  codigo.value = serie.codigo;
  titulo.value = serie.titulo;
  descripcion.value = serie.descripcion;
  urlImg.value = serie.urlImg;
  genero.value = serie.genero;

  // Valido que los campos que se guardaron en los inputs estan bien
  validarTitulo(titulo);
  validarDescripcion(descripcion);
  validarUrl(urlImg);
  validarGenero(genero);

  modalAdmin.show(); // Muestro el modal
};

//Funcion para guardar la serie en el LS
const modificarSerie = () => {
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

  // Si paso las validaciones de los inputs, ejectuto el alert de confirmacion para modificar la serie
  Swal.fire({
    title: `Seguro que quiere modificar la serie ${titulo.value}?`,
    text: "La serie se modificara!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Modificar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Creo un nuevo objeto serie con las propiedades actualizadas
      let serieModificada = {
        codigo: codigo.value,
        titulo: titulo.value,
        descripcion: descripcion.value,
        urlImg: urlImg.value,
        genero: genero.value,
      };
      let indiceSerie = listaSeries.findIndex(
        (serie) => serie.codigo === codigo.value
      ); // Busco el indice de la serie a modificar en el arreglo de series
      listaSeries.splice(indiceSerie, 1, serieModificada); // Con este splice busco la serie que quiero eliminar a travez de su indice que encontramos anteriormente, luego la elimino y por ultimo introduzco la serie modificada en ese mismo indice
      localStorage.setItem("Series", JSON.stringify(listaSeries)); // Guardo el arreglo actualizado en el LS
      mostrarOcultarTabla(listaSeries); // Esta funcion tambien borra todas las filas que tenga la tabla
      cargaInicial(); // Vuelvo a dibujar las filas con el arreglo actualizado
      modalAdmin.hide(); // Oculto el modal
      limpiarFormulario(); // Limpiar los inputs
      Swal.fire(
        "Serie modificada!",
        "La serie se modifico correctamente.",
        "success"
      );
    }
  });
};

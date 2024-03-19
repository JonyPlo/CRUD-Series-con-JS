import { Serie } from './serieClass.js';
import { generarId } from '../helpers/generadorId.js';
import {
  validarTitulo,
  validarDescripcion,
  validarUrl,
  validarGenero,
} from '../helpers/validacionesFormSerie.js';
import mostrarOcultarTabla from './mostrarOcultarTablaAdmin.js';

// Variable con el arreglo donde se guardaran los datos del LS
let listaSeries = JSON.parse(localStorage.getItem('Series') || '[]');

listaSeries.map((serie) => {
  let classSerie = new Serie(
    serie.codigo,
    serie.titulo,
    serie.descripcion,
    serie.urlImg,
    serie.genero
  );
  classSerie.setDestacado = serie.destacado;
  return classSerie;
});

// Variables de los inputs del form de serie
let codigo = document.getElementById('codigo');
let titulo = document.getElementById('titulo');
let descripcion = document.getElementById('descripcion');
let urlImg = document.getElementById('urlImg');
let genero = document.getElementById('genero');
let switch_destacado = document.getElementById('switch_destacar');
// Variable del formulario
const formulario = document.getElementById('formSerie');
// Variables para manejar el modal
const btnModalCrear = document.getElementById('btnModal');
const modalAdmin = new bootstrap.Modal(document.getElementById('modal'));
//Variable bandera que me indicara cuando se creara o modificara una serie
let bandera = false; // false == crear, true == modificar
//Variable del btn submit del modal
const btnSubmit = document.getElementById('btnSubmit');

// Funcion para verificar si el LS tiene datos muestra la tabla, de lo contrario muestra un texto informando que no hay elementos para mostrar
mostrarOcultarTabla(listaSeries);

// En esta funcion traigo el body de la tabla y le agrego el html restante para crear la fila con los datos de la serie
const crearFilas = (serie, index) => {
  const tbody = document.getElementById('tbodySeries');
  tbody.innerHTML += /* HTML */ `
    <tr>
      <td scope="row">${serie.codigo}</td>
      <td>${serie.titulo}</td>
      <td>
        <div class="td-descripcion">${serie.descripcion}</div>
      </td>
      <td>${serie.urlImg}</td>
      <td class="text-capitalize">${serie.genero}</td>
      <td class="text-capitalize">${serie.destacado ? 'Si' : 'No'}</td>
      <td class="buttons-table tex-center">
        <button
          class="btn btn-warning"
          onclick="btnModalModificar('${serie.codigo}')"
        >
          <i class="bi bi-pencil-square"></i>
        </button>
        <button
          class="btn btn-danger ms-1"
          onclick="eliminarSerie('${index}', '${serie.titulo}')"
        >
          <i class="bi bi-x-square"></i>
        </button>
      </td>
    </tr>
  `;
};

// Con estas funciones recorro el arreglo de listaSeries y segun la longitud que tenga son las veces que se ejecutara la funcion crearFilas para agregar las filas a la tabla con los datos almacenados en el LS
const cargaInicial = () => {
  if (listaSeries.length > 0) {
    listaSeries.map((serie, index) => {
      crearFilas(serie, index);
    });
  }
};

// Ejecuto la carga inicial para que se listen las series almacenadas en el LS en la tabla
cargaInicial();

// Funcion para abrir el modal
btnModalCrear.addEventListener('click', () => {
  btnSubmit.innerHTML = 'Crear'; //Cambio el nombre del btn submit
  limpiarFormulario(); // Limpio los inputs del form
  generarId(codigo); // Funcion para crear el codigo
  modalAdmin.show(); // Muestro el modal
  bandera = false;
});

// Validaciones en tiempo real
titulo.addEventListener('input', () => validarTitulo(titulo));
descripcion.addEventListener('input', () => validarDescripcion(descripcion));
urlImg.addEventListener('input', () => validarUrl(urlImg));
genero.addEventListener('change', () => validarGenero(genero));

// Creamos la funcion para dar de alta una Serie
const crearSerie = () => {
  // Si paso las validaciones de los inputs, ejecuto el alert de confirmacion para crear la serie
  Swal.fire({
    title: `Seguro que quiere crear la serie ${titulo.value}?`,
    text: 'La serie se creara!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
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

      nuevaSerie.setDestacado = switch_destacado.checked;

      listaSeries = [...listaSeries, nuevaSerie]; // Agrego el objeto al arreglo de series
      guardarListaSerie(); // Guardo el arreglo con el nuevo objeto en el LS
      mostrarOcultarTabla(listaSeries); // Esta funcion tambien borra todas las filas que tenga la tabla
      cargaInicial(); // Vuelvo a dibujar las filas con el arreglo actualizado
      modalAdmin.hide();
      limpiarFormulario(); // Limpiar los inputs
      Swal.fire('Serie creada!', 'La serie se creó correctamente.', 'success');
    }
  });
};

// Funcion para llamarla cada vez que quiera guardar un arreglo nuevo en el LS
const guardarListaSerie = () => {
  if (listaSeries.length >= 0) {
    localStorage.setItem('Series', JSON.stringify(listaSeries));
  }
};

// Funcion para limpiar los inputs del form
const limpiarFormulario = () => {
  formulario.reset(); // .reset() es un metodo de etiquetas form para borrar los valores de los inputs
  //Solo hay 1 solo select por eso no se hace un for
  let selects = document.querySelector('.form-select');
  selects.classList.remove('is-valid', 'is-invalid');
  //Quito la clase is-valid, is-invalid de los inputs con un for
  let inputs = document.querySelectorAll('.form-control');
  inputs.forEach((input) => {
    input.classList.remove('is-valid', 'is-invalid');
  });
};

// Funcion que se encarga de crear o modificar una serie
const guardarSerieLS = (e) => {
  e.preventDefault();
  // Volver a validar campos antes de guardarlos en el LS
  if (
    !validarTitulo(titulo) ||
    !validarDescripcion(descripcion) ||
    !validarUrl(urlImg) ||
    !validarGenero(genero)
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Alguna validacion no es correcta!',
    });
    return;
  }

  if (bandera) {
    modificarSerie();
  } else {
    crearSerie();
  }
};

// Agrego el evento submit al form con su funcion para dar de alta la serie
formulario.addEventListener('submit', guardarSerieLS);

// Funcion para eliminar una serie de la tabla
window.eliminarSerie = (index, titulo) => {
  Swal.fire({
    title: `Esta seguro que desea eliminar la serie ${titulo}?`,
    text: 'Si la elimina no se podra recuperar!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, borrar!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // let nuevaLista = listaSeries.filter(
      //   (itemSerie) => itemSerie.codigo !== codigo
      // );
      let nuevaLista = listaSeries.toSpliced(index, 1);
      listaSeries = nuevaLista; //Guardo el arreglo nuevo sin la serie que acabamos de eliminar en el arreglo principal
      guardarListaSerie(); // Guardo el arreglo actualizado en el LS
      mostrarOcultarTabla(listaSeries); // Esta funcion tambien borra todas las filas que tenga la tabla
      cargaInicial(); // Vuelvo a dibujar las tablas con el arreglo actualizado
      Swal.fire(
        'Serie eliminada!',
        'La serie se elimino correctamente',
        'success'
      );
    }
  });
};

// Funcion para preparar la serie a modificar en el form
window.btnModalModificar = (codigoParam) => {
  btnSubmit.innerHTML = 'Modificar'; // Cambio el nombre del btn submit
  let serie = listaSeries.find((itemSerie) => itemSerie.codigo === codigoParam); // Busco la serie a modificar en el arreglo de series con el codigo que traigo por parametro

  // Una vez encontrada la serie a modificar guardo los valores de sus propiedades en los inputs del form
  codigo.value = serie.codigo;
  titulo.value = serie.titulo;
  descripcion.value = serie.descripcion;
  urlImg.value = serie.urlImg;
  genero.value = serie.genero;
  switch_destacado.checked = serie.destacado;

  // Valido que los campos que se guardaron en los inputs estan bien
  validarTitulo(titulo);
  validarDescripcion(descripcion);
  validarUrl(urlImg);
  validarGenero(genero);

  modalAdmin.show(); // Muestro el modal
  bandera = true; // Cambiar esta bandera a true indica que estoy en modificar
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
      icon: 'error',
      title: 'Oops...',
      text: 'Alguna validacion no es correcta!',
    });
    return;
  }

  // Si paso las validaciones de los inputs, ejecuto el alert de confirmacion para modificar la serie
  Swal.fire({
    title: `Seguro que quiere modificar la serie ${titulo.value}?`,
    text: 'La serie se modificara!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Modificar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      actualizarSerie();
      Swal.fire(
        'Serie modificada!',
        'La serie se modifico correctamente.',
        'success'
      );
      modalAdmin.hide(); // Oculto el modal
    }
  });
};

const actualizarSerie = () => {
  // Busco el indice de la serie a modificar en el arreglo de series
  let indiceSerie = listaSeries.findIndex(
    (serie) => serie.codigo === codigo.value
  );

  (listaSeries[indiceSerie].titulo = titulo.value),
    (listaSeries[indiceSerie].descripcion = descripcion.value),
    (listaSeries[indiceSerie].urlImg = urlImg.value),
    (listaSeries[indiceSerie].genero = genero.value),
    (listaSeries[indiceSerie].destacado = switch_destacado.checked);

  guardarListaSerie(); // Guardo el arreglo actualizado en el LS
  mostrarOcultarTabla(listaSeries); // Esta funcion tambien borra todas las filas que tenga la tabla
  cargaInicial(); // Vuelvo a dibujar las filas con el arreglo actualizado
  limpiarFormulario(); // Limpiar los inputs
};

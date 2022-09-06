import mostrarOcultarCards from "./mostrarOcultarCardsIndex.js";

const buscar = document.getElementById("buscar");

//Traigo las series almacenadas en el localStorage
let listaSeries =
  localStorage.length > 0
    ? JSON.parse(localStorage.getItem("Series"))
    : localStorage.setItem("Series", JSON.stringify([]));

mostrarOcultarCards(listaSeries); // Funcion para verificar si el LS tiene datos muestra la tabla, de lo contrario muestra un texto informando que no hay elementos para mostrar

// En esta funcion traigo el div que contendra todas las cards y le agrego el html restante para crear una card con los datos de la serie
const crearCards = (serie) => {
  const contenedorCards = document.getElementById("contenedorCards"); //Este contenedor se crea con la funcion mostrarOcultarCards()
  contenedorCards.innerHTML += `
 <div class="col">
  <div class="card shadow">
  <div class="overflow-hidden">
    <img
      src="${serie.urlImg}"
      class="card-img-index w-100"
      alt="${serie.titulo}"
      onclick="redireccionarPaginaDetalle('${serie.codigo}')"
    />
    </div>
    <div class="card-body px-3 pb-0">
      <h5 class="card-title">${serie.titulo}</h5>
      <p class="card-text card-descripcion">
        ${serie.descripcion}
      </p>
        <div class="card-footer px-0 py-3">
          <span class="badge rounded-pill text-bg-primary text-capitalize">${serie.genero}</span>
        </div>
    </div>
  </div>
</div>
    `;
};

// Con esta funcione recorro el arreglo de listaSeries y segun la longitud que tenga son las veces que se ejecutara la funcion crearFilas para agregar las filas a la tabla con los datos almacenados en el LS
const cargaInicialIndex = (listaSeriesParam) => {
  if (listaSeriesParam.length > 0) {
    listaSeriesParam.forEach((serie) => crearCards(serie));
  }
};

// Ejecuto la carga inicial para que se listen las series almacenadas en el LS a las cards
cargaInicialIndex(listaSeries);

// Con esta funcion redirecciono a la pagina detalleSerie.html con el codigo de la serie como parametro en la url
window.redireccionarPaginaDetalle = (codigo) => {
  // Con window.location.href redirecciono a la otra pagina porque al asignarle una url es como estar introduciendo el link directamente en el navegador, por otro lado window.location.origin me devuelve el dominio actual de mi pagina y luego le concateno la direccion de la pagina, esto hace que el link sea dinamico y el dominio cambie segun donde este hosteada la pagina
  window.location.href = `${window.location.origin}/pages/detalleSerie.html?codigo=${codigo}`;
};

// Funcion para filtrar las series por titulo a genero mediante un buscador
const filtrarSeries = (buscarParam) => {
  // Extraigo el valor de lo que escribo en el input
  let palabraClave = buscarParam.value.toLowerCase();
  // Filtro el arreglo de listaSeries
  let nuevoFiltro = listaSeries.filter((serie) => {
    const { titulo, genero } = serie;
    let tituloSerie = titulo.toLowerCase();
    let generoSerie = genero.toLowerCase();
    return (
      tituloSerie.indexOf(palabraClave) > -1 ||
      generoSerie.indexOf(palabraClave) > -1
      );
    });
  mostrarOcultarCards(nuevoFiltro);
  cargaInicialIndex(nuevoFiltro);
};

buscar.addEventListener("keyup",() => filtrarSeries(buscar));

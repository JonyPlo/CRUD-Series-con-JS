import mostrarOcultarCards from "./mostrarOcultarCardsIndex.js";

//Traigo las series almacenadas en el localStorage
let listaSeries = [];

// Este if valida si el LS tiene datos, los guarda en el array listaSeries, de lo contrario, crea un array vacio detro del LS
if (localStorage.length > 0) {
  listaSeries = JSON.parse(localStorage.getItem("Series")); //Si LS tiene datos, los cargo en el arreglo
} else {
  localStorage.setItem("Series", JSON.stringify([])); //Si no, creo una key Series con un array vacio dentro del LS
}

mostrarOcultarCards(listaSeries); // Funcion para verificar si el LS tiene datos muestra la tabla, de lo contrario muestra un texto informando que no hay elementos para mostrar

// En esta funcion traigo el div que contendra todas las cards y le agrego el html restante para crear una card con los datos de la serie
const crearCards = (serie) => {
  const contenedorCards = document.getElementById("contenedorCards");
  contenedorCards.innerHTML += `
 <div class="col">
  <div class="card shadow">
  <div class="overflow-hidden">
    <img
      src="${serie.urlImg}"
      class="card-img-index"
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

//Ejeculo la carga inicial para que se listen las series almacenadas en el LS a las cards
cargaInicialIndex(listaSeries);

// Con esta funcion redirecciono a la pagina detalleSerie.html con el codigo de la serie como parametro en la url
window.redireccionarPaginaDetalle = (codigo) => {
  window.location.href = `detalleSerie.html?codigo=${codigo}`;
};

// Traigo la url de la pagina detalleSerie.html con el parametro y la guardo en una variable

// Forma de extraer parametros de la url con el objeto URL
//<------- OPCION 1 ------->
// const param = window.location.href;
// const url = new URL(param);
// console.log(url.searchParams.get("codigo")); //De esta forma se toma el parametro
//<------- OPCION 2 ------->
// let url = (new URL(window.location)).searchParams;
// console.log(url.get("codigo")); //De esta forma se toma el parametro
// ---------------------------------------------------------------------
// Forma de extraer parametros de la url con el objeto URLSearchParams
const param = window.location.search;
const url = new URLSearchParams(param);
// console.log(url.get("codigo")); //De esta forma se toma el parametro

// Traigo todas las series almacenadas en el localStorage
let listaSeries = JSON.parse(localStorage.getItem("Series")) || [];

//Busco en el arreglo de series la serie con el mismo codigo que el que me llega por parametro desde la url, en este caso para traer el parametro 'codigo' lo traigo de esta forma url.get("codigo")
let serie = listaSeries.find((serie) => serie.codigo === url.get("codigo"));

//Traigo el contenedor de la portada y le introduzco la imagen de la serie
const listarPortada = (portadaParam) => {
  const portada = document.getElementById("portada");
  portada.innerHTML = `
        <img
        src="${portadaParam.urlImg}"
        alt="${portadaParam.titulo}"
        class="portada-img"
        />
    `;
};

listarPortada(serie);

//Traigo el contenedor de la card y le introduzco el html restante para crear la card con los datos de la serie
const listarCard = (serieParam) => {
  const card = document.getElementById("card-detalle-serie");
  card.innerHTML = `
    <div class="card">
            <div class="d-block d-lg-flex g-0">
              <div class="col-md-12 col-lg-4 d-flex align-items-center">
                <img
                  src="${serieParam.urlImg}"
                  class="img-card-detalle rounded-start"
                  alt="${serieParam.titulo}"
                />
              </div>
              <div class="col-md-12 col-lg-8">
                <div class="card-body h-100 d-flex flex-column pb-0">
                  <h5 class="card-title fs-2 mb-4">${serieParam.titulo}</h5>
                  <p class="card-text fs-5">
                    ${serieParam.descripcion}
                  </p>
                  <div class="card-footer px-0 py-3 mt-auto">
                    <span
                      class="badge rounded-pill text-bg-primary text-capitalize"
                      >${serieParam.genero}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
};

listarCard(serie);

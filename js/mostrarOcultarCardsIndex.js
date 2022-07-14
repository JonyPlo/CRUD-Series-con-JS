const sectionCards = document.getElementById("sectionCards");

 const mostrarOcultarCards = (listaSeries) => { 
    if (listaSeries.length > 0)
    {
        sectionCards.innerHTML = `
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4" id="contenedorCards"></div>
        `;
    } else {
        sectionCards.innerHTML = `
        <div class="text-center mt-5">
          <h2 class="display-4">No hay series cargadas</h2>
          <p class="lead">Para agregar una serie, ve a la pestaña "Admin"</p>
        </div>
        `;
    }
}

export default mostrarOcultarCards;
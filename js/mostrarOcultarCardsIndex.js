const sectionCards = document.getElementById("sectionCards");

 const mostrarOcultarCards = (listaSeries) => { 
    if (listaSeries.length > 0)
    {
        sectionCards.innerHTML = `
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" id="contenedorCards"></div>
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


// <div class="col">
//   <div class="card h-100">
//     <img
//       src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg"
//       class="card-img-top"
//       alt="One Piece"
//     />
//     <div class="card-body px-3 pb-0">
//       <h5 class="card-title">One Piece</h5>
//       <p class="card-text card-descripcion">
//         This is a longer card with supporting text below as a natural lead-in to
//         additional content. This content is a little bit longer.
//       </p>
//       <div class="card-footer px-0 py-3">
//         <span class="badge rounded-pill text-bg-primary">Primary</span>
//       </div>
//     </div>
//   </div>
// </div>;
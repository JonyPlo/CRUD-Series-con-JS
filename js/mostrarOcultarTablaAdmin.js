// Si el LS no tiene datos mostrara un Texto, de lo contrario mostrara la tabla

// Variable del article de la tabla
let articleTable = document.getElementById("articleTabla");

const mostrarOcultarTabla = (listaSeries) => {
  if (listaSeries.length > 0) {
    articleTable.innerHTML = `
        <table class="table">
            <thead>
              <tr>
                <th scope="col">Cod.</th>
                <th scope="col">Titulo</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Imagen</th>
                <th scope="col">Genero</th>
                <th scope="col">Destacado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody id="tbodySeries"></tbody>
          </table>
        `;
  } else {
    articleTable.innerHTML = `
        <h2 class="display-4 text-center mt-5">No hay datos para mostrar por el momento</h2>
        `;
  }
};

export default mostrarOcultarTabla;
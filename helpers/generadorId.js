// Funcion para generar el id de la Serie
const caracteres =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const longitudId = 10; // Esta variable indica la longitud que tendra el codigo generado
let id = ""; // En esta variable se almacena el codigo generado

export const generarId = (codigo) => {
  let listaSeries = JSON.parse(localStorage.getItem("Series")); //Traigo las series almacenadas en el localStorage
  // Este while se ejecuta solo si el input codigo no almacena ningun valor
  while (codigo.value === "") {
    // Este while da las vueltas segun el valor que tenga la variable longitudId para generar el codigo con esa cantidad de caracteres
    while (id.length < longitudId) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); // Cada numero o letra generada la concateno en la variable id
    }
    // En este if pregunto si el arreglo de listaSeries esta vacio, si no hay items, no busco ningun id repetido e introduzco el id generado en el input codigo, de lo contrario, ejecuto lo que esta en el else
    if (listaSeries.length === 0) {
      codigo.value = id;
    } else {
      // En este find busco el codigo repetido en los objetos, si el id generado coincide con el codigo de alguna serie, la variable buscarCodigoRepetido sera igual al codigo de la serie encontrada, pero si el id no coincide con el codigo de ninguna serie, entonces el id generado no esta repetido! por lo tanto buscarCodigoRepetido sera igual a undefine
      let buscarCodigoRepetido = listaSeries.find(
        (serie) => serie.codigo === id
      );
      if (!buscarCodigoRepetido) codigo.value = id; // Si buscarCodigoRepetido es undefined, guardo el id generado en el input codigo
    }
    id = ""; //Reseteo la variable id
  }
};

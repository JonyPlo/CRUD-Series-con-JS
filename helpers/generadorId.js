// Funcion para generar el id de la Serie
const caracteres =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const longitudId = 10;
let id = "";
let listaSeries = JSON.parse(localStorage.getItem("Series"));

export const generarId = () => {
  while (codigo.value === "") {
    // En este while genero el numero alfanumerico y lo guardoe nla variable id
    while (id.length < longitudId) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    } //Cierre while

    // En este find busco el codigo repetido en los objetos, si id generado coincide con el codigo de una serie, la variable buscarCodigoRepetido sera igual al codigo de la serie encontrada, pero si el id no coincide con el codigo de ninguna serie, entonces el id generado esta bien! por lo tanto buscarCodigoRepetido sera igual a undefined
    if (listaSeries.length === 0) {
      console.log("entro en el if");
      codigo.value = id;
    } else {
      console.log("entro en el else");
      let buscarCodigoRepetido = arrayLS.find((serie) => {
        return serie.codigo === id;
      });
      if (buscarCodigoRepetido === undefined) {
        codigo.value = id;
      }
    }
    id = "";
  } //Cierre while
};

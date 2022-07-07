// Funcion para generar el id de la Serie
const caracteres =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const longitudId = 10;
const arrayLS = JSON.parse(localStorage.getItem("Series"));
let id = "";

export const generarId = () => {
  while (codigo.value === "") {
    // En este while genero el numero alfanumerico y lo guardoe nla variable id
    while (id.length < longitudId) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    } //Cierre while

    // En este find busco el codigo repetido en los objetos, si id generado coincide con el codigo de una serie, la variable buscarCodigoRepetido sera igual al codigo de la serie encontrada, pero si el id no coincide con el codigo de ninguna serie, entonces el id generado esta bien! por lo tanto buscarCodigoRepetido sera igual a undefined
    let buscarCodigoRepetido = arrayLS.find((serie) => {
      return serie.codigo === id;
    });
    if (buscarCodigoRepetido === undefined) {
      codigo.value = id;
    }
    id = "";
  } //Cierre while
};

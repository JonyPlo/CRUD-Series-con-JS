// Funcion para generar el id de la Serie
export const generarId = () => {
  let caracteres =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  let longitudId = 20;
  while (id.length < longitudId) {
    id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  codigo.value = id;
};

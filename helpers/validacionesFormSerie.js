// Valido los campos del formulario

export const validarTitulo = (input) => {
  let regExpTitulo = /^[\w\.\s?]{5,50}$/;
  let esValido = regExpTitulo.test(input.value);
  // En este operador ternario se tiene en cuenta como condicional solo lo que esta despues del "=" y depende del resultado de la condicional dicho valor se asignara a lo que esta antes del "="
  input.className = esValido
    ? 'form-control is-valid'
    : 'form-control is-invalid';
  return esValido;
};

export const validarDescripcion = (input) => {
  let regExpDesc = /^[\w\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{100,1000}$/;
  if (regExpDesc.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

export const validarUrl = (input) => {
  let regExpUrl = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/g;
  if (regExpUrl.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

export const validarGenero = (input) => {
  let regExpGenero = /^[a-z?]+$/;
  if (
    (regExpGenero.test(input.value) && input.value === "accion") ||
    input.value === "comedia" ||
    input.value === "drama" ||
    input.value === "aventura"
  ) {
    input.className = "form-select is-valid";
    return true;
  } else {
    input.className = "form-select is-invalid";
    return false;
  }
};

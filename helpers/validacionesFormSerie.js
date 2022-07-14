// Valido los campos del formulario

export const validarTitulo = (e) => {
  let regExpTitulo = /^[\w\.\s?]{5,50}$/;
  if (regExpTitulo.test(e.value)) {
    e.className = "form-control is-valid";
    return true;
  } else {
    e.className = "form-control is-invalid";
    return false;
  }
};

export const validarDescripcion = (e) => {
  let regExpDesc = /^[\w\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{100,1000}$/;
  if (regExpDesc.test(e.value)) {
    e.className = "form-control is-valid";
    return true;
  } else {
    e.className = "form-control is-invalid";
    return false;
  }
};

export const validarUrl = (e) => {
  let regExpUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (regExpUrl.test(e.value)) {
    e.className = "form-control is-valid";
    return true;
  } else {
    e.className = "form-control is-invalid";
    return false;
  }
};

export const validarGenero = (e) => {
  let regExpGenero = /^[a-z?]+$/;
  if (
    (regExpGenero.test(e.value) && e.value === "accion") ||
    e.value === "comedia" ||
    e.value === "drama" ||
    e.value === "aventura"
  ) {
    e.className = "form-select is-valid";
    return true;
  } else {
    e.className = "form-select is-invalid";
    return false;
  }
};

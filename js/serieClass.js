export class Serie {
  constructor(codigo, titulo, descripcion, urlImg, genero) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.urlImg = urlImg;
    this.genero = genero;
  }
  // Agregar metodos necesarios

  get getCodigo() {
    return this.codigo;
  }

  get getTitulo() {
    return this.titulo;
  }

  get getDescripcion() {
    return this.descripcion;
  }

  get getUrlImg() {
    return this.urlImg;
  }

  get getGenero() {
    return this.genero;
  }

  set setCodigo(codigo) {
    this.codigo = codigo;
  }

  set setTitulo(titulo) {
    this.titulo = titulo;
  }

  set setDescripcion(descripcion) {
    this.descripcion = descripcion;
  }

  set setUrlImg(urlImg) {
    this.urlImg = urlImg;
  }

  set setGenero(genero) {
    this.genero = genero;
  }
}

export class Pelicula {
    constructor(titulo, tipo, categoria, caratura, portada, trailer, video, descripcion, publicada ) {
      this.codigo = window.self.crypto.randomUUID();
      this.titulo = titulo;
      this.tipo = tipo;
      this.categoria = categoria;
      this.caratula = caratula;
      this.portada = portada;
      this.trailer = trailer;
      this.video = video;
      this.descripcion = descripcion;
      this.publicada = publicada;
    }
  }
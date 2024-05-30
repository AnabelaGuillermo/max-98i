export class Serie {
    constructor(titulo, tipo, categoria, caratula, portada, trailer, video, descripcion, publicada ) {
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
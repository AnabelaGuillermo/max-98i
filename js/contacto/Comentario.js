export class Comentario {
  constructor(name, surName, email) {
    this.codigo = window.self.crypto.randomUUID();
    this.name = name;
    this.surName = surName;
    this.email = email;
  }
}

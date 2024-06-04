export class Usuario {
    constructor(name, surName, email, password) {
      this.codigo = window.self.crypto.randomUUID();
      this.name = name;
      this.surName = surName;
      this.email = email;
      this.password = password;
    }
  }
  
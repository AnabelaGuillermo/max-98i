import { obtenerComentarioDeLs } from "../utils.js";
import { Comentario } from "./Comentario.js";

export const agregarComentario = (nombre, apellido, email) => {
  const comentario = new Comentario(nombre, apellido, email);

  const comentarios = obtenerComentarioDeLs() || [];

  comentarios.push(comentario);

  localStorage.setItem("comentarios", JSON.stringify(comentarios));
};

import {
  validateEmail,
  validateNameReg,
  validateSurName,
} from "../validators.js";
import { agregarComentario } from "./abm.js";

//seleccionando los elementos
const $form = document.getElementById("form-contacto");
const $inputNombre = document.getElementById("input-nombre");
const $inputApellido = document.getElementById("input-apellido");
const $inputEmail = document.getElementById("input-email");

$inputNombre.addEventListener("blur", () => {
  validateNameReg($inputNombre);
});

$inputApellido.addEventListener("blur", () => {
  validateSurName($inputApellido);
});

$inputEmail.addEventListener("blur", () => {
  validateEmail($inputEmail);
});

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  //valiadacion de campos
  const isNameValid = validateNameReg($inputNombre);
  const isSurNameValid = validateSurName($inputApellido);
  const isEmailValid = validateEmail($inputEmail);

  if (!isNameValid || !isSurNameValid || !isEmailValid) {
    alert("por favor, revise los campos e intentelo de nuevo");
    return;
  }

  const nombre = $inputNombre.value;
  const apellido = $inputApellido.value;
  const email = $inputEmail.value;

  agregarComentario(nombre, apellido, email);

  alert("Su comentario ha sido enviado correctamente.");

  $form.reset();
  $inputNombre.classList.remove("is-valid", "is-invalid");
  $inputApellido.classList.remove("is-valid", "is-invalid");
  $inputEmail.classList.remove("is-valid", "is-invalid");
});

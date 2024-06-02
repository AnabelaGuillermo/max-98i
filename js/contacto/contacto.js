import {
  validateEmailReg,
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
  validateEmailReg($inputEmail);
});

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  //valiadacion de campos
  const isNameValid = validateNameReg($inputNombre);
  const isSurNameValid = validateSurName($inputApellido);
  const isEmailValid = validateEmailReg($inputEmail);

  if (!isNameValid || !isSurNameValid || !isEmailValid) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, revise los campos e inténtelo de nuevo'
    });
    return;
  }

  const nombre = $inputNombre.value;
  const apellido = $inputApellido.value;
  const email = $inputEmail.value;

  agregarComentario(nombre, apellido, email);

  Swal.fire({
    icon: 'success',
    title: '¡Enviado!',
    text: 'Su comentario ha sido enviado correctamente.'
  });

  $form.reset();
  $inputNombre.classList.remove("is-valid", "is-invalid");
  $inputApellido.classList.remove("is-valid", "is-invalid");
  $inputEmail.classList.remove("is-valid", "is-invalid");
});

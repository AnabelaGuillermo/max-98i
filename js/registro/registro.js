import {
  validateEmail,
  validateName,
  validateSurName,
  validatePassword,
} from "../validators.js";

import { agregarUsuario } from "./abm.js";

// Seleccionando los elementos
const $form = document.getElementById("form-registro");
const $inputName = document.getElementById("input-name");
const $inputSurName = document.getElementById("input-surname");
const $inputEmail = document.getElementById("input-email");
const $inputPassword = document.getElementById("input-password");

$inputName.addEventListener('blur', () => {
  validateName($inputName);
});

$inputSurName.addEventListener('blur', () => {
  validateSurName($inputSurName);
});

$inputEmail.addEventListener('blur', () => {
  validateEmail($inputEmail);
});

$inputPassword.addEventListener('blur', () => {
  validatePassword($inputPassword);
});

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validación de campos
  if (
    !validateName($inputName) ||
    !validateSurName($inputSurName) ||
    !validateEmail($inputEmail) ||
    !validatePassword($inputPassword)
  ) {
    alert("Por favor, revise los campos e inténtelo de nuevo.");
    return;
  }

  // Datos extraídos
  const nombre = $inputName.value;
  const apellido = $inputSurName.value;
  const email = $inputEmail.value;
  const contraseña = $inputPassword.value;

  agregarUsuario(nombre, apellido, email, contraseña)

  $form.reset();
  $inputName.classList.remove('is-valid', 'is-invalid')
  $inputEmail.classList.remove('is-valid', 'is-invalid')
  $inputPassword.classList.remove('is-valid', 'is-invalid')
});

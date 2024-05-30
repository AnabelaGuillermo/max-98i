import {
  validateEmail,
  validateNameReg,
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

$inputName.addEventListener("blur", () => {
  validateNameReg($inputName);
});

$inputSurName.addEventListener("blur", () => {
  validateSurName($inputSurName);
});

$inputEmail.addEventListener("blur", () => {
  validateEmail($inputEmail);
});

$inputPassword.addEventListener("blur", () => {
  validatePassword($inputPassword);
});

$form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Validación de campos
  const isNameValid = validateNameReg($inputName);
  const isSurNameValid = validateSurName($inputSurName);
  const isEmailValid = validateEmail($inputEmail);
  const isPasswordValid = validatePassword($inputPassword);

  if (!isNameValid || !isSurNameValid || !isEmailValid || !isPasswordValid) {
    alert("Por favor, revise los campos e inténtelo de nuevo.");
    return;
  }

  // Datos extraídos
  const nombre = $inputName.value;
  const apellido = $inputSurName.value;
  const email = $inputEmail.value;
  const contraseña = $inputPassword.value;

  agregarUsuario(nombre, apellido, email, contraseña);

  $form.reset();
  $inputName.classList.remove("is-valid", "is-invalid");
  $inputSurName.classList.remove("is-valid", "is-invalid");
  $inputEmail.classList.remove("is-valid", "is-invalid");
  $inputPassword.classList.remove("is-valid", "is-invalid");

  window.location.href = "error404.html";
});
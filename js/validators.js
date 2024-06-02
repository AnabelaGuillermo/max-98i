// combinedValidators.js

// Funciones de validación generales
export const validateName = (name) => {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return false;
  }

  const trimmedValue = name.trim();
  if (trimmedValue.length < 3 || trimmedValue.length > 100) { // Usamos el rango mayor (3-100)
    return false;
  }

  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
  return regex.test(trimmedValue);
};

export const validateUrl = (url) => {
  if (!url || typeof url !== "string" || url.trim().length === 0) {
    return false;
  }

  const trimmedValue = url.trim();
  if (trimmedValue.length < 3) {
    return false;
  }

  const regex = /^\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]$/;
  return regex.test(trimmedValue);
};

export const validateEmail = (email) => {
  if (typeof email !== 'string' || email.trim() === '') {
    return false;
  }

  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email.trim());
};

export const validatePassword = (password) => {
  if (typeof password !== 'string' || password.trim() === '') {
    return false;
  }

  const regex = /^.{3,15}$/;
  return regex.test(password.trim());
};

// Funciones de validación específicas para registro
export const validateNameReg = (field) => {
  const name = field.value.trim();
  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;

  if (name.length >= 3 && name.length <= 20 && regex.test(name)) {
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    return true;
  } else {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
};

export const validateSurName = (field) => {
  const surName = field.value.trim();
  const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;

  if (surName.length >= 3 && surName.length <= 20 && regex.test(surName)) {
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    return true;
  } else {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
};

export const validateEmailReg = (field) => {
  const email = field.value.trim();
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (email.length >= 3 && email.length <= 100 && regex.test(email)) {
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    return true;
  } else {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
};

export const validatePasswordReg = (field) => {
  const password = field.value.trim();
  const lettersOnlyRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ]+$/;
  const repeatedCharRegex = /(.)\1{4,}/;

  if (
    password.length >= 10 &&
    password.length <= 15 &&
    lettersOnlyRegex.test(password) &&
    !repeatedCharRegex.test(password)
  ) {
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
    return true;
  } else {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
};

// validators.js
export const validateName = (name) => {
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return false;
  }

  const trimmedValue = name.trim();
  if (trimmedValue.length < 3 || trimmedValue.length > 25) {
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

  const regex =
    /^\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]$/;
  return regex.test(trimmedValue);
};

//VALIDACIONES PARA REGISTRO

export const validateSurName = (name) => {
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return false;
    }
  
    const trimmedValue = name.trim();
    if (trimmedValue.length < 3 || trimmedValue.length > 25) {
      return false;
    }
  
    const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
    return regex.test(trimmedValue);
  };

//VALIDAR EMAIL
export const validateEmail = (field) => {
  if (!field || !field.value.trim()) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
  if (field.value.trim().lenght < 3 || field.value.trim().lenght > 100) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regex.test(field.value)) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");
  return true;
};

//====================
export const validatePassword = (field) => {
  if (!field || !field.value.trim()) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }
  
  const trimmedValue = field.value.trim();

  if (trimmedValue.length < 10) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }

  const lettersOnlyRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ]+$/;
  if (!lettersOnlyRegex.test(trimmedValue)) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }

  const repeatedCharRegex = /(.)\1{4,}/;
  if (repeatedCharRegex.test(trimmedValue)) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }

  // Si todas las validaciones pasan
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");
  return true;
};

//=================

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

export const validateEmail = (field) => {
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

export const validatePassword = (field) => {
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

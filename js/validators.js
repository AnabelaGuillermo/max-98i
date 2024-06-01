// validators.js
export const validateName = (name) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return false;
    }

    const trimmedValue = name.trim();
    if (trimmedValue.length < 3 || trimmedValue.length > 100) {
        return false;
    }

    const regex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ\s]+$/;
    return regex.test(trimmedValue);
};

export const validateUrl = (url) => {
    if (!url || typeof url !== 'string' || url.trim().length === 0) {
        return false;
    }

    const trimmedValue = url.trim();
    if (trimmedValue.length < 3) {
        return false;
    }

    const regex = /^\b(?:https?|ftp):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]$/;
    return regex.test(trimmedValue);
};
export function validateEmail(email) {
    if (typeof email !== 'string' || email.trim() === '') {
      return false;
    }
  
    const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regexEmail.test(email.trim());
}
  
export function validatePassword(password) {
    if (typeof password !== 'string' || password.trim() === '') {
      return false;
    }
  
    const regexPassword = /^.{3,15}$/;
    return regexPassword.test(password.trim());
}

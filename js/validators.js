// validators.js
export const validateName = (name) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
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

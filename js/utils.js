// utils.js
export function obtenerCategoriasDeLS() {
    return JSON.parse(localStorage.getItem('categorias')) || [];
}

export function guardarCategoriasEnLS(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

export function obtenerPeliculasDeLS() {
    return JSON.parse(localStorage.getItem('peliculas')) || [];
}

export function guardarPeliculasEnLS(peliculas) {
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
}

export function obtenerSeriesDeLS() {
    return JSON.parse(localStorage.getItem('series')) || [];
}

export function guardarSeriesEnLS(series) {
    localStorage.setItem('series', JSON.stringify(series));
}

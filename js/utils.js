// utils.js

// Importa la función para obtener todas las películas del almacenamiento local
export function obtenerPeliculasDeLS() {
    return JSON.parse(localStorage.getItem('peliculas')) || [];
}

// Importa la función para guardar las películas en el almacenamiento local
export function guardarPeliculasEnLS(peliculas) {
    localStorage.setItem('peliculas', JSON.stringify(peliculas));
}

// Define la función para obtener las películas destacadas
export function obtenerPeliculasDestacadas() {
    // Obtiene todas las películas del almacenamiento local
    const peliculas = obtenerPeliculasDeLS();
    // Filtra las películas destacadas
    const peliculasDestacadas = peliculas.filter(pelicula => pelicula.destacado);
    // Retorna las películas destacadas
    return peliculasDestacadas;
}

// Exporta las funciones para obtener y guardar series en el almacenamiento local
export function obtenerSeriesDeLS() {
    return JSON.parse(localStorage.getItem('series')) || [];
}

export function guardarSeriesEnLS(series) {
    localStorage.setItem('series', JSON.stringify(series));
}

// Exporta las funciones para obtener y guardar categorías en el almacenamiento local
export function obtenerCategoriasDeLS() {
    return JSON.parse(localStorage.getItem('categorias')) || [];
}

export function guardarCategoriasEnLS(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}
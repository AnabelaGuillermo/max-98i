import { obtenerPeliculasDeLS } from '../js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const resultadosAccion = document.getElementById('resultados-categorias-accion');
    const peliculas = obtenerPeliculasDeLS().filter(pelicula => pelicula.categoria === 'Accion');

    let currentPage = 0;
    const itemsPerPage = 12;

    function cargarPeliculasSeries() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const moviesToLoad = peliculas.slice(start, end);

        moviesToLoad.forEach(pelicula => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-2 tarjeta-resultados-categorias';

            const img = document.createElement('img');
            img.src = pelicula.caratula;
            img.className = 'img-fluid';
            img.alt = pelicula.titulo;

            const h5 = document.createElement('h5');
            h5.className = 'titulo-resultados-caratulas';
            h5.textContent = pelicula.titulo;

            col.appendChild(img);
            col.appendChild(h5);
            resultadosAccion.appendChild(col);
        });

        currentPage++;
    }

    function manejarScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            cargarPeliculasSeries();
        }
    }

    window.addEventListener('scroll', manejarScroll);

    // Cargar las películas y series
    cargarPeliculasSeries();
});

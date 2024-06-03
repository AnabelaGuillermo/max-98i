import { obtenerPeliculasDeLS } from '../js/utils.js';
import { obtenerSeriesDeLS } from '../js/utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const resultados = document.getElementById('resultados-categorias-verTodo');
    const peliculas = obtenerPeliculasDeLS();
    const series = obtenerSeriesDeLS();
    
    // Combinar películas y series y filtrar por publicación
    const todasLasEntradas = [...peliculas, ...series].filter(item => item.publicada === 'Sí');

    let currentPage = 0;
    const itemsPerPage = 12;

    function cargarPeliculasSeries() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToLoad = todasLasEntradas.slice(start, end);

        itemsToLoad.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-2 tarjeta-resultados-categorias';

            const img = document.createElement('img');
            img.src = item.caratula;
            img.className = 'img-fluid';
            img.alt = item.titulo;

            const h5 = document.createElement('h5');
            h5.className = 'titulo-resultados-caratulas';
            h5.textContent = item.titulo;

            col.appendChild(img);
            col.appendChild(h5);
            resultados.appendChild(col);
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

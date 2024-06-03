import { obtenerPeliculasDeLS } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const resultadosPeliculas = document.getElementById('resultados-peliculas');
    const filtroCategoria = document.getElementById('filtro-categoria');
    
    // Filtrar por tipo y publicación
    let peliculas = obtenerPeliculasDeLS().filter(pelicula => pelicula.tipo === 'Pelicula' && pelicula.publicada === 'Sí');
    
    let currentPage = 0;
    const itemsPerPage = 12;
    let categoriaActual = 'todos';

    function cargarPeliculasSeries() {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const peliculasFiltradas = peliculas.filter(pelicula => 
            categoriaActual === 'todos' || pelicula.categoria === categoriaActual
        );
        const moviesToLoad = peliculasFiltradas.slice(start, end);

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
            resultadosPeliculas.appendChild(col);
        });

        currentPage++;
    }

    function manejarScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            cargarPeliculasSeries();
        }
    }

    function aplicarFiltro() {
        resultadosPeliculas.innerHTML = '';
        currentPage = 0;
        cargarPeliculasSeries();
    }

    filtroCategoria.addEventListener('change', (e) => {
        categoriaActual = e.target.value;
        aplicarFiltro();
    });

    window.addEventListener('scroll', manejarScroll);

    // Cargar las películas y series inicialmente
    cargarPeliculasSeries();
});

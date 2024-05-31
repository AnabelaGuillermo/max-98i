document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const peliculaIndex = urlParams.get('peliculaIndex');

    if (peliculaIndex !== null) {
        // Obtener las películas almacenadas en el localStorage
        const peliculas = JSON.parse(localStorage.getItem('peliculas'));

        // Verificar si las películas existen en el localStorage
        if (peliculas && Array.isArray(peliculas) && peliculas.length > 0) {
            // Obtener los detalles de la película según el índice proporcionado
            const pelicula = peliculas[parseInt(peliculaIndex)];

            // Obtener la portada del trailer
            const portadaTrailer = document.getElementById('portada-trailer');

            // Mostrar la portada del trailer
            portadaTrailer.src = pelicula.portada;

            // Obtener el botón de reproducir
            const reproducirBtn = document.querySelector('.reproducir-detalle');

            // Agregar evento clic al botón de reproducir
            reproducirBtn.addEventListener('click', () => {
                // Obtener el enlace del trailer
                const trailerUrl = `https://www.youtube.com/watch?v=${pelicula.video}`;
                // Abrir el trailer en una nueva pestaña
                window.open(trailerUrl, '_blank');
            });

            // Resto del código para actualizar otros detalles de la película
            const tituloDetalle = document.querySelector('.titulo-detalle');
            const categoriaDetalle = document.getElementById('categoria-detalle');
            const descripcionDetalle = document.getElementById('descripcion-detalle');

            tituloDetalle.textContent = pelicula.titulo;
            categoriaDetalle.textContent = `Categoría: ${pelicula.categoria}`;
            descripcionDetalle.textContent = pelicula.descripcion;
        } else {
            console.error("No se encontraron películas en el almacenamiento local.");
        }
    } else {
        console.error("El índice de la película no se proporcionó en la URL.");
    }
});

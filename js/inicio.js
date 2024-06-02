// Importar la función para obtener películas destacadas
import { obtenerPeliculasDestacadas } from './utils.js';

// Función para cargar las películas destacadas en el carrusel
function cargarPeliculasDestacadasEnCarrusel() {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselIndicators = document.querySelector(".carousel-indicators");

  // Obtener las películas destacadas
  const peliculasDestacadas = obtenerPeliculasDestacadas();

  // Limpiar el contenido actual del carrusel
  carouselInner.innerHTML = '';
  carouselIndicators.innerHTML = '';

  // Iterar sobre las películas destacadas y agregarlas al carrusel
  peliculasDestacadas.forEach((pelicula, index) => {
    const isActive = index === 0 ? "active" : "";

    // Construir el HTML del slide
    const slideHTML = `
      <div class="carousel-item ${isActive}">
        <img src="${pelicula.portada}" class="d-block w-100" alt="${pelicula.titulo}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${pelicula.titulo}</h5>
          <p>${pelicula.descripcion}</p>
          <a class="btn link-reproducir" href="${pelicula.video}" target="_blank"><i class="fa-regular fa-circle-play"></i> REPRODUCIR</a>
          <a class="btn link-ver-mas" href="./detalle.html?peliculaIndex=${index}">VER MÁS...</a>
        </div>
      </div>
    `;

    // Agregar el slide al carrusel
    carouselInner.innerHTML += slideHTML;

    // Construir el HTML del indicador
    const indicatorHTML = `
      <button
        type="button"
        data-bs-target="#carousel-inicio"
        data-bs-slide-to="${index}"
        class="${isActive}"
        aria-label="Slide ${index + 1}"
      ></button>
    `;

    // Agregar el indicador al carrusel
    carouselIndicators.innerHTML += indicatorHTML;
  });

  // Inicializar el carrusel de Bootstrap usando JavaScript puro
  const myCarousel = document.querySelector('#carousel-inicio');
  const carousel = new bootstrap.Carousel(myCarousel);
}

// Llamar a la función para cargar las películas destacadas en el carrusel cuando se cargue la página
window.addEventListener("load", () => {
  cargarPeliculasDestacadasEnCarrusel();
});
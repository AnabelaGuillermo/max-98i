import { obtenerPeliculasDestacadas } from './utils.js';

function cargarPeliculasDestacadasEnCarrusel() {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselIndicators = document.querySelector(".carousel-indicators");

  const peliculasDestacadas = obtenerPeliculasDestacadas();

  carouselInner.innerHTML = '';
  carouselIndicators.innerHTML = '';

  peliculasDestacadas.forEach((pelicula, index) => {
    const isActive = index === 0 ? "active" : "";

    const slideHTML = `
      <div class="carousel-item ${isActive}">
        ${
          window.innerWidth < 768 ?
          `<img src="${pelicula.caratula}" class="d-block w-100" alt="${pelicula.titulo}">` :
          `<img src="${pelicula.portada}" class="d-block w-100" alt="${pelicula.titulo}">`
        }
        <div class="carousel-caption">
          <h5>${pelicula.titulo}</h5>
          <p>${pelicula.descripcion}</p>
          <a class="btn link-reproducir" href="${pelicula.video}" target="_blank"><i class="fa-regular fa-circle-play"></i> REPRODUCIR</a>
          <a class="btn link-ver-mas" href="./detalle.html?peliculaIndex=${index}">VER MÁS...</a>
        </div>
      </div>
    `;

    carouselInner.innerHTML += slideHTML;

    const indicatorHTML = `
      <button
        type="button"
        data-bs-target="#carousel-inicio"
        data-bs-slide-to="${index}"
        class="${isActive}"
        aria-label="Slide ${index + 1}"
      ></button>
    `;

    carouselIndicators.innerHTML += indicatorHTML;
  });

  const myCarousel = document.querySelector('#carousel-inicio');
  const carousel = new bootstrap.Carousel(myCarousel);
}

window.addEventListener("load", () => {
  cargarPeliculasDestacadasEnCarrusel();
});

// Manejar cambios en el tamaño de la ventana
window.addEventListener("resize", () => {
  cargarPeliculasDestacadasEnCarrusel();
});

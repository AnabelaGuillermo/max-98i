import { obtenerPeliculasDeLS } from "./utils.js";

// Función para seleccionar elementos aleatorios de un array
function obtenerPeliculasAleatorias(peliculas, num) {
  let seleccionadas = [];
  while (seleccionadas.length < num && peliculas.length > 0) {
    const index = Math.floor(Math.random() * peliculas.length);
    seleccionadas.push(peliculas.splice(index, 1)[0]);
  }
  return seleccionadas;
}

// Función para crear un elemento película
function crearElementoPelicula(pelicula) {
  const peliculaElemento = document.createElement("div");
  peliculaElemento.classList.add("pelicula");

  const img = document.createElement("img");
  img.src = pelicula.caratula;
  img.alt = pelicula.titulo;

  const titulo = document.createElement("div");
  titulo.classList.add("titulo");
  titulo.textContent = pelicula.titulo;

  peliculaElemento.appendChild(img);
  peliculaElemento.appendChild(titulo);

  return peliculaElemento;
}

// Función para renderizar las películas en el slider
function renderizarPeliculas(contenedor, peliculas) {
  contenedor.innerHTML = ""; // Limpiamos el contenedor

  // Duplicar las películas para efecto de ciclo infinito
  const peliculasDuplicadas = [...peliculas, ...peliculas];

  peliculasDuplicadas.forEach((pelicula) => {
    const peliculaElemento = crearElementoPelicula(pelicula);
    contenedor.appendChild(peliculaElemento);
  });

  // Ajustar la posición del contenedor para el ciclo infinito
  contenedor.scrollLeft = contenedor.clientWidth / 2;
}

// Función para manejar el scroll del contenedor
function desplazarSlider(contenedor, direccion) {
  const desplazamiento =
    direccion === "left"
      ? -contenedor.clientWidth / 2
      : contenedor.clientWidth / 2;
  contenedor.scrollBy({ left: desplazamiento, behavior: "smooth" });

  // Ajustar la posición del contenedor después del desplazamiento
  setTimeout(() => {
    if (contenedor.scrollLeft <= 0) {
      contenedor.scrollLeft =
        contenedor.scrollWidth / 2 - contenedor.clientWidth;
    } else if (
      contenedor.scrollLeft >=
      contenedor.scrollWidth - contenedor.clientWidth
    ) {
      contenedor.scrollLeft = contenedor.clientWidth / 2;
    }
  }, 500); 
}

// Agregar event listeners a las flechas
document.querySelectorAll(".arrow.left").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const contenedor = arrow.parentElement.querySelector(
      ".peliculas-recomendadas-slider"
    );
    desplazarSlider(contenedor, "left");
  });
});

document.querySelectorAll(".arrow.right").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const contenedor = arrow.parentElement.querySelector(
      ".peliculas-recomendadas-slider"
    );
    desplazarSlider(contenedor, "right");
  });
});

// Obtener las películas de Local Storage y seleccionarlas de manera aleatoria
const peliculas1 = obtenerPeliculasDeLS().filter(pelicula => pelicula.publicada === 'Sí');
const peliculas2 = obtenerPeliculasDeLS().filter(pelicula => pelicula.publicada === 'Sí');
const peliculas3 = obtenerPeliculasDeLS().filter(pelicula => pelicula.publicada === 'Sí');

if (
  peliculas1.length === 0 ||
  peliculas2.length === 0 ||
  peliculas3.length === 0
) {
  console.error("No se encontraron películas publicadas en el Local Storage.");
} else {
  const peliculasAleatorias1 = obtenerPeliculasAleatorias(peliculas1, 10);
  const peliculasAleatorias2 = obtenerPeliculasAleatorias(peliculas2, 10);
  const peliculasAleatorias3 = obtenerPeliculasAleatorias(peliculas3, 10);

  renderizarPeliculas(
    document.querySelector("#slider1 .peliculas-recomendadas-slider"),
    peliculasAleatorias1
  );
  renderizarPeliculas(
    document.querySelector("#slider2 .peliculas-recomendadas-slider"),
    peliculasAleatorias2
  );
  renderizarPeliculas(
    document.querySelector("#slider3 .peliculas-recomendadas-slider"),
    peliculasAleatorias3
  );
}

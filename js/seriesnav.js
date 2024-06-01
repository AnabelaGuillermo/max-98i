import { obtenerPeliculasDeLS } from "../js/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const resultadosSeries = document.getElementById("resultados-peliculas"); // Cambiado a resultados-peliculas
  const filtroCategoria = document.getElementById("filtro-categoria");

  let series = obtenerPeliculasDeLS();
  console.log(series); // Añadido para verificar si se están cargando las series correctamente

  let currentPage = 0;
  const itemsPerPage = 12;
  let categoriaActual = "todos";

  function cargarSeries() {
    console.log("Cargando series..."); // Añadido para verificar si se llama a esta función

    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const seriesFiltradas = series.filter(
      (serie) =>
        (categoriaActual === "todos" || serie.categoria === categoriaActual) &&
        serie.tipo === "Serie"
    );
    console.log(seriesFiltradas); // Añadido para verificar si se están filtrando las series correctamente

    const seriesToLoad = seriesFiltradas.slice(start, end);

    seriesToLoad.forEach((serie) => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 col-lg-2 tarjeta-resultados-categorias";

      const img = document.createElement("img");
      img.src = serie.caratula;
      img.className = "img-fluid";
      img.alt = serie.titulo;

      const h5 = document.createElement("h5");
      h5.className = "titulo-resultados-caratulas";
      h5.textContent = serie.titulo;

      col.appendChild(img);
      col.appendChild(h5);
      resultadosSeries.appendChild(col);
    });

    currentPage++;
  }

  function manejarScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      cargarSeries();
    }
  }

  function aplicarFiltro() {
    resultadosSeries.innerHTML = "";
    currentPage = 0;
    cargarSeries();
  }

  filtroCategoria.addEventListener("change", (e) => {
    categoriaActual = e.target.value;
    aplicarFiltro();
  });

  window.addEventListener("scroll", manejarScroll);

  // Cargar las series inicialmente
  cargarSeries();
});
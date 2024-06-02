// busqueda.js

import { obtenerPeliculasDeLS, obtenerSeriesDeLS } from './utils.js';

// Función para obtener el parámetro de la URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Función para crear la tarjeta de resultado
function createResultCard(item) {
  const colDiv = document.createElement('div');
  colDiv.className = 'col-6 col-md-2 mb-4 busqueda-div';

  const cardDiv = document.createElement('div');
  cardDiv.className = 'tarjeta-busqueda';

  const img = document.createElement('img');
  img.src = item.caratula;
  img.alt = item.titulo;
  img.className = 'caratula-busqueda';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = item.titulo;

  cardBody.appendChild(title);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);

  return colDiv;
}

// Función para mostrar los resultados
function displayResults(results) {
  const resultsContainer = document.getElementById('resultados-busqueda');
  resultsContainer.innerHTML = ''; // Limpiar resultados previos

  if (results.length === 0) {
    resultsContainer.textContent = 'No se encontraron resultados.';
  } else {
    results.forEach(item => {
      const resultCard = createResultCard(item);
      resultsContainer.appendChild(resultCard);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Evento para capturar el submit del formulario de búsqueda
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const searchQuery = document.getElementById('searchInput').value.trim();
      if (searchQuery) {
        window.location.href = `./archivoDeBusqueda.html?q=${encodeURIComponent(searchQuery)}`;
      }
    });
  }

  // Mostrar los resultados cuando el DOM esté cargado
  const searchQuery = getQueryParameter('q');
  if (!searchQuery) return;

  const peliculas = obtenerPeliculasDeLS();
  const series = obtenerSeriesDeLS();

  const allItems = [...peliculas, ...series];
  const results = allItems.filter(item => item.titulo.toLowerCase().includes(searchQuery.toLowerCase()));

  displayResults(results);
});

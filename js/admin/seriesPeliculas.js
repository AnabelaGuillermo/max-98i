import { obtenerPeliculasDeLS, guardarPeliculasEnLS, obtenerCategoriasDeLS } from '../utils.js';
import { validateName, validateUrl } from '../validators.js';

document.addEventListener('DOMContentLoaded', () => {
    const peliculas = obtenerPeliculasDeLS();
    const tbody = document.getElementById('peliculas-series-tbody');

    function renderizarPeliculas() {
        tbody.innerHTML = '';
        peliculas.forEach((pelicula, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <input type="checkbox" id="destacar-checkbox-${index}" class="destacar-checkbox" style="display: none;">
                    <label for="destacar-checkbox-${index}" class="check">★</label>
                </td>
                <td>${index + 1}</td>
                <td><img src="${pelicula.caratula}" alt="Carátula" width="50"></td>
                <td>${pelicula.titulo}</td>
                <td>${pelicula.tipo}</td>
                <td>
                    ${pelicula.categoria ? pelicula.categoria : 
                    `<div class="label-floating mb-3">
                        <select class="form-control categoria" id="categoria-${index}"></select>
                        <label for="categoria-${index}">Categoría</label>
                    </div>`}
                </td>
                <td><img src="${pelicula.portada}" alt="Portada" width="50"></td>
                <td><a href="${pelicula.trailer}" target="_blank">Ver Trailer</a></td>
                <td><a href="${pelicula.video}" target="_blank">Ver Video</a></td>
                <td>${pelicula.descripcion}</td>
                <td>${pelicula.publicada}</td>
                <td>
                    <button class="btn btn-primary editar-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="btn btn-danger eliminar-btn"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            
            if (!pelicula.categoria) {
                // Llenar dinámicamente el menú desplegable de categorías solo si la película no tiene una categoría definida
                const selectCategoria = row.querySelector(`#categoria-${index}`);
                const categorias = obtenerCategoriasDeLS();
                categorias.forEach((categoria) => {
                    const option = document.createElement('option');
                    option.value = categoria; // Suponiendo que el nombre de la categoría es suficiente para identificarla
                    option.textContent = categoria;
                    selectCategoria.appendChild(option);
                });
            
                // Remover la opción predeterminada "Categorías"
                const defaultOption = selectCategoria.querySelector('option[value=""]');
                if (defaultOption) {
                    defaultOption.remove();
                }
            }

            tbody.appendChild(row);

            // Evento de clic para la estrella (checkbox)
            const checkbox = row.querySelector('.destacar-checkbox');
            const label = row.querySelector('.check');
            label.addEventListener('click', () => {
                console.log('Clic en la estrella');
                checkbox.checked = !checkbox.checked; // Cambia el estado del checkbox al hacer clic en la estrella
                // Disparar manualmente el evento change para que otros scripts lo capturen si es necesario
                const event = new Event('change', { bubbles: true });
                checkbox.dispatchEvent(event);
            });

            row.querySelector('.editar-btn').addEventListener('click', () => {
                editarPeliculaConfirmada(index);
            });

            row.querySelector('.eliminar-btn').addEventListener('click', () => {
                eliminarPeliculaConfirmada(index);
            });
        });
    }

    function editarPeliculaConfirmada(index) {
        const pelicula = peliculas[index];

        // Ocultar el botón de cancelar al inicio
        document.getElementById('button-cancelar').style.display = 'none';

        Swal.fire({
            title: '¿Seguro que quieres editar esta película?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, editar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Mostrar el botón de cancelar si se confirma la edición
                document.getElementById('button-cancelar').style.display = 'block';

                // Lógica para editar la película
                document.getElementById('titulo').value = pelicula.titulo;
                document.querySelector(`input[name="tipo"][value="${pelicula.tipo}"]`).checked = true;
                document.getElementById('categoria').value = pelicula.categoria;
                document.getElementById('caratula').value = pelicula.caratula;
                document.getElementById('portada').value = pelicula.portada;
                document.getElementById('trailer').value = pelicula.trailer;
                document.getElementById('video').value = pelicula.video;
                document.getElementById('descripcion').value = pelicula.descripcion;
                document.querySelector(`input[name="publicada"][value="${pelicula.publicada}"]`).checked = true;
                document.getElementById('form-peliculas-series').dataset.index = index;
            }
        });
    }

    function eliminarPeliculaConfirmada(index) {
        Swal.fire({
            title: '¿Seguro que quieres eliminar esta película?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                peliculas.splice(index, 1);
                guardarPeliculasEnLS(peliculas);
                renderizarPeliculas();
                Swal.fire({
                    title: 'Eliminada',
                    icon: 'success',
                    text: 'La película ha sido eliminada con éxito',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    }

    document.getElementById('form-peliculas-series').addEventListener('submit', (e) => {
        e.preventDefault();
        const index = e.target.dataset.index;
        const nuevaPelicula = {
            titulo: document.getElementById('titulo').value,
            tipo: document.querySelector('input[name="tipo"]:checked').value,
            categoria: document.getElementById('categoria').value,
            caratula: document.getElementById('caratula').value,
            portada: document.getElementById('portada').value,
            trailer: document.getElementById('trailer').value,
            video: document.getElementById('video').value,
            descripcion: document.getElementById('descripcion').value,
            publicada: document.querySelector('input[name="publicada"]:checked').value
        };

        if (!validateName(nuevaPelicula.titulo)) {
            Swal.fire({
                title: 'Error',
                text: 'El nombre de la película no puede estar vacío',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        if (!validateUrl(nuevaPelicula.caratula)) {
            Swal.fire({
                title: 'Error',
                text: 'La URL de la caratula no es válida',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        if (!validateUrl(nuevaPelicula.portada)) {
            Swal.fire({
                title: 'Error',
                text: 'La URL de la portada no es válida',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }
        if (!validateUrl(nuevaPelicula.trailer)) {
            Swal.fire({
                title: 'Error',
                text: 'La URL del trailer no es válida',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        if (!validateUrl(nuevaPelicula.video)) {
            Swal.fire({
                title: 'Error',
                text: 'La URL del video no es válida',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        if (index === undefined) {
            peliculas.push(nuevaPelicula);
        } else {
            peliculas[index] = nuevaPelicula;
            delete e.target.dataset.index;
        }

        guardarPeliculasEnLS(peliculas);
        renderizarPeliculas();
        e.target.reset();

        // Mostrar alerta de éxito
        Swal.fire({
            title: 'Guardado',
            text: 'La película se ha guardado correctamente',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
    });

    document.getElementById('button-cancelar').addEventListener('click', () => {
        document.getElementById('form-peliculas-series').reset();
        delete document.getElementById('form-peliculas-series').dataset.index;
    });

    // Llenar las categorías en el formulario de agregar/editar película
    const categorias = obtenerCategoriasDeLS();
    const selectCategoriaFormulario = document.getElementById('categoria');
    categorias.forEach((categoria) => {
        const option = document.createElement('option');
        option.value = categoria.nombre;
        option.textContent = categoria.nombre;
        selectCategoriaFormulario.appendChild(option);
    });

    renderizarPeliculas();
});

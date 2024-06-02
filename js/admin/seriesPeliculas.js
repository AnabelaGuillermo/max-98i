import { obtenerPeliculasDeLS, guardarPeliculasEnLS, obtenerCategoriasDeLS, guardarSeriesEnLS } from '../utils.js';
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
                    <button class="btn btn-warning destacar-btn" style="color: ${pelicula.destacado ? 'gold' : 'grey'};"><i class="fas fa-star"></i></button>
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
                const selectCategoria = row.querySelector(`#categoria-${index}`);
                const categorias = obtenerCategoriasDeLS();
                categorias.forEach((categoria) => {
                    const option = document.createElement('option');
                    option.value = categoria;
                    option.textContent = categoria;
                    selectCategoria.appendChild(option);
                });
    
                const defaultOption = selectCategoria.querySelector('option[value=""]');
                if (defaultOption) {
                    defaultOption.remove();
                }
            }
    
            tbody.appendChild(row);
    
            const destacarBtn = row.querySelector('.destacar-btn');
            destacarBtn.addEventListener('click', () => {
                pelicula.destacado = !pelicula.destacado;
                destacarBtn.style.color = pelicula.destacado ? 'gold' : 'grey';
                guardarPeliculasEnLS(peliculas);
                const alertText = pelicula.destacado ? 'Pelicula destacada.' : 'Pelicula quitada de destacadas.';
                Swal.fire({
                    title: '¡Listo!',
                    text: alertText,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
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
        document.getElementById('button-cancelar').style.display = 'none';
        Swal.fire({
            title: '¿Seguro que quieres editar esta película?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí, editar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('button-cancelar').style.display = 'block';
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

import { obtenerPeliculasDeLS, guardarPeliculasEnLS } from './utils.js';

export function agregarPelicula(pelicula) {
    const peliculas = obtenerPeliculasDeLS();
    peliculas.push(pelicula);
    guardarPeliculasEnLS(peliculas);
}

export function editarPelicula(index) {
    const peliculas = obtenerPeliculasDeLS();
    const pelicula = peliculas[index];
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

export function eliminarPelicula(index) {
    let peliculas = obtenerPeliculasDeLS();
    if (index >= 0 && index < peliculas.length) {
        peliculas.splice(index, 1);
        guardarPeliculasEnLS(peliculas);
    } else {
        console.error("Índice de película no válido");
    }
}

export function renderizarPeliculas() {
    const peliculas = obtenerPeliculasDeLS();
    const tbody = document.getElementById('peliculas-series-tbody');
    tbody.innerHTML = '';
    peliculas.forEach((pelicula, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="destacar-checkbox"></td>
            <td>${index + 1}</td>
            <td><img src="${pelicula.caratula}" alt="Carátula" width="50"></td>
            <td>${pelicula.titulo}</td>
            <td>${pelicula.tipo}</td>
            <td>${pelicula.categoria}</td>
            <td><img src="${pelicula.portada}" alt="Portada" width="50"></td>
            <td><a href="${pelicula.trailer}" target="_blank">Ver Trailer</a></td>
            <td><a href="${pelicula.video}" target="_blank">Ver Video</a></td>
            <td>${pelicula.descripcion}</td>
            <td>${pelicula.publicada}</td>
            <td>
                <button class="btn btn-primary editar-btn">Editar</button>
                <button class="btn btn-danger eliminar-btn">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);

        row.querySelector('.editar-btn').addEventListener('click', () => {
            editarPelicula(index);
            Swal.fire({
                title: 'Editando',
                text: 'Se ha abierto el formulario de edición.',
                icon: 'info',
                confirmButtonText: 'Ok'
            });
        });

        row.querySelector('.eliminar-btn').addEventListener('click', () => {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarPelicula(index);
                    Swal.fire('¡Eliminado!', 'La película ha sido eliminada.', 'success');
                    renderizarPeliculas();
                }
            });
        });
    });
}

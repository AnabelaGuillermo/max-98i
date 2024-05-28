import { obtenerCategoriasDeLS, guardarCategoriasEnLS } from "./utils.js";
document.addEventListener('DOMContentLoaded', function () {
    const formCategorias = document.getElementById('form-categorias');
    const tbodyCategorias = document.getElementById('tbody-categorias');

    if (formCategorias && tbodyCategorias) {
        formCategorias.addEventListener('submit', function (event) {
            event.preventDefault();  // Previene la actualización de la página
            const nombreCategoria = document.getElementById('nombre-categoria').value;
            if (nombreCategoria) {
                agregarCategoria(nombreCategoria);
                formCategorias.reset(); // Resetea el formulario después de agregar la categoría
                Swal.fire({
                    title: 'Guardado',
                    text: 'La categoría ha sido guardada exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        });

        renderizarCategorias();

        function renderizarCategorias() {
            const categorias = obtenerCategoriasDeLS();
            tbodyCategorias.innerHTML = '';
            categorias.forEach((categoria, indice) => {
                const fila = `
                    <tr>
                        <td>${categoria.nombre}</td>
                        <td>
                            <button class="btn btn-primary btn-sm editar" data-indice="${indice}">Editar</button>
                            <button class="btn btn-danger btn-sm eliminar" data-indice="${indice}">Eliminar</button>
                        </td>
                    </tr>`;
                tbodyCategorias.innerHTML += fila;
            });
            agregarEventListeners();
        }

        function agregarEventListeners() {
            const botonesEditar = document.querySelectorAll('.editar');
            botonesEditar.forEach(btn => {
                btn.addEventListener('click', function () {
                    const indice = parseInt(btn.dataset.indice);
                    Swal.fire({
                        title: 'Editar Categoría',
                        input: 'text',
                        inputLabel: 'Nuevo nombre de la categoría',
                        inputValue: obtenerCategoriasDeLS()[indice].nombre,
                        showCancelButton: true,
                        confirmButtonText: 'Guardar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const nuevoNombre = result.value;
                            if (nuevoNombre) {
                                editarCategoria(indice, nuevoNombre);
                                Swal.fire({
                                    title: 'Editado',
                                    text: 'La categoría ha sido editada exitosamente',
                                    icon: 'success',
                                    confirmButtonText: 'Ok'
                                });
                            }
                        }
                    });
                });
            });

            const botonesEliminar = document.querySelectorAll('.eliminar');
            botonesEliminar.forEach(btn => {
                btn.addEventListener('click', function () {
                    const indice = parseInt(btn.dataset.indice);
                    Swal.fire({
                        title: '¿Estás seguro?',
                        text: "No podrás revertir esto",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, eliminarlo',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            eliminarCategoria(indice);
                            Swal.fire(
                                'Eliminado',
                                'La categoría ha sido eliminada.',
                                'success'
                            );
                        }
                    });
                });
            });
        }

        function agregarCategoria(nombre) {
            const categorias = obtenerCategoriasDeLS();
            categorias.push({ nombre });
            guardarCategoriasEnLS(categorias);
            renderizarCategorias();
        }

        function editarCategoria(indice, nuevoNombre) {
            const categorias = obtenerCategoriasDeLS();
            categorias[indice].nombre = nuevoNombre;
            guardarCategoriasEnLS(categorias);
            renderizarCategorias();
        }

        function eliminarCategoria(indice) {
            const categorias = obtenerCategoriasDeLS();
            categorias.splice(indice, 1);
            guardarCategoriasEnLS(categorias);
            renderizarCategorias();
        }
    } else {
    }
});

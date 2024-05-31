import { estaLogueado } from './utils.js';

// -------------------------------------
// 1. Seleccionar el boton
// -------------------------------------

const $botonLogout = document.getElementById('btn-salir');

// -------------------------------------
// 2. Mostrar/ocultar el boton
// -------------------------------------

if (estaLogueado()) {
  $botonLogout.classList.remove('d-none');
}

// -------------------------------------
// 3. Event listener del boton
// -------------------------------------

$botonLogout.addEventListener('click', () => {
  swal
    .fire({
      title: 'Atención',
      text: '¿Estás seguro que deseas cerrar sesion?',
      confirmButtonText: 'Si, cerrar',
      cancelButtonText: 'No, mantenerse logueado',
      showCancelButton: true,
    })
    .then((res) => {
      if (res.isConfirmed) {
        // Cerrar sesión

        // a. Eliminar la sesion de SS
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('estaLogueado');

        // b. Redirigir al usuario
        window.location.assign('/');
      }
    });
});
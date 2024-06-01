import { estaLogueado } from './utils.js';
import { validateEmail, validatePassword } from '../validators.js';
import { Usuario } from './usuario.js';

document.addEventListener('DOMContentLoaded', () => {
  if (estaLogueado()) {
    window.location.replace('/pages/inicio.html');
  }

  const usuarioPorDefecto = new Usuario('admin@admin.com', 'admin');

  const $inputEmail = document.getElementById('input-usuario');
  const $inputContraseña = document.getElementById('input-contraseña');
  const $form = document.getElementById('form-login');
  const $alertCredenciales = document.getElementById('alert-login');

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (
        $inputEmail.value.trim() === usuarioPorDefecto.email &&
        $inputContraseña.value.trim() === usuarioPorDefecto.contraseña
      ) {
        Swal.fire({
          title: 'Inicio de sesión correcto',
          text: 'Redirigiendo...',
          icon: 'success',
          customClass: {
            popup: 'swal-popup-success',
            title: 'swal-title-success',
            content: 'swal-text-success',
            icon: 'swal-icon-success'
          },
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          localStorage.setItem('loggedIn', 'true');
          window.location.replace('/pages/inicio.html');
        });
      } else {
        Swal.fire({
          title: 'Credenciales incorrectas',
          text: 'Por favor, intente de nuevo.',
          icon: 'error',
          customClass: {
            popup: 'swal-popup-error',
            title: 'swal-title-error',
            content: 'swal-text-error',
            icon: 'swal-icon-error'
          },
          timer: 2000,
          showConfirmButton: false
        });
      }
  });
});

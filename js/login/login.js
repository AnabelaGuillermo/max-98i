import { estaLogueado } from './utils.js';
import { Usuario } from './usuario.js';

document.addEventListener('DOMContentLoaded', () => {
  if (estaLogueado()) {
    window.location.replace('/pages/inicio.html');
    return;
  }

  const usuarioPorDefecto = new Usuario('admin@admin.com', 'admin');

  const $inputEmail = document.getElementById('email');
  const $inputContraseña = document.getElementById('password');
  const $form = document.querySelector('form');

  if ($form && $inputEmail && $inputContraseña) {
    $form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = $inputEmail.value.trim();
      const contraseña = $inputContraseña.value.trim();

      if (email === usuarioPorDefecto.email && contraseña === usuarioPorDefecto.contraseña) {
        Swal.fire({
          title: 'Inicio de sesión correcto',
          text: 'Redirigiendo...',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          localStorage.setItem('estaLogueado', 'true');
          window.location.replace('/pages/inicio.html');
        });
      } else {
        Swal.fire({
          title: 'Credenciales incorrectas',
          text: 'Por favor, intente de nuevo.',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  } else {
    console.error('Uno o más elementos del DOM no se encontraron.');
  }
});
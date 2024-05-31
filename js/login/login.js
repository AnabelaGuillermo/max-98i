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
        console.log('Credenciales correctas');
        localStorage.setItem('loggedIn', 'true');
        window.location.replace('/pages/inicio.html');
      } else {
        console.log('Credenciales incorrectas');
        $alertCredenciales.classList.remove('d-none');
      }
      
    
  });
});

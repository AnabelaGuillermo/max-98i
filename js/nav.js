import { estaLogueado } from './login/utils.js';

document.addEventListener('DOMContentLoaded', function () {
  const navActual = document.querySelector('.primer-nav');

  if (navActual && estaLogueado()) { // Verificar si navActual es válido y si el usuario está logueado
    const navNuevo = document.createElement('nav');
    navNuevo.classList.add('navbar', 'navbar-expand-lg', 'navbar-primary');

    const containerFluid = document.createElement('section');
    containerFluid.classList.add('container-fluid');

    const navbarBrand = document.createElement('a');
    navbarBrand.classList.add('navbar-brand');
    navbarBrand.href = '#';

    const logoImg = document.createElement('img');
    logoImg.classList.add('max-logo');
    logoImg.src = '../assets/Max_logo.svg.png';
    logoImg.alt = 'Max-logo';
    navbarBrand.appendChild(logoImg);

    containerFluid.appendChild(navbarBrand);

    const navbarToggler = document.createElement('button');
    navbarToggler.classList.add('navbar-toggler');
    navbarToggler.type = 'button';
    navbarToggler.setAttribute('data-bs-toggle', 'collapse');
    navbarToggler.setAttribute('data-bs-target', '#navbarNav');
    navbarToggler.setAttribute('aria-controls', 'navbarNav');
    navbarToggler.setAttribute('aria-expanded', 'false');
    navbarToggler.setAttribute('aria-label', 'Toggle navigation');

    const navbarTogglerIcon = document.createElement('span');
    navbarTogglerIcon.classList.add('navbar-toggler-icon');
    navbarToggler.appendChild(navbarTogglerIcon);

    containerFluid.appendChild(navbarToggler);

    const navbarCollapse = document.createElement('section');
    navbarCollapse.classList.add('collapse', 'navbar-collapse');
    navbarCollapse.id = 'navbarNav';

    const navbarNav = document.createElement('ul');
    navbarNav.classList.add('navbar-nav', 'me-auto');

    const navItems = [
      { text: 'Inicio', href: './inicio.html' },
      { text: 'Series', href: './series.html' },
      { text: 'Películas', href: './peliculas.html' }
    ];

    navItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('nav-item');

      const link = document.createElement('a');
      link.classList.add('nav-link');
      link.href = item.href;
      link.textContent = item.text;

      listItem.appendChild(link);
      navbarNav.appendChild(listItem);
    });

    navbarCollapse.appendChild(navbarNav);
    containerFluid.appendChild(navbarCollapse);

    const searchForm = document.createElement('form');
    searchForm.classList.add('d-flex', 'search-form');
    searchForm.id = 'searchForm';

    const searchInput = document.createElement('input');
    searchInput.classList.add('form-control', 'me-2', 'input-boton');
    searchInput.type = 'search';
    searchInput.placeholder = 'Buscar...';
    searchInput.setAttribute('aria-label', 'Search');
    searchInput.id = 'searchInput';

    const searchButton = document.createElement('button');
    searchButton.classList.add('btn', 'boton-search');
    searchButton.type = 'submit';

    const searchIcon = document.createElement('i');
    searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');
    searchButton.appendChild(searchIcon);

    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
    containerFluid.appendChild(searchForm);

    const userProfileLink = document.createElement('a');
    userProfileLink.classList.add('nav-link', 'miperfil-max');
    userProfileLink.href = './adminPelisSeries.html';

    const userProfileIcon = document.createElement('i');
    userProfileIcon.classList.add('fa-regular', 'fa-circle-user', 'fa-2xl');
    userProfileLink.appendChild(userProfileIcon);
    containerFluid.appendChild(userProfileLink);

    const signOutButton = document.createElement('button');
    signOutButton.id = 'btn-salir';
    signOutButton.classList.add('btn', 'btn-danger');

    const signOutIcon = document.createElement('i');
    signOutIcon.classList.add('fas', 'fa-sign-out-alt');
    signOutButton.appendChild(signOutIcon);

    containerFluid.appendChild(signOutButton);

    navNuevo.appendChild(containerFluid);

    // Ocultar el nav actual y mostrar el nuevo nav
    navActual.style.display = 'none'; // Ocultar el nav actual solo si se encontró
    navActual.parentNode.insertBefore(navNuevo, navActual.nextSibling);
  }
});

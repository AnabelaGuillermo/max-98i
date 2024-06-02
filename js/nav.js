document.addEventListener('DOMContentLoaded', () => {
    const estaLogueado = () => {
      return localStorage.getItem('loggedIn') === 'true';
    };
  
    if (estaLogueado()) {
      const navbarContainer = document.querySelector('.navbar');
      if (navbarContainer) {
        // Limpiar el contenido actual del navbar
        navbarContainer.innerHTML = '';
  
        // Crear los nuevos elementos del navbar
        const nav = document.createElement('nav');
        nav.className = 'navbar navbar-expand-lg navbar-primary';
  
        const container = document.createElement('section');
        container.className = 'container-fluid';
  
        const brandLink = document.createElement('a');
        brandLink.className = 'navbar-brand';
        brandLink.href = './inicio.html';
  
        const brandImg = document.createElement('img');
        brandImg.src = '../assets/Max_logo.svg.png';
        brandImg.className = 'max-logo';
        brandImg.alt = 'Max-logo';
        brandLink.appendChild(brandImg);
  
        const toggler = document.createElement('button');
        toggler.className = 'navbar-toggler';
        toggler.type = 'button';
        toggler.setAttribute('data-bs-toggle', 'collapse');
        toggler.setAttribute('data-bs-target', '#navbarNav');
        toggler.setAttribute('aria-controls', 'navbarNav');
        toggler.setAttribute('aria-expanded', 'false');
        toggler.setAttribute('aria-label', 'Toggle navigation');
        
        const togglerIcon = document.createElement('span');
        togglerIcon.className = 'navbar-toggler-icon';
        toggler.appendChild(togglerIcon);
  
        const collapseSection = document.createElement('section');
        collapseSection.className = 'collapse navbar-collapse';
        collapseSection.id = 'navbarNav';
  
        const navList = document.createElement('ul');
        navList.className = 'navbar-nav me-auto';
  
        const navItem1 = document.createElement('li');
        navItem1.className = 'nav-item';
        const navLink1 = document.createElement('a');
        navLink1.className = 'nav-link';
        navLink1.href = './inicio.html';
        navLink1.textContent = 'Inicio';
        navItem1.appendChild(navLink1);
  
        const navItem2 = document.createElement('li');
        navItem2.className = 'nav-item';
        const navLink2 = document.createElement('a');
        navLink2.className = 'nav-link';
        navLink2.href = './series.html';
        navLink2.textContent = 'Series';
        navItem2.appendChild(navLink2);
  
        const navItem3 = document.createElement('li');
        navItem3.className = 'nav-item';
        const navLink3 = document.createElement('a');
        navLink3.className = 'nav-link';
        navLink3.href = './peliculas.html';
        navLink3.textContent = 'Películas';
        navItem3.appendChild(navLink3);
  
        navList.appendChild(navItem1);
        navList.appendChild(navItem2);
        navList.appendChild(navItem3);
  
        const searchForm = document.createElement('form');
        searchForm.className = 'd-flex search-form';
        searchForm.id = 'searchForm';
  
        const searchInput = document.createElement('input');
        searchInput.className = 'form-control me-2 input-boton';
        searchInput.type = 'search';
        searchInput.placeholder = 'Buscar...';
        searchInput.setAttribute('aria-label', 'Search');
        searchInput.id = 'searchInput';
  
        const searchButton = document.createElement('button');
        searchButton.className = 'btn boton-search';
        searchButton.type = 'submit';
        const searchIcon = document.createElement('i');
        searchIcon.className = 'fa-solid fa-magnifying-glass';
        searchButton.appendChild(searchIcon);
  
        searchForm.appendChild(searchInput);
        searchForm.appendChild(searchButton);
  
        const profileLink = document.createElement('a');
        profileLink.className = 'nav-link miperfil-max';
        profileLink.href = './adminPelisSeries.html';
        const profileIcon = document.createElement('i');
        profileIcon.className = 'fa-regular fa-circle-user fa-2xl';
        profileLink.appendChild(profileIcon);
  
        const logoutButton = document.createElement('button');
        logoutButton.id = 'btn-salir';
        logoutButton.className = 'btn btn-danger';
        const logoutIcon = document.createElement('i');
        logoutIcon.className = 'fas fa-sign-out-alt';
        logoutButton.appendChild(logoutIcon);
  
        // Append all created elements to their respective parents
        collapseSection.appendChild(navList);
        collapseSection.appendChild(searchForm);
        collapseSection.appendChild(profileLink);
  
        container.appendChild(brandLink);
        container.appendChild(toggler);
        container.appendChild(collapseSection);
        container.appendChild(logoutButton);
  
        nav.appendChild(container);
  
        navbarContainer.appendChild(nav);
  
        // Añadir funcionalidad para el botón de salir
        logoutButton.addEventListener('click', () => {
          localStorage.removeItem('loggedIn');
          window.location.replace('/pages/login.html');
        });
      }
    }
  });
  
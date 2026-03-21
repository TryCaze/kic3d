export function getNavbar() {
    const navHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">Kic 3D</div>
        <div class="menu-toggle" id="mobile-menu">☰</div>
        <ul class="nav-links">
          <li><a href="/index.html">Početna</a></li>
          <li><a href="/usluge.html">Usluge</a></li>
          <li><a href="/galerija.html">Galerija</a></li>
          <li><a href="/kontakt.html">Kontakt</a></li>
        </ul>
      </div>
    </nav>`;
    
    document.getElementById('navbar-placeholder').innerHTML = navHTML;
    setupMobileMenu();
    highlightActiveLink();
}

function setupMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelector('.nav-links');
    if (menu) {
        menu.addEventListener('click', () => links.classList.toggle('active'));
    }
}

function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    links.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}
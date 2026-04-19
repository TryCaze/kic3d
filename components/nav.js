export function getNavbar() {
    const role = localStorage.getItem("userRole");
    
    const adminLink = role === "admin" 
        ? '<li><a href="/admin/admin.html">Admin</a></li>' 
        : '';

    const authLink = role 
    ? `<a id="logout-link" data-tooltip="Odjavi se" style="cursor: pointer;"><i class="fas fa-sign-out-alt"></i></a>` 
    : `<a href="/login.html" class="login-btn" title="Prijava">Prijava</a>
       <a href="/registracija.html" class="signup-btn">Registracija</a>`;

    const navHTML = `
    <nav class="navbar">
    <div class="nav-container">
        <div class="logo">Kic 3D</div>
        <div class="menu-toggle" id="mobile-menu"><i class="fas fa-bars"></i></div>
        
        <ul class="nav-links">
        <li><a href="/index.html">Početna</a></li>
        ${adminLink}
        <li><a href="/usluge.html">Usluge</a></li>
        <li><a href="/galerija.html">Galerija</a></li>
        <li><a href="/trgovina.html">Trgovina</a></li>
        <li><a href="/kontakt.html">Kontakt</a></li>
        </ul>

        <div class="nav-actions">
        <a href="/kosarica.html" class="cart-link">
            <i class="fas fa-shopping-cart"></i>
            <span id="cart-count" class="cart-badge">0</span>
        </a>
        <div class="auth-group">
            ${authLink}
        </div>
        </div>
    </div>
    </nav>`;
    
    document.getElementById('navbar-placeholder').innerHTML = navHTML;

    const logoutBtn = document.getElementById('logout-link');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem("userRole");
            window.location.href = "/index.html";
        });
    }

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
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href)) {
            link.classList.add('active');
        }
    });
}
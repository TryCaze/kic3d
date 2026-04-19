const ADMIN_CREDENTIALS = { email: "admin@kic.com", pass: "admin123" };

export function checkAdminAccess() {
    const role = localStorage.getItem("userRole");
    
    if (role !== "admin") {
        window.location.href = "/zabranjeno.html";
    }
}

export function register(email, password) {
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    const exists = users.find(u => u.email === email);
    if (exists || email === ADMIN_CREDENTIALS.email) {
        alert("Korisnik s ovim emailom već postoji!");
        return;
    }

    users.push({ email, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    
    alert("Registracija uspješna! Sada se možete prijaviti.");
    window.location.href = "/login.html";
}

export function login(email, password) {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.pass) {
        localStorage.setItem("userRole", "admin");
        window.location.href = "/admin/admin.html";
        return;
    }

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("userRole", "user");
        window.location.href = "/index.html";
    } else {
        alert("Pogrešni podaci!");
    }
}
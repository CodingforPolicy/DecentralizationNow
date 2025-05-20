// filepath: c:\Users\hadi9\OneDrive\Desktop\Interactivemapproject\navbar.js

document.addEventListener("DOMContentLoaded", function () {
    // Determine the correct path to navbar.html based on the current location
    const currentPath = window.location.pathname;
    const pathToNavbar = currentPath.includes("/pages/") ? "../navbar.html" : "navbar.html";

    // Fetch the navbar HTML and inject it into the #navbar-container
    fetch(pathToNavbar)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const navbarContainer = document.getElementById("navbar-container");
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
            } else {
                console.error("Navbar container (#navbar-container) not found in the DOM.");
            }
        })
        .catch(error => console.error("Error loading navbar:", error));
});

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > lastScrollY) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
});
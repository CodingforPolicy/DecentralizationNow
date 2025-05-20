// Initialize the map with bounds to prevent infinite scrolling 
var bounds = [[-90, -180], [90, 180]]; // Latitude and longitude bounds for the world
var map = L.map('map', {
    worldCopyJump: false,
    maxBounds: bounds, // Set maximum bounds for the map
    maxBoundsViscosity: 1.0, // Smooth bounce-back when bounds are exceeded
    center: [20,0], // Center the map at this latitute and longitude
    zoom: 1, // Set the fixed zoom level 
    zoomControl: false, // Remove zoome controls (+ and - buttons)
    dragging: false, //Disable dragging 
    scrollWheelZoom: false, //Disable scroll wheel zooming
    doubleClickZoom: false, //Disable double-click zooming
    boxZoom: false, //Disable box zooming
    Keyboard: false // Disable keyboard navigation
}).setView([20,0], 2); // Coordinates and zoom level 

// Add a tile layer (map background)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '@ OpenStreetMap contributors'
}).addTo(map);

//Load GeoJSON data (replace 'countries.geosjson' with your actual data)
fetch('countries.geojson')
    .then(response => response.json())
    .then(data => {
    L.geoJSON(data, {
        style: function(feature) {
            return {
                fillColor: getFillColor(feature.properties.name), // Dynamic fill color
                weight: 1, // Border Thickness
                opacity: 1, // Border Opacity
                color: 'white', // Border Color
                fillOpacity: 0.7 // Fill transparency
            };
        }
    }).addTo(map);


// Function to dnymaically assign fill color based on country name
function getFillColor(countryName) {
    switch(countryName) {
        case 'Indonesia': return 'red';
        case 'France': return 'red';
        case 'United Republic of Tanzania': return 'red';
        default: return 'gray'; // Default color for other countries
    }
}

//Apply styles to the map features
fetch('countries.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function (feature) {
                console.log(feature.properties.ADMIN); //Logs the ADMIN property to ensure it's being accessed
                return {
                    fillColor: getFillColor(feature.properties.ADMIN), // Correctly reference ADMIN here
                    weight: 1, // Border Thickness
                    opacity: 1, // Border Opacity
                    color: 'white', // Border Color
                    fillOpacity: 0.7 // Fill transparency
                };
            },
            onEachFeature: function (feature, layer) {
                // Hover effect
                layer.on('mouseover', function () {
                    if (getFillColor(feature.properties.ADMIN) === 'red') { // Check if the country is red
                        layer.setStyle({
                            weight: 3, // Thicker border on hover
                            fillOpacity: 1, // Make it less transparent
                            zIndex: 1000 // Bring it to the front 
                        });
                    } // close the if block
                });

                // Only make red countries clickable 
                if (getFillColor(feature.properties.ADMIN) === 'red') {
                    layer.on('click', function () {
                        const countryName = feature.properties.ADMIN.toLowerCase().replace(/ /g, '-'); // URL-friendly name
                        window.location.href = `pages/${countryName}.html`; // Redirect to the country's page
                    });
                }

                // Reset style on mouseout
                layer.on('mouseout', function () {
                    layer.setStyle({
                        weight: 1, // Restore original border thickness
                        fillOpacity: 0.7, // Restore original transparency
                        zIndex: 1 // reset z-Index to default
                    });
                });
            },
    }).addTo(map);
});
    })

// Intersection Observer for Fade-In Animation 
document.addEventListener("DOMContentLoaded", function() {
    const mapElement = document.querySelector("#map"); // Select map element
  
    // Create Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mapElement.classList.add('visible'); // Apply 'visible' class when in view
            } else {
                mapElement.classList.remove('visible'); // Remove 'visible' class when out of view
            }
            });
    });
    // Observe the map element 
    observer.observe(mapElement);
});

// Function to enable or disable dragging based on screen size 
function updateMapDragging() {
    if (window.innerWidth <= 768) { 
        if (!map.dragging.enabled()) { // Only enable if not already enabled
            map.dragging.enable (); // Enable dragging for mobile devices 
        }
    } else {
        if (map.dragging.enabled()) { // Only disable if currently enabled
        map.dragging.disable(); // Disable dragging for larger screens 

        // Reset the map view to the default position and zoom level
        map.setView([20, 0], 2); // Center the map at [20, 0] with zoom level 2
    }}
}

// Call the function on page load 
updateMapDragging();

// Add an event listener to update dragging when the window is resized 
window.addEventListener('resize', updateMapDragging);

document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll('.step');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add 'visible' class for fade-in
            }
        });
    }, { threshold: 0.1 });

    steps.forEach(step => observer.observe(step));
});

// Intersection Observer for Arrow Fade-In
document.addEventListener("DOMContentLoaded", function () {
    const arrow1 = document.getElementById("#arrow1"); // Select the first arrow
    const section1 = document.getElementById("section1"); // Select the first section

    // Create Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                arrow1.classList.add("visible"); // Add 'visible' class to fade in the arrow
            } else {
                arrow1.classList.remove("visible"); // Remove 'visible' class when out of view
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    // Observe the first section
    observer.observe(section1);
});


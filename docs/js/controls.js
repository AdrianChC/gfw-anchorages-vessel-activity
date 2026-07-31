

// References to controls
let navControl = null;
let fullscreenControl = null;
let geolocateControl = null;


// Track whether we're currently in the mobile layout
let isMobile = window.innerWidth <= 600;


// Add/remove controls depending on screen width
function updateControls(map) {

    // Remove all existing top-right controls
    if (navControl) {
        map.removeControl(navControl);
        navControl = null;
    }

    if (fullscreenControl) {
        map.removeControl(fullscreenControl);
        fullscreenControl = null;
    }

    if (geolocateControl) {
        map.removeControl(geolocateControl);
        geolocateControl = null;
    }


    // Create the geolocate control (used on both layouts)
    geolocateControl = new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    });


    // Desktop layout
    if (!isMobile) {

        navControl = new maplibregl.NavigationControl();

        fullscreenControl = new maplibregl.FullscreenControl({
            container: document.getElementById("container")
        });

        map.addControl(navControl, "top-right");
        map.addControl(fullscreenControl, "top-right");
    }


    // Add geolocate control for all layouts
    map.addControl(geolocateControl, "top-right");

}


// Update controls only when crossing the mobile breakpoint
function handleResize(map) {

    const mobile = window.innerWidth <= 600;

    if (mobile !== isMobile) {
        isMobile = mobile;
        updateControls(map);
    }

}


// Navigation controls
export function addControls(map) {

    // Scale bar (always shown)
    map.addControl(
        new maplibregl.ScaleControl({
            maxWidth: 150,
            unit: "metric"
        }),
        "bottom-left"
    );

    // Add the initial controls
    updateControls(map);

    
    // Listen for breakpoint changes
    window.addEventListener("resize", () => handleResize(map));

}
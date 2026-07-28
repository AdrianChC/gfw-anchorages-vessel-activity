

// References to controls
let navControl = null;
let fullscreenControl = null;
let geolocateControl = null;


// Adds/removes controls depending on screen width
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

    if (window.innerWidth > 600) {

        navControl = new maplibregl.NavigationControl();

        fullscreenControl = new maplibregl.FullscreenControl({
            container: document.getElementById("container")
        });

        geolocateControl = new maplibregl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });

        map.addControl(navControl, "top-right");
        map.addControl(fullscreenControl, "top-right");
        map.addControl(geolocateControl, "top-right");

    } else {

        geolocateControl = new maplibregl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });

        map.addControl(geolocateControl, "top-right");

    }

}


// Navigation controls
export function addControls(map){

    // Scale bar
    map.addControl(
        new maplibregl.ScaleControl({
            maxWidth: 150,
            unit: "metric"
        }),
        "bottom-left"
    );

    updateControls(map);

    window.addEventListener("resize", () => updateControls(map));

}


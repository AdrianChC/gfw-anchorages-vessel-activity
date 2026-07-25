
// Navigation controls
export function addControls(map){

    // Navigation control
    map.addControl(
        new maplibregl.NavigationControl(),
        "top-right"
    );

    // Full Screen control
    map.addControl(
        new maplibregl.FullscreenControl({
            container: document.getElementById("container")
        }),
        "top-right"
    );

    // Geolocate
    map.addControl(
        new maplibregl.GeolocateControl({
            positionOptions:{
                enableHighAccuracy:true
            },
            trackUserLocation:true
        }),
        "top-right"
    );

    // Scale bar
    map.addControl(
        new maplibregl.ScaleControl({
            maxWidth: 150,
            unit: "metric"
        }),
        "bottom-left"
    );

}


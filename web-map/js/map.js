
// Create map

export function createMap() {

    return new maplibregl.Map({
        container: "map",
        style: "https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json",
        center: [0,30],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        
        attributionControl: {
            compact: true,
            customAttribution: `
                © <a 
                    href=https://maplibre.org/" 
                    target="_blank"
                    rel="noopener noreferrer">
                    MapLibre
                </a>
                © <a 
                    href="https://globalfishingwatch.org/" 
                    target="_blank"
                    rel="noopener noreferrer">
                    Global Fishing Watch
                </a>
            `
        }
    });

}
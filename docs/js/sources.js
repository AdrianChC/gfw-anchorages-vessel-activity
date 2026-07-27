
// Add sources

// PMTiles archive location
const PMTILES_URL = "./data/data.pmtiles";

// Register the PMTiles protocol once when this module loads
const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

// Open and register the archive
const archive = new pmtiles.PMTiles(PMTILES_URL);
protocol.add(archive);


// Adds data sources to the map
export function addSources(map) {

    // Prevent adding the same source twice
    if (map.getSource("data")) {
        console.warn("Source 'data' already exists.");
        return;
    }

    map.addSource("data", {
        type: "vector",
        url: `pmtiles://${PMTILES_URL}`
    });

    console.log("Source 'data' added.");
    

}
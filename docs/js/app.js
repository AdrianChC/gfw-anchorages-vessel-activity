
// Main entry point

import { createMap } from "./map.js";

import { addControls } from "./controls.js";

import { addSources } from "./sources.js";

import { addLayers } from "./layers.js";

import { registerEvents } from "./events.js";

import { formatDate } from "./utils.js";

import { registerSearch } from "./search.js";



// Load search index
const response_si = await fetch("./data/searchIndex.json");
const searchIndex = await response_si.json();


// Load metadata file
const response_mt = await fetch("./data/metadata.json");
const metadata = await response_mt.json();

// format to readable start-date
metadata.startDate = formatDate(metadata.start_date, {
    day: "2-digit",
    month: "short"
});

// format to readable end-date
metadata.endDate = formatDate(metadata.end_date, {
    day: "2-digit",
    month: "short",
    year: "numeric"
});


// Load timeseries file
const response_ts = await fetch("./data/timeSeries.json");
const timeSeries = await response_ts.json();


// Create Map
const map = createMap();


// Load all Map features
map.on("load",()=>{

    map.setProjection({
        "type": "mercator" //other options "vertical-perspective" "globe"
    });
    console.log("Map loaded.");

    addSources(map);
    console.log("Sources loaded.");

    addLayers(map);
    console.log("Layers loaded.");

    addControls(map);
    console.log("Controls loaded.");

    registerSearch(map, searchIndex);
    console.log("Search loaded.");

    registerEvents(map, metadata, timeSeries);
    console.log("Metadata loaded.");
    console.log("Time Series data loaded.");

});





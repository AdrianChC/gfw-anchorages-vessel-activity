
// hoverId initial state
let hoveredId = null;


// import libraries
import { showLineGraph, resetLineGraph } from "./linegraph.js";


// Cache DOM elements
// stores the HTML document element with the id 'info' in a constant
const info = document.getElementById("info");
// stores the HTML document element with the id 'chart-placeholder' in a constant
const chartPlaceholder = document.getElementById("chart-placeholder");
// stores the HTML document element with the id 'events-chart' in a constant
const chartCanvas = document.getElementById("events-chart");


// Register click, hover, move events
export function registerEvents(map, metadata, timeSeries) {

    // Event listener that fires function 'showAnchorageInfo'
    //  when a feature ih the 'points-circle' layer is clicked
    map.on('click', 'points-circle', (e) => {

        onPointSelect(map, e);

        zoomToPoint(map, e);

        showAnchorageInfo(e, metadata, timeSeries)
    
    });
    
    // Event listener that fires function onMouseEnter
    //  when the 'mouse enters' a feature ih the 'points-circle' layer
    map.on('mouseenter', 'points-circle', (e) => onMouseEnter(map, e));

    // Event listener that changes cursor to 'normal'
    //  when the 'mouse leaves' a feature in the 'points-circle' layer
    map.on('mouseleave', 'points-circle', () => onMouseLeave(map));

    // Event listener that changes panels to intial state
    //  when the mouse click on empty space
    map.on("click", (e) => onMapClick(map, e));

}


// Display anchorage information
function showAnchorageInfo(e, metadata, timeSeries) {

    const { properties } = e.features[0];

    // returns the properties of the clicked feature in the browser console
    console.table(properties);

    // calls the function that renders the sidebar
    renderSidebar(properties, metadata);

    // add the Show Line Graph
    showLineGraph(
        timeSeries,
        properties.s2id
    );

}


// Render the sidebar
function renderSidebar(properties, metadata) {

    info.innerHTML = `

        <div class="field">
            <div class="label">Unique Identifier</div>
            <div class="value">${properties.s2id}</div>
        </div>

        <div class="field">
            <div class="label">Country</div>
            <div class="value">
                <span class="country">${properties.country}</span>
                <span>${properties.iso3}</span>
            </div>
        </div>

        <div class="field">
            <div class="label">Port</div>
            <div class="value-bold">${properties.port}</div>
            <div class="value">
                ${properties.dock === "True" ? "⚓ Dock" : "○ Anchorage"}
            </div>
        </div>

        <div class="metrics">

            <div>
                <div class="label">Total Events</div>
                <div class="metric">${properties.month}</div>
            </div>

            <div>
                <div class="label">Intensity of Use</div>
                <div class="metric">${properties.day_mean}</div>
            </div>

        </div>

        <div class="date-range">
            From ${metadata.startDate} to ${metadata.endDate}
        </div>

    `;

}


// function: activates the "points-circle-hover" for the selected feature
function onPointSelect(map, e) {

    // stores in a constant the id of the selected feature
    const id = e.features[0].id;

    // already selected
    if (id === hoveredId) {
        return;
    }

    // stores the id value in a constant
    hoveredId = id;

    map.setFilter(
        "points-circle-hover",
        ["==", "s2id", id]
    );

}


// function: zoom to the feature 
function zoomToPoint(map, e) {

    const targetZoom = Math.min(map.getZoom() + 1, 10);

    // flyes to the center and adds 1 zoom level until max zoom 10
    if (targetZoom > map.getZoom()) {
        map.flyTo({
            center: e.lngLat,
            zoom: targetZoom,
            duration: 600
        });
    }

}


// function: changes mouse pointer when its inside layer
function onMouseEnter(map, e) {
    
    // changes the cursor to 'pointer'
    map.getCanvas().style.cursor = "pointer";

}


// function: changes mouse pointer when its outside layer
function onMouseLeave(map) {
    
    // changes the cursor to 'normal'
    map.getCanvas().style.cursor = "";

}


// function: click on empty space
function onMapClick(map, e) {

    const features = map.queryRenderedFeatures(
        e.point,
        {
            layers: ["points-circle"]
        }
    );

    // Clicked an anchorage → do nothing
    if (features.length > 0) {
        return;
    }

    // Remove selected point
    hoveredId = null;

    map.setFilter(
        "points-circle-hover",
        ["==", "s2id", ""]
    );
    
    // Clicked empty map
    resetPanels();
}


// function: resets panels 'sidebar' and 'chart-container' to initial state
function resetPanels() {

    // Reset 'sidebar' to show initial text
    info.innerHTML = `
        <p>Click an anchorage point on the map.</p>
    `;

    // Reset 'chart-container' to show initial text
    chartPlaceholder.style.display = "flex";

    // Reset 'chart-canvas' to empty
    chartCanvas.style.display = "none";

}
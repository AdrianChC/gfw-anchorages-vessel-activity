
// import libraries
import { showLineGraph, resetLineGraph } from "./linegraph.js";

// Click, hover, move events

export function registerEvents(map, metadata, timeSeries) {

    // Event listener that fires function 'showAnchorageInfo'
    //  when a feature ih the 'points-circle' layer is clicked
    map.on("click", "points-circle", (e) => showAnchorageInfo(e, metadata, timeSeries));

    // Event listener that fires function onMouseEnter
    //  when the 'mouse enters' a feature ih the 'points-circle' layer
    map.on("mouseenter", "points-circle", (e) => onMouseEnter(map, e));

    // Event listener that changes cursor to 'normal'
    //  when the 'mouse leaves' a feature in the 'points-circle' layer
    map.on("mouseleave", "points-circle", (e) => onMouseLeave(map, e));

    // Event listener that changes panels to intial state
    //  when the mouse click on empty space
    map.on("click", (e) => onMapClick(map, e));

}


//
function showAnchorageInfo(e, metadata, timeSeries) {

    // returns the properties of the clicked feature in the browser console
    console.table(e.features[0].properties);
    
    // stores the properties of the clicked feature in a constant
    const properties = e.features[0].properties;
    // stores the HTML document element with the id 'info' in a constant
    const info = document.getElementById("info");


    // define the Information Panel
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
            ${properties.dock === 'True' ? "⚓ Dock" : "○ Anchorage"}
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

    // add the Show Line Graph
    showLineGraph(
        timeSeries,
        properties.s2id
    );

}


function onMouseEnter(map, e) {
    // changes the cursor to 'pointer'
    map.getCanvas().style.cursor = "pointer";
}


function onMouseLeave(map, e) {
    // changes the cursor to 'normal'
    map.getCanvas().style.cursor = "";
}


// 
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

    // Clicked empty map
    resetPanels();
}


//
function resetPanels() {

    // Reset sidebar
    document.getElementById("info").innerHTML = `
        <p>Click an anchorage point on the map.</p>
    `;

    // Reset chart
    resetLineGraph();
}
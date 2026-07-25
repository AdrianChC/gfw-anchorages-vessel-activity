

// store the elements with id "events-char" and "chart_placeholder"
const canvas = document.getElementById("events-chart");
const placeholder = document.getElementById("chart-placeholder");

// Daily events line chart

let chart = null;

/**
 * Displays or updates the daily events line chart.
 *
 * @param {Object} timeSeries - Dictionary indexed by s2id.
 * @param {string} s2id - Anchorage identifier.
 */



Chart.defaults.font = {
    family: "system-ui",
    size: 14,
    weight: 400,
};

Chart.defaults.color = "#cecece";


// function: shows time series data
export function showLineGraph(timeSeries, s2id) {

    // retrieve data in timeSeries 
    const dailyEvents = timeSeries[s2id];

    
    // validate if data
    if (!dailyEvents) {
        console.warn(`No time series found for ${s2id}`);
        return;
    }

    
    // compute derived data
    const labels = Array.from(
        { length: dailyEvents.length },
        (_, i) => i + 1
    );

    
    // prepares UI
    placeholder.style.display = "none";
    canvas.style.display = "block";

       
    // Destroy the previous chart before creating a new one.
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(canvas, {

        type: "line",

        data: {

            labels,

            datasets: [{
                label: "Events",

                data: dailyEvents,

                borderColor: "#00b1ff",
                backgroundColor: "rgba(0,177,255,0.15)",

                borderWidth: 2,

                pointRadius: 3,

                pointHoverRadius: 5,

                tension: 0.3,

                fill: true

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: true,

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: "#383645",

                    titleColor: "#faf7ff",

                    bodyColor: "#faf7ff",

                    borderColor: "#66b3ff",

                    borderWidth: 1,

                    displayColors: false,

                    callbacks: {

                        title: function(items) {
                            return `Day: ${items[0].label}`;
                        },

                        label: function(context) {
                            return `Events: ${context.parsed.y}`;
                        }

                    }
                }

            },

            scales: {

                x: {

                    title: {
                        display: true,
                        text: "Day",
                    },

                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        callback: function(value, index) {
                            return index % 2 === 0 ? this.getLabelForValue(value) : "";
                        },
                        font: {
                            size: 12
                        }
                    },
        
                    grid: {
                        display: false
                    },

                    border: {
                        color: "#cecece"
                    }

                },

                y: {

                    beginAtZero: true,

                    title: {
                        display: true,
                        text: "Events",
                        // color: "#cecece"
                    },

                    ticks: {
                        maxRotation: 0,
                        minRotation: 0,
                        callback: function(value, index) {
                            return index % 2 === 0 ? this.getLabelForValue(value) : "";
                        },
                        font: {
                            size: 12
                        }
                    },
        
                    grid: {
                        display: false
                    },

                    border: {
                        color: "#cecece"
                    }

                }

            }

        }

    });

}


// function: resets time series data
export function resetLineGraph() {

    if (chart) {
        chart.destroy();
        chart = null;
    }

    canvas.style.display = "none";
    placeholder.style.display = "flex";
}
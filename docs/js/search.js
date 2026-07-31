
// Country / Port search Search bar feature 
export function registerSearch(map, searchIndex) {

    // stores the HTML document element with the id 'country-input' in a constant
    const input = document.getElementById("country-input");
    // stores the HTML document element with the id 'country-results' in a constant
    const results = document.getElementById("country-results");

    
    input.addEventListener("input", () => {
        // stores the modified input value in a constant
        const query = input.value
            .trim()
            .toLowerCase();
        // if input value is deleted aka query.length == 0
        if (!query) {
            // query results get 
            clearResults(results);
            return;
        }

        // stores the search index results from the query in a constant 
        const matches = filterLocations(query, searchIndex);

        // get results 
        renderResults(
            map,
            input,
            results,
            matches
        );

    });

    // Hide results when clicking elsewhere
    document.addEventListener("click", (e) => {

        if (!e.target.closest("#country-search")) {
            clearResults(results);
        }

    });

}


// find all the matches 
function filterLocations(query, searchIndex) {

    return searchIndex

        .filter(location =>
            location.name
                .toLowerCase()
                .includes(query)
        )

        .sort((a, b) =>
            a.name.localeCompare(b.name)
        )
        
}

// render the search results dropdown
function renderResults(map, input, results, matches) {

    // starts by clearing results
    clearResults(results);

    // a loop for each match
    matches.forEach(location => {

        // creates a new html empyt element <div></div>
        const option = document.createElement("div");
        // assigns the css class "country-option" 
        option.className = "country-option";
        // adds the location name
        option.textContent = location.name;

        // makes it clickable
        option.addEventListener("click", () => {
            
            // when click input.value becomes location.name
            input.value = location.name;
            // then zoom to the location.name
            zoomToLocation(map, location);
            // ends with clearing the dropdown
            clearResults(results);

        });

        // 'option' element is placed inside 'results' element 
        results.appendChild(option);

    });

}

// zoom
function zoomToLocation(map, location) {

    map.fitBounds(

        [
            [location.bbox[0], location.bbox[1]],
            [location.bbox[2], location.bbox[3]]
        ],

        {
            padding: 60,
            maxZoom: 10,
            duration: 1000
        }

    );

}

// clear results
function clearResults(results) {
    // everything 'results' is removed
    results.innerHTML = "";
}

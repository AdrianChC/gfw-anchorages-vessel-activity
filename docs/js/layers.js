
// Add/remove layers

export function addLayers(map) {

  map.addLayer({
    id: "points-circle",  // unique layer name
    source: "data",       // name of a source description to be used for this layer
    type: "circle",       // required rendering type
    // must match Tippecanoe layer name (-l points)
    'source-layer': "anch_june",
    // controls the circle-color order by "month" count
    layout: {
      "circle-sort-key": ["get", "month"] // circles display is order by asc "month" value
    },
    paint: {
      "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        2, 2,     // at zoom level  2  all circles are 2 pts size
        10, 6     // at zoom level 10  all circles are 6 pts size
      ],
      "circle-color": [
          "step",
          ["get", "month"],
          "#0078ff",        //     < 241  95th percentile
          241, "#6b6bed",   //   241-844  up th 95th percentile
          845, "#915dd8",   //  845-3394  500th largest value
          3395, "#a850c1",  // 3395-4333  20th largest value
          4334, "#b745aa",  // 4334-7315  5th largest value
          7315, "#bf3c92",  //   >= 7315  max value
      ],
      "circle-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        // at zoom level 2  the opacity behaves like this
        2,
        [
          "step",
          ["get", "month"],
          0.15,       //     < 241  below 95th percentile   opacity is 0.15
          241, 0.3,   //   241-844  above 95th percentile   opacity is 0.3
          845, 0.45,  //  845-3394  500th largest value     opacity is 0.45 
          3395, 0.6,  // 3395-4333  20th largest value      opacity is 0.6    
          4334, 0.85, // 4334-7315  5th largest value       opacity is 0.85
          7315, 1     //   >= 7315  max value               opacity is 1      
        ],
        // at zoom level 10  the opacity behaves like this
        10,
        [
          "step",
          ["get", "month"],
          .65,    //     <  241  below 95th percentile  opacity is .65
          241, 1  //     >= 241  above 95th percentile  opacity is 1        
        ]
      ], 
    }
  });
  
}

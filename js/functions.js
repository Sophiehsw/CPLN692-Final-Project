/* =====================
Default setup
===================== */
var defaultPage = function(event) {
  // Add marker
  featureGroup = L.geoJson(parsedData, {
    style: {color: 'white',
            radius: 4,
            fillColor: '#F8E13D',
            weight: 1,
            opacity: 1,
            fillOpacity: 1},
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  // Set view
  map.setView([40.000, -75.16],11);
};

var defaultBoundary = function(event) {
  var boundaryStyle = {
    color:"white",
    opacity:0.4,
    weight:1,
    fillOpacity:0,
    dashArray: '5',
  };
  featureGroup = L.geoJson(boundary, {
    style: boundaryStyle,
  }).addTo(map);
};

// Remove markers
var removeMarker = function(){
  if (typeof featureGroup !== 'undefined') {
    map.removeLayer(featureGroup);
  }
};

// Add zoom control with your options
var addZoomControl = function() {
  L.control.zoom({
      position:'topright'
  }).addTo(map);
};

/* =====================
2 Maps
===================== */
// Map 1: Sales Volume
var getColor1 = function(d) {
    return d > 784  ? '#FDE725' :
           d > 560  ? '#B8DE29' :
           d > 392  ? '#55C667' :
           d > 280  ? '#238A8D' :
           d > 112  ? '#404788' :
                      '#481567';
};

var getRadius1 = function(d) {
    return d > 784  ? 8 :
           d > 560  ? 7 :
           d > 392  ? 6 :
           d > 280  ? 5 :
           d > 112  ? 4 :
                      '#481567';
};

var getStyle1 = function(feature) {
    return {color: "white",
            weight: 0,
            radius: getRadius1(feature.properties.SALES_VOL),
            fillColor: getColor1(feature.properties.SALES_VOL),
            opacity: 0.5,
            fillOpacity: 1,
    };
};

// Interactive feature
var highlightFeature1 = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 11,
                    fillColor: "white",
                    fillOpacity: 1,
    });
    info.update(layer.feature.properties);
};

var resetHighlight = function(e) {
    featureGroup.resetStyle(e.target);
    info.update();
};

var onEachFeature1 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature1,
        mouseout: resetHighlight,
    });
};

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Sales Volume</h4>' +  (props ?
        '<strong>' + props.SALES_VOL + '</strong>' + ' (in thousand)'
        : 'Hover over a store');
};

// Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 112, 280, 392, 560, 784],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

var map1 = function(event) {
  map.setView([40.0065476,-75.1531398],12);

  featureGroup = L.geoJson(parsedData, {
    style: getStyle1,
    onEachFeature:onEachFeature1,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  info.addTo(map);
  legend.addTo(map);
  addZoomControl();
};

$('#mapsChoice1').click(function(e){
  removeMarker();
  map1();
});

// Map 2: Number of Employees
var getColor1 = function(d) {
    return d > 784  ? '#FDE725' :
           d > 560  ? '#B8DE29' :
           d > 392  ? '#55C667' :
           d > 280  ? '#238A8D' :
           d > 112  ? '#404788' :
                      '#481567';
};

var getRadius1 = function(d) {
    return d > 784  ? 8 :
           d > 560  ? 7 :
           d > 392  ? 6 :
           d > 280  ? 5 :
           d > 112  ? 4 :
                      '#481567';
};

var getStyle1 = function(feature) {
    return {color: "white",
            weight: 0,
            radius: getRadius1(feature.properties.SALES_VOL),
            fillColor: getColor1(feature.properties.SALES_VOL),
            opacity: 0.5,
            fillOpacity: 1,
    };
};

// Interactive feature
var highlightFeature1 = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 11,
                    fillColor: "white",
                    fillOpacity: 1,
    });
    info.update(layer.feature.properties);
};

var resetHighlight = function(e) {
    featureGroup.resetStyle(e.target);
    info.update();
};

var onEachFeature1 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature1,
        mouseout: resetHighlight,
    });
};

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Sales Volume</h4>' +  (props ?
        '<strong>' + props.SALES_VOL + '</strong>' + ' (in thousand)'
        : 'Hover over a store');
};

// Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 112, 280, 392, 560, 784],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

var map1 = function(event) {
  map.setView([40.0065476,-75.1531398],12);

  featureGroup = L.geoJson(parsedData, {
    style: getStyle1,
    onEachFeature:onEachFeature1,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  info.addTo(map);
  legend.addTo(map);
  addZoomControl();
};

$('#mapsChoice1').click(function(e){
  removeMarker();
  map1();
});

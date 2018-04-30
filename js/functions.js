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
    return d > 784  ? 7 :
           d > 560  ? 6 :
           d > 392  ? 5 :
           d > 280  ? 4 :
           d > 112  ? 3 :
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

var highlightFeature1 = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 11,
                    fillColor: "white",
                    fillOpacity: 1,
    });
};

var resetHighlight = function(e) {
    featureGroup.resetStyle(e.target);
};

var onEachFeature1 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature1,
        mouseout: resetHighlight,
    });
};

var map1 = function(event) {
  featureGroup = L.geoJson(parsedData, {
    style: getStyle1,
    onEachFeature:onEachFeature1,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  map.setView([40.0065476,-75.1531398],12);
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
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);

// Map 2: Number of Employees

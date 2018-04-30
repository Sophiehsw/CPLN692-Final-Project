/* =====================
Default setup
===================== */
var defaultPage = function(event) {
  featureGroup = L.geoJson(parsedData, {
    style: {color: "#50EBEC",
            radius: 4,
            fillColor: "#50EBEC",
            weight: 4,
            opacity: 0.4,
            fillOpacity: 0.8},
    onEachFeature:onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    }
  }).addTo(map);
  map.setView([40.000, -75.16],11);
};

// Default interacive feature
// Interactive feature
var highlightFeature = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 12,
                    color: "white",
                    opacity: 0.5,
                    fillColor: "white",
                    fillOpacity: 0.8,
    });
    layer.bindTooltip("Address: "+layer.feature.properties.ADDR,
    {opacity: 0.7, offset:[-10,0], direction:'left'}).openTooltip();
};

var resetHighlight = function(e) {
    featureGroup.resetStyle(e.target);
};

var clickEachFeature = function(e) {
    $('.intsidebar').fadeIn();
    $('#info-page').fadeIn();
};

var onEachFeature = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: clickEachFeature,
    });
};

// Every time user clicks on "close", the map will be reset
var reset = function() {
  removeMarker();
  defaultPage();
  $('.info1').hide();
  $('.legend1').hide();
  $('.info2').hide();
  $('.legend2').hide();
};

$('#hideit1').click(function(e){
  reset();
});
$('#hideit2').click(function(e){
  reset();
});
$('#hideit3').click(function(e){
  reset();
});
$('#hideit4').click(function(e){
  reset();
});

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
    return d > 784  ? 8 :
           d > 560  ? 7 :
           d > 392  ? 6 :
           d > 280  ? 5 :
           d > 112  ? 4 :
                      3;
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
    info1.update(layer.feature.properties);
};

var resetHighlight1 = function(e) {
    featureGroup.resetStyle(e.target);
    info1.update();
};

var onEachFeature1 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature1,
        mouseout: resetHighlight1,
    });
};

var info1 = L.control();

info1.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info1'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info1.update = function (props) {
    this._div.innerHTML = '<h4>Sales Volume</h4>' +  (props ?
        '<strong>' + props.SALES_VOL + '</strong>' + ' (in thousand)'
        : 'Hover over a store');
};

// Legend
var legend1 = L.control({position: 'bottomright'});

legend1.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info1 legend1'),
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
  info1.addTo(map);
  legend1.addTo(map);
};

$('#mapsChoice1').click(function(e){
  removeMarker();
  $('.info2').hide();
  $('.legend2').hide();
  map1();
});

// Map 2: Number of Employees
var getColor2 = function(d) {
    return d > 14  ? '#FCF8B6' :
           d > 10  ? '#FF9864' :
           d > 7  ?  '#E74E62' :
           d > 5  ?  '#771B83' :
           d > 2  ?  '#34086B' :
                     '#150C3A';
};

var getRadius2 = function(d) {
    return d > 14  ? 8 :
           d > 10  ? 7 :
           d > 7   ? 6 :
           d > 5   ? 5 :
           d > 2   ? 4 :
                     3;
};

var getStyle2 = function(feature) {
    return {color: "white",
            weight: 0,
            radius: getRadius2(feature.properties.NUMBER_EMP),
            fillColor: getColor2(feature.properties.NUMBER_EMP),
            opacity: 0.5,
            fillOpacity: 1,
    };
};

// Interactive feature
var highlightFeature2 = function(e) {
    var layer = e.target;
    layer.setStyle({radius: 11,
                    fillColor: "white",
                    fillOpacity: 1,
    });
    info2.update(layer.feature.properties);
};

var resetHighlight2 = function(e) {
    featureGroup.resetStyle(e.target);
    info2.update();
};

var onEachFeature2 = function(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight2,
    });
};

var info2 = L.control();

info2.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info2'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info2.update = function (props) {
    this._div.innerHTML = '<h4># of Employees</h4>' +  (props ?
        '<strong>' + props.NUMBER_EMP + '</strong>'
        : 'Hover over a store');
};

// Legend
var legend2 = L.control({position: 'bottomright'});

legend2.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info2 legend2'),
        grades = [0, 2, 5, 7, 10, 14],
        labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor2(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

var map2 = function(event) {
  map.setView([40.0065476,-75.1531398],12);

  featureGroup = L.geoJson(parsedData, {
    style: getStyle2,
    onEachFeature:onEachFeature2,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng).bindPopup(feature.properties.ADDR);
    }
  }).addTo(map);
  info2.addTo(map);
  legend2.addTo(map);
};

$('#mapsChoice2').click(function(e){
  removeMarker();
  $('.info1').hide();
  $('.legend1').hide();
  map2();
});

/* =====================
Info on click
===================== */
var fillInfo = function(feature) {
  $('#store_id').val("Store ID: " + feature.properties.total_num_rides);
  $('#std_rides').val("Standardized Number of Rides: " + properties.std_rides);
  $('#address').val("Address: " + properties.addressstreet);
  $('#zipcode').val("Zipcode: "+properties.addresszipcode);
  $('#dockNumber').val("Docking Capacity: " + properties.totaldocks);
  $('#tll_per').val("Share of All Indego Rides: " + (Math.round(properties.ttl_per*100)).toFixed(1) + "%");
  $('#station_id').val("Station ID: " + properties.station_id);
  $('#departure').val("Departure: " + properties.start_num_rides + " rides, " + (Math.round(properties.st_per_in*100)).toFixed(1) + "% of total");
  $('#arrival').val("Arrival: " + properties.end_num_rides + " rides, " + (Math.round(properties.ed_per_in*100)).toFixed(1) + "% of total");
};

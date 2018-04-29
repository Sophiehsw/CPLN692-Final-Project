/* ================================
Midterm Functions
================================ */
// Set style
var myStyle = function(feature){ return slideDeck[slideNumber].style; };

// Set view
var setView = function(){
  var view = slideDeck[slideNumber].view;
  var zoom = slideDeck[slideNumber].zoom;
  map.setView(view,zoom);
};

// Set filter
var myFilter = function(feature){
  if (slideNumber === 0){ return true; }
  else if (slideNumber === 1){ return true; }
  else if (slideNumber === 2){
    if(feature.properties.WEEKEND === "Y") {
      return true; }}
  else if (slideNumber === 3){ return true; }
  else if (slideNumber === 4){
    if(feature.properties.NEIGHBORHOOD === "Center City") {
      return true; }}
};

// Plot markers
var plotMarker = function(){
  if(slideNumber !== 3){
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter,
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, myStyle).bindPopup(myPopups(feature));
      }
    }).addTo(map);
  }else{
    featureGroup = L.geoJson(parsedData, {
      style: slide4Style,
      filter: myFilter,
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, slide4Style).bindPopup(myPopups(feature));
      }
    }).addTo(map);
  }
};

// Remove markers
var removeMarker = function(){
  if (typeof featureGroup !== 'undefined') {
    map.removeLayer(featureGroup);
  }
};

// Set of functions to call every time refreshing page
var readyPlot = function() {
  removeMarker();
  setView();
  plotMarker();
  showSlide();
};

// Initial slide function
var initialSlide = function(event) {
  slideNumber = 0;
  $('#button-previous').hide();
  $('#button-next').show();
  readyPlot();
};

// Last slide function
var lastSlide = function(event) {
  slideNumber = slideDeck.length - 1;
  $('#button-previous').show();
  $('#button-next').hide();
  readyPlot();
};

// Next slide function
var nextSlide = function(event){
  slideNumber += 1;
  if (slideNumber < slideDeck.length - 1) {
    $('#button-previous').show();
    $('#button-next').show();
    readyPlot();
  }
  return slideNumber;
};

// Previous slide function
var preSlide = function(event){
  slideNumber -= 1;
  if (slideNumber > 0) {
    $('#button-previous').show();
    $('#button-next').show();
    readyPlot();
  }
  return slideNumber;
};

// Click button function
var clickButton = function(){
  $('#button-next').click(function(){
    if (slideNumber === slideDeck.length - 2){
      lastSlide();
    }else{
      nextSlide();
    }
  });

  $('#button-previous').click(function(){
    if (slideNumber === 1){
      initialSlide();
    }else{
      preSlide();
    }
  });
};

// Default page showing philadelphia boundary
var defaultPage = function(event) {
  var boundaryStyle = {
    color:"black",
    weight:0,
    fillOpacity:0.1
  };
  featureGroup = L.geoJson(boundary, {
    style: boundaryStyle,
  }).addTo(map);
};

// Show slide information, including legend and list
var showSlide = function() {
  // show and hide legend
  if(slideNumber === 3){
    $("#legend").show();
  }else{
    $("#legend").hide();
  }
  // show and hide slide content
  var slide = _.range(slideDeck.length);
  for (i=0;i<slide.length;i++){
    if (slideNumber === slide[i]){
      $(slideDeck[slideNumber].description).show();
    }else{
      $(slideDeck[slide[i]].description).hide();
    }
  }
  // show list
  getInfo(parsedData);
};

var getInfo = function(data){
  var featureList = data.features; // a list
  // for slide 4
  // Get list of info of filtered farmers market in Center City and send the info to html
  var neighborhood = [];
  _.each(featureList, function(obj){ neighborhood.push(obj.properties.NEIGHBORHOOD);});
  var countNeighborhood = _.countBy(neighborhood);
  var keys = Object.keys(countNeighborhood);
  var vals = Object.values(countNeighborhood);
  for (i=0;i<keys.length;i++){
    newrow = keys[i] + ": " + vals[i];
    var addid = "#neighborhood-count-" + i.toString();
    $(addid).text(newrow);
  }
  // for slide 5
  // Get the number of farmers market by neighborhood and send the info to html
  var filteredList = [];
  _.each(featureList, function(obj){
    if(obj.properties.NEIGHBORHOOD === "Center City"){
      filteredList.push(obj);}});
  for(i=0;i<filteredList.length;i++){
    var name = "#weekend-name-" + i.toString();
    var day = "#weekend-day-" + i.toString();
    var address = "#weekend-address-" + i.toString();
    $(name).text(filteredList[i].properties.NAME);
    $(day).text(filteredList[i].properties.TIME);
    $(address).text(filteredList[i].properties.ADDRESS);
  }
};

// Popups
var myPopups = function(feature) {
  var popup = slideDeck[slideNumber].popup;
  if (slideNumber === 0){
    var list1 = "<dt><strong>" + popup[0] + "</strong></dt>" +
               "<dt>" + feature.properties[popup[0]] + "</dt>"+
               "<dt><strong>" + popup[1] + "</strong></dt>" +
               "<dt>" + feature.properties[popup[1]] + "</dt>"+
               "<dt><strong>BUS/SUBWAY ROUTES</strong></dt>" +
               "<dt>" + feature.properties[popup[2]] + "</dt>";
    return list1;
  }else if(slideNumber === 1 || slideNumber === 2){
    var list2 = "<dt><strong>" + popup[0] + "</strong></dt>" +
               "<dt>" + feature.properties[popup[0]] + "</dt>"+
               "<dt><strong>" + popup[1] + "</strong></dt>" +
               "<dt>" + feature.properties[popup[1]] + "</dt>"+
               "<dt><strong>" + popup[2] + "</strong></dt>" +
               "<dt>" + feature.properties[popup[2]] + "</dt>";
    return list2;
  }else{
    return feature.properties[popup];
  }
};

// Styling function for slide 4
var slide4Style = function(feature) {
  switch (feature.properties.NEIGHBORHOOD) {
    case 'Bridesburg Kensington Port Richmond': return {fillColor: "#FFED6F", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'Center City': return {fillColor: "#8DD3C7", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'Germantown Chestnut Hill': return {fillColor: "#BC80BD", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'Lower Northeast': return {fillColor: "#A8B6C0", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'North': return {fillColor: "#FCCDE5", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'Northeast': return {fillColor: "#80B1D3", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'Northwest': return {fillColor: "#D0533D", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'Olney Oak Lane': return {fillColor: "#CCEBC5", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'Roxborough Manayunk': return {fillColor: "#B3DE69", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'South': return {fillColor: "#FB8072", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'Southwest': return {fillColor: "#BEBADA", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
    case 'West': return {fillColor: "#FDB462", fillOpacity:1, color:"white", weight:3, radius:9, opacity:1};
  }
};

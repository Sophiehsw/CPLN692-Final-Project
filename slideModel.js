/* ================================
Slide Model
================================ */
// Show farmers market name and address and the bus that takes you there
var slide1 = {
  slideNumber: 1,
  title: $("#slide-name-1").val(),
  view: [40.000, -75.16],
  zoom: 11,
  style: {color: 'white',
          radius: 6,
          fillColor: '#DC7633',
          weight: 2,
          opacity: 1,
          fillOpacity: 1},
  popup: ["NAME", "ADDRESS", "MAJOR_BUS_SUBWAY_ROUTES"],
  description: "#description-slide1"
};

// Show farmers market open months, days and hours
var slide2 = {
  slideNumber: 2,
  title: $("#slide-name-2").val(),
  view: [40.000, -75.13],
  zoom: 12,
  style: {color: 'white',
          radius: 9,
          fillColor: '#DC7633',
          weight: 3,
          opacity: 1,
          fillOpacity: 1},
  popup: ["NAME", "MONTHS", "TIME"],
  description: "#description-slide2"
};

// Show farmers market open on weekdends
var slide3 = {
  slideNumber: 3,
  title: $("#slide-name-3").val(),
  view: [40.000, -75.13],
  zoom: 12,
  style: {color: 'white',
          radius: 9,
          fillColor: '#CD5B89',
          weight: 3,
          opacity: 1,
          fillOpacity: 1},
  popup: ["NAME", "MONTHS", "TIME"],
  description: "#description-slide3"
};

// Show farmers market by neighborhood
var slide4 = {
  slideNumber: 4,
  title: $("#slide-name-4").val(),
  view: [40.000, -75.13],
  zoom: 12,
  style: slide4Style,
  popup: "NAME",
  description: "#description-slide4"
};

// Show all farmers market located in center city
var slide5 = {
  slideNumber: 5,
  title: $("#slide-name-5").val(),
  view: [39.9537652, -75.1579208],
  zoom: 14,
  style: {color: 'white',
          radius: 10,
          fillColor: '#8DD3C7',
          weight: 3,
          opacity: 1,
          fillOpacity: 1},
  popup: "NAME",
  description: "#description-slide5"
};

var slideDeck = [slide1, slide2, slide3, slide4, slide5];

var activeStyle={
  "background-color": "#11799F",
  "border-radius": "5px"
};

var normalStyle={
  "background-color": "rgba(0,0,0,0.2)",
  "color":"rgba(255, 255, 255, 0.8)",
  "border-radius": "5px"
};

/* =====================
Navigation bar
===================== */
$('#maps').click(function(e){
  $('.intsidebar').fadeIn();
  $('#maps-page').fadeIn();
  $('#info-page').hide();
  $('#filter-page').hide();
  $('#route-page').hide();
});

$('#info').click(function(e){
  $('.intsidebar').fadeIn();
  $('#info-page').fadeIn();
  $('#maps-page').hide();
  $('#filter-page').hide();
  $('#route-page').hide();
});

$('#filter').click(function(e){
  $('.intsidebar').fadeIn();
  $('#filter-page').fadeIn();
  $('#maps-page').hide();
  $('#info-page').hide();
  $('#route-page').hide();
});

$('#route').click(function(e){
  $('.intsidebar').fadeIn();
  $('#route-page').fadeIn();
  $('#maps-page').hide();
  $('#info-page').hide();
  $('#filter-page').hide();
});

/* =====================
Choices
===================== */
// Filter
$('#filter-choice1').click(function(e){
  $('#filter-expand1').fadeIn();
  $('#filter-expand2').hide();
  $('#filter-choice1').css(activeStyle);
  $('#filter-choice2').css(normalStyle);
});

$('#filter-choice2').click(function(e){
  $('#filter-expand1').hide();
  $('#filter-expand2').fadeIn();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(activeStyle);
});

/* =====================
Close info sidebar
===================== */
$('#hideit1').on('mouseover',function(e){
  $('#hideit1').css("color","white");
});
$('#hideit1').on('mouseout',function(e){
  $('#hideit1').css("color","rgba(255, 255, 255, 0.7");
});
$('#hideit1').click(function(e){
  $('.intsidebar').fadeOut();
});

$('#hideit2').on('mouseover',function(e){
  $('#hideit2').css("color","white");
});
$('#hideit2').on('mouseout',function(e){
  $('#hideit2').css("color","rgba(255, 255, 255, 0.7");
});
$('#hideit2').click(function(e){
  $('.intsidebar').fadeOut();
});

$('#hideit3').on('mouseover',function(e){
  $('#hideit3').css("color","white");
});
$('#hideit3').on('mouseout',function(e){
  $('#hideit3').css("color","rgba(255, 255, 255, 0.7");
});
$('#hideit3').click(function(e){
  $('.intsidebar').fadeOut();
  $('#filter-choice1').css(normalStyle);
  $('#filter-choice2').css(normalStyle);
});

$('#hideit4').on('mouseover',function(e){
  $('#hideit4').css("color","white");
});
$('#hideit4').on('mouseout',function(e){
  $('#hideit4').css("color","rgba(255, 255, 255, 0.7");
});
$('#hideit4').click(function(e){
  $('.intsidebar').fadeOut();
});

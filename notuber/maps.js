//notuber js file

//declaring map in global scope for setMap to work
var map;
var marker;
var my_lat = -99999;
var my_lng = -99999;
//var infowindow = new google.maps.InfoWindow();
//Default locations of cars
var locations = [
    ['mXfkjrFw', 42.3453, -71.0464, 1],
    ['nZXB8ZHz', 42.3662, -71.0621, 2],
    ['Tkwu74WC', 42.3603, -71.0547, 3],
    ['5KWpnAJN', 42.3472, -71.0802, 4],
    ['uf5ZrXYw', 42.3663, -71.0544, 5],
    ['VMerzMH8', 42.3542, -71.0704, 6],
];

function initMap() { 
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  setMarker(map);
  getLocation();
  execute_http_post();
  compute_distance();
}


function setMarker(map){
var i;
var image = {
	url: 'https://tuftsdev.github.io/WebProgramming/assignments/summer2019/car.png'
};
   for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: image
      });
    }
}

//Get's current location using geolocation
function getLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(somePos) {
      my_lat = somePos.coords.latitude;
      my_lng = somePos.coords.longitude;
      renderMap();
    });
  } else {
    alert("Cannot access Geolocation...");
  }
}

function renderMap(){
  var me = new google.maps.LatLng(my_lat, my_lng);

  // Update map and go there...
        //map.panTo(me);
        
        // Create a marker
        marker = new google.maps.Marker({
          position: me,
          title: "Here I Am!"
        });
        marker.setMap(map);

        var infowindow = new google.maps.InfoWindow();
        // Open info window on click of marker
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(marker.title);
          infowindow.open(map, marker);
        });
          
}

function execute_http_post(){
  var http = new XMLHttpRequest();
  var url = 'https://hans-moleman.herokuapp.com/rides';
  //var params = "username=prOuKReR&lat=" + my_lat   + "&lng=" + my_lng;
  //var params = "username=IZ1sLGwg&lat=" + latitude + "&lng=" + longitiude;
  var params = "username=prOuKReR&lat=10&lng=10";
  http.open('POST', url, true);

  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {
   if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
    }
  }
  http.send(params);
}

function compute_distance(){
  //key a: mXfkjrFw
  //me as b
  var a = new google.maps.LatLng(42.3453, -71.0464);
  var b = new google.maps.LatLng(42.3959, -71.1787);
  console.log(google.maps.geometry.spherical.computeDistanceBetween(a,b));
  alert(google.maps.geometry.spherical.computeDistanceBetween(a,b));
}
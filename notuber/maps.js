//notuber js file

//declaring map in global scope for setMap to work
var map;

//Default lat and long
var my_lat = -99999;
var my_lng = -99999;
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
    zoom: 14
   });

   setMarker(map);
   getLocation();
}

function setMarker(map){
var marker, i;
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

//Upon determining my geoloc, placed a marker of where I am on the map
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
          
}

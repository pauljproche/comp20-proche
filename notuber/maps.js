//notuber js file
function initMap() { 
   var map = new google.maps.Map(document.getElementById('map'), {
  	center: {lat: 42.352271, lng: -71.05524200000001},
   	zoom: 14
   });

   setMarker(map);
   getLocation();
}

var locations = [
    ['mXfkjrFw', 42.3453, -71.0464, 1],
    ['nZXB8ZHz', 42.3662, -71.0621, 2],
    ['Tkwu74WC', 42.3603, -71.0547, 3],
    ['5KWpnAJN', 42.3472, -71.0802, 4],
    ['uf5ZrXYw', 42.3663, -71.0544, 5],
    ['VMerzMH8', 42.3542, -71.0704, 6],
];
//Default lat and long
var lat = -99999;
var lng = -99999;

  
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
    console.log("I am here 1");
    navigator.geolocation.getCurrentPosition(function(somePos) {
      console.log("I am here 2");
      lat = somePos.coords.latitude;
      lng = somePos.coords.longitude;
      printLocation();
    });
    console.log("I am here 3");
}
//Prints current location 
function printLocation() {
    console.log("I am here 4");
    elem = document.getElementById("map");
    elem.innerHTML = '<p class="fun">' + lat + ", " + lng + "</p>";
  }

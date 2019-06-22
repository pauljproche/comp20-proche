//notuber js file
//declaring map in global scope for setMap to work
var map;
var marker;
var my_lat = -99999;
var my_lng = -99999;
var x, y;
var locations = [];
var pathCoordinates = [];

var shortest, shortest_id;
var dist, short_dist = 100;
var contentString, contentAsString;
//var http = new XMLHttpRequest();

function initMap() { 
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  execute_http_post(my_lat, my_lng); //DONE //2. Then request the JSON data and then parse it (i.e. Saving the lat & lng of each car)
  //getLocation();       //DONE //1. First get my current location and display marker & infoWindow via renderMap()
  //renderMap();
  //compute_distance();  //DONE //4. Finally, Computes distance between me and INSERT_CAR to find shortest path
  //find_shortest_path();

  //setMarker(map);      //DONE //3. Next, use the JSON data to assign location for cars (i.e. lat, lng)
}
//Get's current location using geolocation
function getLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(somePos) {
      my_lat = somePos.coords.latitude;
      my_lng = somePos.coords.longitude;
      //console.log("my lat" + my_lat);
      //console.log("my lng" + my_lng);
      renderMap(my_lat, my_lng, contentString);
    });
  } else {
    alert("Cannot access Geolocation...");
  }
}

//Renders the map on load from getLocation()
function renderMap(my_lat, my_lng, contentString){
  var me = new google.maps.LatLng(my_lat, my_lng);
  var image = 'icons8-marker-64.png';
      //console.log("my lat" + my_lat);
      //console.log("my lng" + my_lng);
  // Update map and go there...        
        // Create a marker
        marker = new google.maps.Marker({
          position: me,
          title: "Paul Roche's Current Location", 
          animation: google.maps.Animation.DROP,
          icon: image,
          content: contentString
        });
        marker.setMap(map);
        var infowindow = new google.maps.InfoWindow();
        // Open info window on click 
        google.maps.event.addListener(marker, 'click', function() {
          //infowindow.setContent(marker.title);
          infowindow.setContent(contentAsString);
          infowindow.open(map, marker);
        });
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

//Executes the Http POST request
function execute_http_post(my_lat, my_lng){
    //console.log("my lat" + my_lat);
      //console.log("my lng" + my_lng);
  var the_lat, the_lng;
  the_lat = String(my_lat);
  the_lng = String(my_lng);
  var the_car_lat, the_car_lng, the_car_id;
  var http = new XMLHttpRequest();
  var url = 'https://hans-moleman.herokuapp.com/rides';
      //var params = "username=prOuKReR&lat=" + the_lat + "&lng=" + the_lng;
  var params = "username=prOuKReR&lat=10&lng=10";
  var shortest;

  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
        //SECTION THAT PARSES RECEIVED JSON DATA
        //console.log(http.responseText);
        var jsonData = http.responseText; 
        var json_obj = JSON.parse(jsonData);
        //SECTION THAT ASSIGNS LAT & LNG OF EACH CAR (from json data)
        for (var i=0; i < json_obj.length; i++){
          var counter = json_obj[i];

          the_car_id = counter._id;
          the_car_lat = counter.lat;
          the_car_lng = counter.lng;

          locations.push([the_car_id, the_car_lat, the_car_lng, i]);
          shortest = find_shortest_path(i, counter);
        }
        getLocation();
        setMarker(map);
        createPath();
    }
  }
  http.send(params);
}

//Set MARKERS for all the available cars
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

function find_shortest_path(i, counter){
  c_lat = locations[i][1];
  c_lng = locations[i][2];
  //call helper function
  dist = compute_distance(c_lat, c_lng);

  if(dist < short_dist){
    short_dist = dist;
    shortest_id = counter._id;
    pathCoordinates.push({lat: c_lat, lng: c_lng});
    the_content = [shortest_id, c_lat, c_lng];
    contentAsString = the_content.join(', '); 
  }
}

//Calculates the distance between point A and point B
//Param: takes the lat & lng of the current marker
function compute_distance(x, y){  
  var a = new google.maps.LatLng(x, y);
  var b = new google.maps.LatLng(42.404907699999995, -71.1823618);
  var between = google.maps.geometry.spherical.computeDistanceBetween(a,b);
  between = between*0.000621371192;
  return between;
}

function createPath(){
  pathCoordinates.push({lat: 42.404907699999995, lng:  -71.1823618});

  num_of_path_ele = pathCoordinates.length-3;
  for(var i=0; i<=num_of_path_ele; i++){   
       pathCoordinates.shift();
  }
  //console.log(pathCoordinates);
  var travelPath = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  travelPath.setMap(map);                         
}
//CHEERIOS

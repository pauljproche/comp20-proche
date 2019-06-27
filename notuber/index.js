var express = require('express');
var app = express();
/* HOW TO READ ROUTES USING EXPRESS FRAMEWORK:
app.HTTP_VERB('ROUTE NAME', function(request, response) {
  // Do stuff here...
});
*/
var bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }) );
/*github test*/
app.use(express.static(__dirname + '/public'));
//app.use(express.static('/public'));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(request, response) {
	response.send("Hello world");
  /*linking to html*/
  //response.send(__dirname + '/index.html');
});

app.get('/pikachu', function(request, response) {
	response.send("You've won the game!");
});

app.post('/rides', function(request, response) {
  //response.json([]);
if(request.body.username != null && request.body.lat != null && request.body.lng != null){
     //response.json([]);
  response.json([{"_id":"5cdf411856e9c200042989d7","username":"JANET","lat":42.354951,"lng":-71.0509,"created_at":"2019-05-17T23:17:44.427Z"},
    {"_id":"5cf583aafbbfe80004456918","username":"mXfkjrFw","lat":42.3453,"lng":-71.0464,"created_at":"2019-06-03T20:31:38.378Z"},
    {"_id":"5cf583aafbbfe80004456919","username":"nZXB8ZHz","lat":42.3662,"lng":-71.0621,"created_at":"2019-06-03T20:31:38.611Z"},
    {"_id":"5cf583aafbbfe8000445691a","username":"Tkwu74WC","lat":42.3603,"lng":-71.0547,"created_at":"2019-06-03T20:31:38.786Z"},
    {"_id":"5cf583aafbbfe8000445691b","username":"5KWpnAJN","lat":42.3472,"lng":-71.0802,"created_at":"2019-06-03T20:31:38.932Z"},
    {"_id":"5cf583abfbbfe8000445691c","username":"uf5ZrXYw","lat":42.3663,"lng":-71.0544,"created_at":"2019-06-03T20:31:39.077Z"},
    {"_id":"5cf583acfbbfe8000445691d","username":"VMerzMH8","lat":42.3542,"lng":-71.0704,"created_at":"2019-06-03T20:31:40.400Z"}]);

} else {
  res.send([{"error":"Whoops, something is wrong with your data!"}]);
}
});
// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 8888);

//declaring map in global scope for setMap to work
var map;
var marker;
var my_lat = -99999;
var my_lng = -99999;
var x, y;
var locations = []; //locations of the cars
var pathCoordinates = []; 

var shortest, shortest_id;
var dist, short_dist = 100;
var contentString, contentAsString;

function initMap() { 
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  execute_http_post(my_lat, my_lng); 
}
//Get's current location using geolocation
function getLocation() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(somePos) {
      my_lat = somePos.coords.latitude;
      my_lng = somePos.coords.longitude;

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

  var the_lat, the_lng;
  the_lat = String(my_lat);
  the_lng = String(my_lng);
  var the_car_lat, the_car_lng, the_car_id;
  var http = new XMLHttpRequest();
  var url = 'https://dry-lake-17010.herokuapp.com/rides';
  var params = "username=prOuKReR&lat=10&lng=10";
  var shortest;

  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
        //SECTION THAT PARSES RECEIVED JSON DATA
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
var s_lat, s_lng;
var the_content;
var image = {
  url: 'https://tuftsdev.github.io/WebProgramming/assignments/summer2019/car.png'
};
   for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: image,
        content: contentAsString
      });

      s_lat = locations[i][1];
      s_lng = locations[i][2];

      the_content = [s_lat, s_lng];
      contentAsString = the_content.join(', ');

      var infowindow = new google.maps.InfoWindow();
        // Open info window on click 
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(contentAsString);
          infowindow.open(map, marker);
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
    var the_content = [shortest_id, short_dist];
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
  var travelPath = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  travelPath.setMap(map);                         
}
//notuber js file
<<<<<<< HEAD

//declaring global scope variables
var map;
<<<<<<< HEAD
var marker;
=======
>>>>>>> test-branch
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
<<<<<<< HEAD
//Initialize infoWindow
//var infowindow = new google.maps.InfoWindow();
=======

var http = new XMLHttpRequest();
var url = 'https://hans-moleman.herokuapp.com/rides';
var params = "username=prOuKReR&lat=" + my_lat + "&lng=" + my_lng;
http.open('POST', url, true);
>>>>>>> test-branch

//Send the proper header information along with the request
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
    }
}
http.send(params);

function initMap() { 
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 11
   });
=======
//declaring map in global scope for setMap to work
var map;
var marker;
var my_lat = -99999;
var my_lng = -99999;
var x, y;
//var infowindow = new google.maps.InfoWindow();
var locations = [];
var pathCoordinates = [];
var shortest, shortest_id;
var dist = 100;
var short_dist = 100;
var contentString = "tttt";
//var infowindow = new google.maps.InfoWindow();
//var xmlhttp = new XMLHttpRequest();
function initMap() { 
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
>>>>>>> my-temporary-work


  
  execute_http_post(); //DONE //2. Then request the JSON data and then parse it (i.e. Saving the lat & lng of each car)
  //getLocation();       //DONE //1. First get my current location and display marker & infoWindow via renderMap()
  //renderMap();
  //compute_distance();  //DONE //4. Finally, Computes distance between me and INSERT_CAR to find shortest path
  //find_shortest_path();
                       //5. Display polyline between me and closest marker
                       //setMarker(map);

                       //DISPLAY PATH
                       //INFOWINDOW SHOWING SHORTEST PATH
  //setMarker(map);      //DONE //3. Next, use the JSON data to assign location for cars (i.e. lat, lng)
  
  
  
}

/*var infoWindowContent = [
  ['<div class="info_content">' +
        '<h3>Brooklyn Museum</h3>' +
        '<p>The Brooklyn Museum is an art museum located in the New York City borough of Brooklyn.</p>' + '</div>'],
  ['<div class="info_content">' +
        '<h3>NEWYORK Museum</h3>' +
        '<p>The Brooklyn Museum is an art museum located in the New York City borough of Brooklyn.</p>' + '</div>'],
]*/
//Get's current location using geolocation
function getLocation() {

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(somePos) {
      my_lat = somePos.coords.latitude;
      my_lng = somePos.coords.longitude;
      console.log(contentString);
      renderMap(my_lat, my_lng, contentString);
    });
  } else {
    alert("Cannot access Geolocation...");
  }
}

//Renders the map on load from getLocation()
function renderMap(my_lat, my_lng, contentString){
  console.log(contentString);
  var me = new google.maps.LatLng(my_lat, my_lng);
<<<<<<< HEAD
  // Update map and go there...
<<<<<<< HEAD
        map.panTo(me);
        
=======
>>>>>>> test-branch
=======
  // Update map and go there...        
>>>>>>> my-temporary-work
        // Create a marker
        marker = new google.maps.Marker({
          position: me,
          //title: "Here I Am!"
          title: shortest_id, 
          content: contentString
        });
<<<<<<< HEAD
        marker.setMap(map);
<<<<<<< HEAD

        // Open info window on click of marker
        //google.maps.event.addListener(marker, 'click', function() {
        //  infowindow.setContent(marker.title);
        //  infowindow.open(map, marker);
        //});
          
=======
        marker.setMap(map);      
>>>>>>> test-branch
=======
        console.log("HERE");
        var infowindow = new google.maps.InfoWindow();
        // Open info window on click of markerg 0.   
        google.maps.event.addListener(marker, 'click', function() {
          //infowindow.setContent(marker.title);
          console.log(contentString);
          infowindow.setContent(contentStringAsString);
          infowindow.open(map, marker);

        });
}

//Executes the Http POST request
function execute_http_post(){
  var the_car_lat, the_car_lng, the_car_id;
  var http = new XMLHttpRequest();
  var url = 'https://hans-moleman.herokuapp.com/rides';
  var params = "username=prOuKReR&lat=10&lng=10";
 
  var shortest;

  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  //http.onreadystatechange=myCallBack;
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      
        //SECTION THAT PARSES RECEIVED JSON DATA
        console.log(http.responseText);
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
          
          console.log(shortest);
          //getLocation();

        }
        //console.log(shortest);
        console.log(contentString);
        getLocation();
        setMarker(map);
        createPath();
    }
  }
  http.send(params);
  //getLocation();
}

/*function myCallBack(){
  if(xmlhttp.readyState==4 && xml.status==200){
    console.log(http.responseText);
  }
}*/
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
    console.log(short_dist);
    console.log(counter._id);
    shortest_id = counter._id;
    pathCoordinates.push({lat: c_lat, lng: c_lng});
    contentString = [shortest_id, c_lat, c_lng];
    contentStringAsString = contentString.join(', '); 
    console.log(contentString);
  }
}

//Calculates the distance between point A and point B
//Param: takes the lat & lng of the current marker
function compute_distance(x, y){  

  var a = new google.maps.LatLng(x, y);
  var b = new google.maps.LatLng(42.3959, -71.1787);

  var between = google.maps.geometry.spherical.computeDistanceBetween(a,b);
  between = between*0.000621371192;

  return between;
}

function createPath(){
  pathCoordinates.push({lat: 42.3959, lng: -71.1787});
  console.log("HERRYA");
  console.log(pathCoordinates);
  console.log(pathCoordinates.length)-2;

  num_of_path_ele = pathCoordinates.length-3;
  for(var i=0; i<=num_of_path_ele; i++){   
       console.log("i=" + i);
       pathCoordinates.shift();
       console.log(pathCoordinates.length)-2;
  }
  console.log(pathCoordinates);
  var travelPath = new google.maps.Polyline({
    path: pathCoordinates,
    geodesic: true,
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  travelPath.setMap(map);                         
  
>>>>>>> my-temporary-work
}
//CHEERIOS

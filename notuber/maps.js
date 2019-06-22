//notuber js file
//declaring map in global scope for setMap to work
var map;
var marker;
var my_lat = -99999;
var my_lng = -99999;
var x,y;
//var infowindow = new google.maps.InfoWindow();
var locations = [];
var distance = [];
var shortest;
var dist, short_dist = 100;
function initMap() { 
   map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.352271, lng: -71.05524200000001},
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });


  
  execute_http_post(); //DONE //2. Then request the JSON data and then parse it (i.e. Saving the lat & lng of each car)
  getLocation();       //DONE //1. First get my current location and display marker & infoWindow via renderMap()
  //compute_distance();  //DONE //4. Finally, Computes distance between me and INSERT_CAR to find shortest path
  //find_shortest_path();
                       //5. Display polyline between me and closest marker
                       //setMarker(map);

                       //DISPLAY PATH
                       //INFOWINDOW SHOWING SHORTEST PATH
  setMarker(map);      //DONE //3. Next, use the JSON data to assign location for cars (i.e. lat, lng)
                        
  
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

//Renders the map on load from getLocation()
function renderMap(){
  var me = new google.maps.LatLng(my_lat, my_lng);
  // Update map and go there...        
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

//Executes the Http POST request
function execute_http_post(){
  var the_car_lat, the_car_lng, the_car_id;
  var http = new XMLHttpRequest();
  var url = 'https://hans-moleman.herokuapp.com/rides';
  var params = "username=prOuKReR&lat=10&lng=10";
 
  var shortest;

  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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
          //console.log(locations[i]); 
          shortest = find_shortest_path(i);

        }
        //console.log(shortest);
        setMarker(map);
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

function find_shortest_path(i){
  var c_lat, c_lng;
  c_lat = locations[i][1];
  c_lng = locations[i][2];
  //call helper function
  dist = compute_distance(c_lat, c_lng);

  if(dist < short_dist){
    short_dist = dist;
    console.log(short_dist);
  }
}

//Calculates the distance between point A and point B
//Param: shares the lat & lng of a TEST car
function compute_distance(x, y){  

  var a = new google.maps.LatLng(x, y);
  var b = new google.maps.LatLng(42.3959, -71.1787);
  //var final_distance;

  var between = google.maps.geometry.spherical.computeDistanceBetween(a,b);
  between = between*0.000621371192;

  //final_distance = between;
  //distance.push(final_distance);

  return between;
}




//notuber js file
function initMap() { 
   //var myLatLng1 = {lat: 42.3453, lng: 	-71.0464};
   var locations = [
      ['mXfkjrFw', 42.3453, -71.0464, 1],
      ['nZXB8ZHz', 42.3662, -71.0621, 2],
      ['Tkwu74WC', 42.3603, -71.0547, 3],
      ['5KWpnAJN', 42.3472, -71.0802, 4],
      ['uf5ZrXYw', 42.3663, -71.0544, 5]
      ['VMerzMH8', 42.3542, -71.0704, 6]
    ];

   var map = new google.maps.Map(document.getElementById('map'), {
  	center: {lat: 42.352271, lng: -71.05524200000001},
   	zoom: 15
   });

   var marker, i;
   //var image = 'https://tuftsdev.github.io/WebProgramming/assignments/summer2019/car.png';
   console.log(locations.length);
   for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
        //icon: image
      });
      console.log(i);
      console.log(locations[i][1]);
      console.log(locations[i][2]);
    }
}



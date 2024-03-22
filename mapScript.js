
let spartanIcon = L.icon({
		iconUrl: 'Spartan.png',
		iconSize:     [30, 58],
		iconAnchor:   [22, 94], 
		popupAnchor:  [-3, -76] 
	});

let theScreamIcon = L.icon({
		iconUrl: 'theScream.png',
		iconSize:     [40, 58], 
		iconAnchor:   [22, 94], 
		popupAnchor:  [-3, -76] 
	});

let srjcCoord = [ 38.45610986503569, -122.72160568983026 ];

let myZoom = 5;

var map = L.map('mymap').setView(srjcCoord, myZoom)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markerSRJC = L.marker(srjcCoord).addTo(map);
let popupSRJC = markerSRJC.bindPopup( "<h2>SRJC</h2> <p>Where I am currently completing my education.</p>" );

populateMap();

let browserLocation = document.getElementById("browserLocation");
browserLocation.addEventListener("click", function() {
	if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
		function(position) { 
			let pos = { 
				lat: position.coords.latitude,
				lng: position.coords.longitude 
				};	
			window.alert("Your browser postion is: " + pos.lat + " " + pos.lng + " check for it on the map below.");
			let browserCoords = pos;
			let browserMarker = L.marker(browserCoords, {icon: theScreamIcon}).addTo(map);
			let browserPopup = browserMarker.bindPopup( "<h2>Your Browser Location!</h2> <p>Pretty crazy, right?</p>");
		}							
		);
	};
}
								)

let userPopup = L.popup();
function onMapClick( event ) {
  userPopup.setLatLng(event.latlng);
  userPopup.setContent('Coordinates: ' + event.latlng.toString() );
  userPopup.openOn(map);
};

map.on('click', onMapClick);


function populateMap() {
	console.log('getting json data');
	$.getJSON( "map.json",

		function(mapCoords) {
			console.log('json data retrieved');
			for ( var i = 0; i < mapCoords.length; i++ ) {
				let coords = {
					lat : mapCoords[i].lat,
					lng : mapCoords[i].lon
				};
				let marker = L.marker(coords, {icon: spartanIcon}).addTo(map);
				let popup = marker.bindPopup(`<h2>  ${mapCoords[i].title}  </h2>  ${mapCoords[i].desc}`)
			}
		}
	); 
}
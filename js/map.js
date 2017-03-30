(function() {
  'use strict';

  const TOKEN = 'pk.eyJ1Ijoib2xlY2tzYW5kciIsImEiOiJjajB3c3BwMG4wMDJlMzJwZW5kaXVoYmx1In0.7VqWfo1WhceSnXEXGSnHWA';

  let map = L.map('map').setView([51.505, -0.09], 13);

  let osm = L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2xlY2tzYW5kciIsImEiOiJjajB3c3BwMG4wMDJlMzJwZW5kaXVoYmx1In0.7VqWfo1WhceSnXEXGSnHWA',
    {
      maxZoom: 20,
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }
  ).addTo(map);

  // визначає поточне місцезнаходження і переміщається туди
  map.locate({setView: true, maxZoom: 16});


  // коли користувач набирає місце зі списку - треба переміститися до нього
  $('#search-dropdown').dropdown('setting', 'onChange', function(e) {
  	 let selectedName = $('.selection.dropdown').dropdown('get value');
  	 let elem = $('#search-dropdown .item[data-value="'+selectedName+'"]');

  	 let lon = parseFloat(elem.data('lon'));
  	 let lat = parseFloat(elem.data('lat'));
     console.log(elem.data('boundingbox'));
     let boundingbox = elem.data('boundingbox');
     console.dir(boundingbox);
     let
      clat1 = parseFloat(boundingbox[0]),
      clng1 = parseFloat(boundingbox[2]),
      clat2 = parseFloat(boundingbox[1]),
      clng2 = parseFloat(boundingbox[3]);

      console.log(clat1, clng1, clat2, clng2);

     var corner1 = L.latLng(clat1, clng1),
      corner2 = L.latLng(clat2, clng2),
      bounds = L.latLngBounds(corner1, corner2);

     let zoom = 13;

     let coords = L.latLng(lat, lon);

     map.fitBounds(bounds);
  });

})();

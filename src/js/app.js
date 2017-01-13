const googleMap = googleMap || {};
const google = google;

googleMap.addInWindowForIsland = function(island, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
    this.infoWindow = new google.maps.InfoWindow({
      content: `<img src='../images/${island.image}'><p>${island.name}</p><p>${island.location}</p><p>${island.area}</p><p>${island.description}</p>`
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
  });
};

googleMap.createMarkerForIsland = function(island) {
  const latlng = new google.maps.LatLng(island.lat, island.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    animation: google.maps.Animation.DROP
  });
  this.addInfoWindowForIsland(island, marker);
};

googleMap.loopThroughIslands = function(data) {
  console.log(data)

  $.each(data, (i, island) => {
    setTimeout(function(){
      googleMap.createMarkerForIsland(island);
    },i * 1000);
  });
};

googleMap.getIslands = function() {
  $.get('http://localhost:3000/api/islands').done(this.loopThroughIslands);
};

googleMap.mapSetup = function() {
  const canvas = document.getElementById('map-canvas');
  const mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(51.490744,-0.140362),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(canvas, mapOptions);
  this.getIslands();
};

$(googleMap.mapSetup.bind(googleMap));

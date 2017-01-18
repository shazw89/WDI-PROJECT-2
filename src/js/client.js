const googleMap = googleMap || {};
const google    = google;

googleMap.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');

  $('.home').on('click', this.homepage.bind(this));
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  $('.map').on('click', this.mapSetup.bind(this));
  this.$main.on('submit', 'form', this.handleForm);

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

googleMap.loggedInState = function(){
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.mapSetup();
};

googleMap.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.homepage();
};

googleMap.homepage = function(){
  $('header h1').hide();
  this.$main.html(`
    <img src="/images/kraken.gif" class="kraken">
    <h2>Desert Islands For Deserters</h2>
    <p><h3>Islands have long held mystique for the human psyche, particularly when most of them were undiscovered. Nowadays, our interconnectivity makes it seem like there are few frontiers left to excite our imagination in the same way. However, there are two million uninhabited islands strewn in our rivers, streams and oceans. Our app covers a mere thirty of them. And even within our small sample size,  you’ll find that the reasons they remain deserted are manifold. Some house wondrous, delicate ecosystems not found anywhere else in the world. Others are more sinister in nature, keeping settlers at bay with treacherous terrain, bad weather and the occasional curse. Regardless, the intrepid adventurer in you will hardly be able to resist their siren call. Just be sure not to stray too far from familiar shores or you too may be lost to the annals of time.</h3></p>
    `);
};

googleMap.register = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
      <h2>Register</h2>
      <form method="post" action="/register">
      <div class="form-group">
      <input class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
      <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="btn btn-primary" type="submit" value="Register">
      </form>
      `);
};

googleMap.login = function(e) {
  e.preventDefault();
  this.$main.html(`
        <section class="container">
        <h2>Login</h2>
        <form method="post" action="/login">
        <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
        </div>
        <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
        </div>
        <input class="btn btn-primary" type="submit" value="Login">
        </form>
        </section>
        `);
};

googleMap.logout = function(e){
  e.preventDefault();
  this.removeToken();
  this.loggedOutState();
};


googleMap.handleForm = function(){
  event.preventDefault();

  const url    = `${googleMap.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

  return googleMap.ajaxRequest(url, method, data, (data) => {
    if (data.token) googleMap.setToken(data.token);
    googleMap.loggedInState();
  });
};

googleMap.ajaxRequest = function(url, method, data, callback){
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  })
        .done(callback)
        .fail(data => {
          console.log(data);
        });
};

googleMap.setRequestHeader = function(xhr) {
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};

googleMap.setToken = function(token){
  return window.localStorage.setItem('token', token);
};

googleMap.getToken = function(){
  return window.localStorage.getItem('token');
};

googleMap.removeToken = function(){
  return window.localStorage.clear();
};

googleMap.addInfoWindowForIsland = function(island, marker, weather) {
      google.maps.event.addListener(marker, 'click', () => {
        if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
        this.infoWindow = new google.maps.InfoWindow({
          content: `
          <div class="infoWindow">
          <img class="islandImage" src="../images/${island.image}"><p>${island.name}</p><p>${island.location}</p><p>${island.area}</p>
          <p>${island.description}</p>
          <p>${weather.weather[0].description}</p>
          `
        });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
    google.maps.event.addListener(this.infoWindow, 'closeclick', function(){
      googleMap.map.setZoom(2);
    });
      });
};

googleMap.createMarkerForIsland = function(island) {
  $.get(`http://api.openweathermap.org/data/2.5/weather?lat=${island.lat}&lon=${island.lng}&APPID=fac0994644ce8854830ef0888b428c6d`).done((weather ) =>{

    console.log(weather);
    const latlng = new google.maps.LatLng(island.lat, island.lng);
    const marker = new google.maps.Marker({
      position: latlng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: 'images/Dagger-1.png'
    });
    this.addInfoWindowForIsland(island, marker, weather);

  });

};

googleMap.loopThroughIslands = function(data) {

  $.each(data, (i, island) => {
    setTimeout(function(){
      googleMap.createMarkerForIsland(island);
    },i * 400);
  });
};

googleMap.createMarkerForMonster = function(monster){
  const latlng = new google.maps.LatLng(monster.lat, monster.lng);
  new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: monster.image
  });
};

googleMap.addMonsters = function(data){
  const monsters = [
    {
      image: 'images/bwhale.gif',
      lat: -53.686319,
      lng: 75.708080
    },
    {
      image: 'images/flyingfish.gif',
      lat: -47.594150,
      lng: -118.050739
    },
    {
      image: 'images/gesseadev.gif',
      lat: 75.304227,
      lng: 37.723388
    },
    {
      image: 'images/gesboarwh.gif',
      lat: 55.838049,
      lng: -88.588684
    },
    {
      image: 'images/whayng.gif',
      lat: -70.686045,
      lng: -41.620913
    }
  ];
  $.each(monsters, (i, monster) => {
    setTimeout(function(){
      googleMap.createMarkerForMonster(monster);
    },i*400);
  });
};

googleMap.getIslands = function() {
  $.get('http://localhost:3000/api/islands').done(this.loopThroughIslands);
  this.addMonsters();
};

// googleMap.setMonsters = function() {
//   const map = document.getElementById('map');
//   const walrus = '/images/morss.gif';
//   const walrusMark = ({
//     position: {lat: 23.508235, lng: -44.449651},
//     map: this.map,
//     icon: walrus
//   });
//   this.map = new google.maps.Map(map, walrusMark);
// };

googleMap.mapSetup = function() {
  this.$main.html('<div id=\'map\'></div>');
  const canvas = document.getElementById('map');
  const mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(51.490744,-0.140362),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
              "featureType": "all",
              "elementType": "all",
              "stylers": [
                {
                  "color": "#d4b78f"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "all",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#0d0000"
                },
                {
                  "visibility": "on"
                },
                {
                  "weight": 1
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98290e"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#98290e"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.neighborhood",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                {
                  "color": "#d4b78f"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "all",
              "stylers": [
                {
                  "color": "#c4b17e"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#0d0000"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#d9be94"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#0d0000"
                },
                {
                  "visibility": "off"
                },
                {
                  "weight": 2
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#a8ac91"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#60061E"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            }
          ]
        };


        this.map = new google.maps.Map(canvas, mapOptions);
        this.getIslands();
      };


$(googleMap.init.bind(googleMap));

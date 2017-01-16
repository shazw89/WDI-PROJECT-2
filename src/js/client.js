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
  this.$main.html(`<img src="/images/old-world-map.jpg">`);
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
      content: `<img src="../images/${island.image}"><p>${island.name}</p><p>${island.location}</p><p>${island.area}</p><p>${island.description}</p><p>${weather.weather[0].description}</p>`
    });

    this.infoWindow.open(this.map, marker);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(15);
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
    },i * 1000);
  });
};

googleMap.getIslands = function() {
  $.get('http://localhost:3000/api/islands').done(this.loopThroughIslands);
};

googleMap.mapSetup = function() {
  this.$main.html('<div id=\'map\'></div>');
  const canvas = document.getElementById('map');
  const mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(51.490744,-0.140362),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };


  this.map = new google.maps.Map(canvas, mapOptions);
  this.getIslands();
};


$(googleMap.init.bind(googleMap));

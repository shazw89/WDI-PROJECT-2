const googleMap = googleMap || {};

googleMap.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main  = $('main');
  $('.home').on('click', this.homepage.bind(this));
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
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
  // this.usersIndex();
};

googleMap.loggedOutState = function(){
  $('.loggedIn').hide();
  $('.loggedOut').show();
  this.register();
};

googleMap.homepage = function(){
  $('header h1').hide();
  this.$main.html('Welcome!');
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
      `);
    };

    googleMap.logout = function(e){
      e.preventDefault();
      this.removeToken();
      this.loggedOutState();
    };

    // googleMap.usersIndex = function(e) {
    //   if (e) e.preventDefault();
    //   const url = `${this.apiUrl}/users`;
    //
    //   return this.ajaxRequest(url, 'get', null, data => {
    //     this.$main.html(`
    //       <div class="card-deck-wrapper">
    //       <div class="card-deck">
    //       </div>
    //       </div>
    //       `);
    //       const $container = this.$main.find('.card-deck');
    //       $.each(data.users, (i, user) => {
    //         $container.append(`
    //           <div class="card col-md-4">
    //           <img class="card-img-top" src="http://fillmurray.com/300/300" alt="Card image cap">
    //           <div class="card-block">
    //           <h4 class="card-title">${user.username}</h4>
    //           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    //           <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    //           </div>
    //           </div>`);
    //         });
    //       });
    //     };

    googleMap.handleForm = function(e){
      e.preventDefault();

      const url    = `${googleMap.apiUrl}${$(this).attr('action')}`;
      const method = $(this).attr('method');
      const data   = $(this).serialize();

      return googleMap.ajaxRequest(url, method, data, data => {
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


    $(googleMap.init.bind(googleMap));

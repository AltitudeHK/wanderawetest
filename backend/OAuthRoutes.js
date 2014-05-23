module.exports = function(app, passport) {


  var allowCrossDomain = function(req, res, next) {
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
       
     if ('OPTIONS' == req.method) {
       res.send(200);
     }
     else {
       next();
     }
   }; 

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  // app.get('/', function(req, res) {
  //   res.render('index.ejs'); // load the index.ejs file
  // });

  // // =====================================
  // // LOGIN ===============================
  // // =====================================
  // // show the login form
  // app.get('/login', function(req, res) {

  //   // render the page and pass in any flash data if it exists
  //   res.render('login.ejs', { message: req.flash('loginMessage') });
  // });

  // // process the login form
  // app.post('/login', passport.authenticate('local-login', {
  //   successRedirect : '/profile', // redirect to the secure profile section
  //   failureRedirect : '/login', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));

  // // =====================================
  // // SIGNUP ==============================
  // // =====================================
  // // show the signup form
  // app.get('/signup', function(req, res) {

  //   // render the page and pass in any flash data if it exists
  //   res.render('signup.ejs', { message: req.flash('signupMessage') });
  // });

  // // process the signup form
  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect : '/profile', // redirect to the secure profile section
  //   failureRedirect : '/signup', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));

  // // =====================================
  // // PROFILE SECTION =========================
  // // =====================================
  // // we will want this protected so you have to be logged in to visit
  // // we will use route middleware to verify this (the isLoggedIn function)
  // app.get('/profile', isLoggedIn, function(req, res) {
  //   res.render('profile.ejs', {
  //     user : req.user // get the user out of session and pass to template
  //   });
  // });

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', allowCrossDomain, passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    function(req, res, next, passport){
      console.log('facebook login success!');
      res.cookie('currentUser', JSON.stringify({
        role: 2
      }));
      res.redirect('/', 302);
    }
  );

exports.authFacebookCallback = function(req, res, next, passport) {

  passport.authenticate('facebook', function(err, user) {

    if(err){
      return next(err);
    }

    if(!user){
      return res.redirect('/');
    }

    req.login(user, function(err) {
      if(err){
        return next(err);
      }
      res.cookie(JSON.stringify(user));
      return res.redirect('/#/dash');
    });

  })(req, res, next);

};





  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

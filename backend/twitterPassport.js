//Run this file on server.js after app.configure

//user model
var User          = require('./models/user');
//file with api key / code
var authConfig = require('./authConfig');

//Strategies
// var twitterStrategy = require('passport-twitter').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

// expose this function to our app using module.exports
module.exports = function(app, passport) {

  // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////twitter//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
    passport.use(new TwitterStrategy({
        // pull in our app id and secret from our authConfig.js file
        consumerKey     : authConfig.twitter.consumerKey,
        consumerSecret  : authConfig.twitter.consumerSecret,
        callbackURL     : authConfig.twitter.callbackURL
    },


    // twitter will send back the token and profile
    function(token, tokenSecret, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their twitter id
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that twitter id, create them
                    var newUser            = new User();

                    console.log(profile)

                    // set all of the twitter information in our user model
                    newUser.twitter.id    = profile.id; // set the users twitter id                   
                    newUser.twitter.token = token; // we will save the token that twitter provides to the user                    
                    newUser.twitter.username  = profile.username; // look at the passport user profile to see how names are returned
                    newUser.twitter.displayName = profile.displayName; // twitter can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
    
    /////////////////////////////routing//////////////////////////////////////////////
    
    app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        function(req, res, next){
            authtwitterCallback(req, res, next, passport);
        }
    );

    var authtwitterCallback = function(req, res, next, passport) {

      passport.authenticate('twitter', function(err, user) {

        if(err){
          console.log('err! ', user)
          return next(err);
        }

        if(!user){
          return res.redirect('/');
        }

        console.log('twitterCallback user: ', user);

        req.login(user, function(err) {
          if(err){
            console.log('twitter req.login err!')
            return next(err);
          }
          user.role = 2;
          console.log(user)
          res.cookie('currentUser', JSON.stringify(user));
          return res.redirect('/');
        });

      })(req, res, next);

    };

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    // passport.use('local-login', new LocalStrategy({
    //     // by default, local strategy uses username and password, we will override with email
    //     usernameField : 'email',
    //     passwordField : 'password',
    //     passReqToCallback : true // allows us to pass back the entire request to the callback
    // },
    // function(req, email, password, done) { // callback with email and password from our form

    //     // find a user whose email is the same as the forms email
    //     // we are checking to see if the user trying to login already exists
    //     User.findOne({ 'local.email' :  email }, function(err, user) {
    //         // if there are any errors, return the error before anything else
    //         if (err)
    //             return done(err);

    //         // if no user is found, return the message
    //         if (!user)
    //             return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

    //         // if the user is found but the password is wrong
    //         if (!user.validPassword(password))
    //             return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

    //         // all is well, return successful user
    //         return done(null, user);
    //     });

    // }));

};

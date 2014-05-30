module.exports = {

  'facebook' : {
    'clientID'      : process.env.FACEBOOK_KEY,
    'clientSecret'  : process.env.FACEBOOK_SECRET,
    'callbackURL'   : 'http://morning-castle-7568.herokuapp.com/auth/facebook/callback'
  },

  'twitter' : {
    'consumerKey'     : 'your-secret-clientID-here',
    'consumerSecret'  : 'your-client-secret-here',
    'callbackURL'     : 'http://localhost:8080/auth/twitter/callback'
  },

  'google' : {
    'clientID'    : 'your-secret-clientID-here',
    'clientSecret'  : 'your-client-secret-here',
    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  }

};

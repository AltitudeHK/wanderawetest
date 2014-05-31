module.exports = {

  'facebook' : {
    'clientID'      : process.env.FACEBOOK_KEY || 'sdf',
    'clientSecret'  : process.env.FACEBOOK_SECRET || 'df',
    'callbackURL'   : 'http://localhost:5000/auth/facebook/callback'
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

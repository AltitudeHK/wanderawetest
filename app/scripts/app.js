'use strict';

angular
  .module('wanderaweApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'angularFileUpload'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    var access = routingConfig.accessLevels;

    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        access: access.anon
      })
      .state('gallery', {
        url: '/gallery',
        templateUrl: 'views/gallery.html',
        controller: 'GalleryCtrl',
        access: access.anon
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: access.anon
      })
      .state('map', {
        url: '/',
        templateUrl: 'views/map.html',
        controller: 'MapCtrl',
        access: access.anon
      })
      .state('navigation', {
        url: '/navigation',
        templateUrl: 'views/navigation.html',
        controller: 'NavigationCtrl',
        access: access.anon
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        access: access.user
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        access: access.anon
      })
      .state('singlephoto', {
        url: '/singlephoto/:photoId',
        templateUrl: 'views/singlephoto.html',
        controller: 'SinglephotoCtrl',
        resolve: {
          picture: ['$stateParams', 'Photo', function ($stateParams, Photo) {
            console.log('stateParams.photoId is:', $stateParams.photoId);
            return Photo
              .retrieveOnePhoto($stateParams.photoId)
              .success(function (data) {
                console.log('Successfully reached single photo page', data);
                return data;
              });
          }]
        },
        access: access.anon
      })
      .state('upload', {
        url: '/upload',
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl',
        access: access.user
      });
  })

  .run(['$rootScope', '$state', '$cookieStore', 'userService', function ($rootScope, $state, $cookieStore, userService) {
    $rootScope.$on('$stateChangeStart', function (event, next, currentUser) {
      currentUser = $cookieStore.get('currentUser') || {role: 1};
      // console.log(next, next.access)
      // console.log('current user role is', currentUser)
      if (currentUser === undefined) { debugger; }
      if (!userService.isAuthorized(next.access, currentUser.role)) {
        event.preventDefault();
        if (userService.isLoggedIn(currentUser)) {
          $state.go('map');
        } else {
          $state.go('map');
        }
      }
    });
    // $rootScope.$on('invalidSignUp', function(event, message){
    //   alert(message);
    // });
    // $rootScope.$on('invalidLogIn', function(event, message){
    //   alert(message);
    // });
  }]);

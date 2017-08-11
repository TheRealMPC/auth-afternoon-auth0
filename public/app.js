angular.module('myApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        template: '<a href="/auth/github">Log in</a>',
        controller: 'githubCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: './templates/home.html',
        controller: 'homeCtrl'
      })
      .state('friend', {
        url: '/friend',
        templateUrl: './templates/friend.html',
        controller: 'friendCtrl'
      })
      $urlRouterProvider
        .otherwise('/');
      })

  .config(function($httpProvider) {
      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
      $httpProvider.interceptors.push('myHttpInterceptor');
    })

    // register the interceptor as a service
  .factory('myHttpInterceptor', function() {
      return {
          'responseError': function(rejection) {
              if (rejection.status == 403) {
                document.location = '/';
                  return rejection;
              }
              return rejection;
          }
      };
});

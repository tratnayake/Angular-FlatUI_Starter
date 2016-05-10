var mainApp = angular
  .module('actApp', [
    'ui.router','controllers','services'
  ]);

mainApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {

	// By default, go to home
	$urlRouterProvider.otherwise('/#/home');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        authenticate: false
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginController',
        authenticate: false
      })

  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
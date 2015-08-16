angular.module('game2048', ['game.directives','game.services','ui.router']).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'src/app/home/home.tpl.html'
    });
});
angular.module('game.directives',[]);
angular.module('game.services',[]);

angular.module('game2048', ['game.components','ui.router']).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'src/app/home/home.tpl.html'
    });
});
angular.module('game.components',['component.2048']);
angular.module('component.2048',[]);

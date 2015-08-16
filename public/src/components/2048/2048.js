angular.module('game.directives')
.directive('gg2048', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {},
    templateUrl: '/src/components/2048/2048.html',
    controllerAs: '2048',
    bindToController: true,
    controller: function(Service2048) {
  
      console.log(Service2048.skelly());

      var self = this;
    }
  };
});

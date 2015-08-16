angular.module('game.directives')
.directive('ggTile', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {},
    templateUrl: '/src/components/2048/tile/tile.html',
    controllerAs: 'tile',
    bindToController: true,
    controller: function() {
      var self = this;
    }
  };
});

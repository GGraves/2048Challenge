angular.module('component.2048')
.directive('ggTile', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {
      tileObject: '@'
    },
    templateUrl: '/src/components/2048/tile/tile.html',
    link: function(scope, elem, attrs){
      var tile = JSON.parse(scope.tileObject);
      scope.value = tile.value; 
    }
  };
});

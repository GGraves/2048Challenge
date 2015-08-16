angular.module('component.2048')
.directive('gg2048', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {},
    templateUrl: '/src/components/2048/2048.html',
    controllerAs: '2048',
    bindToController: true,
    controller: function(Service2048) {
 
      var self = this;
      var gridSize = 4;

      //self.grid = Service2048.generateGrid(gridSize);
      
      console.log(Service2048.skelly());

    }
  };
});

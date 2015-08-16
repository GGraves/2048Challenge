angular.module('component.2048')
.directive('gg2048', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {},
    templateUrl: '/src/components/2048/2048.html',
    controllerAs: 'board',
    bindToController: true,
    controller: function(Service2048) {
 
      var self = this;
      var gridSize = 4;
      //self.grid = Service2048.generateGrid(gridSize);

      //temp grid
      self.grid = [ [{'value': 2},{'value': ''},{'value': 4},{'value': ''}],
                    [{'value': ''},{'value': ''},{'value': ''},{'value': ''}],
                    [{'value': ''},{'value': 2},{'value': ''},{'value': ''}],
                    [{'value': ''},{'value': ''},{'value': ''},{'value': ''}]];
      
    }
  };
});

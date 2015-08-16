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
      self.grid = Service2048.generateGrid(gridSize);

      //window arrow keypress events
      angular.element(window).on('keydown', function(event) {
        var key = (event.keyCode || event.which);
        if(key === 38) {
          console.log('up');
          //self.grid = Service2048.updateGrid(self.grid);
        }
        if(key === 37) {
          console.log('left');
          //self.grid = Service2048.updateGrid(self.grid);
        }
        if(key === 40) {
          console.log('down');
          //self.grid = Service2048.updateGrid(self.grid);
        }
        if(key === 39) {
          console.log('right');
          //self.grid = Service2048.updateGrid(self.grid);
        } 
      });
      
    }
  };
});

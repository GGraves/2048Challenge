angular.module('component.2048')
.directive('gg2048', function() {
  return {
    restrict: 'E',
    replace: 'true',
    scope: {},
    templateUrl: '/src/components/2048/2048.html',
    bindToController: true,
    controllerAs: 'game',
    controller: function($scope, Service2048) {
      var self = this;
      var myStorage = localStorage;
      var gridSize = 4;
      self.grid = Service2048.generateGrid(gridSize);
      self.newGame = newGame;
      self.topScore = myStorage.getItem("topScore") ? myStorage.getItem("topScore") : 'No Top Score'; 
      self.gridLocked = false;
      angular.element(window).on('keydown', function(event) {
        //window arrow keypress events
        var key = (event.keyCode || event.which);
        if(key > 36 && key < 41) {
          gameDriver(key);
        }
      });

      function newGame() {
        //reset game
        self.gridLocked = false;
        self.grid = Service2048.generateGrid(gridSize);
      }

      function gameDriver(key) {
        //main game loop
        var oldGrid = self.grid;
        for(var i = 0; i < gridSize; i++) {
          //calculate change in board state
          self.grid = Service2048.updateGrid(self.grid, key);
          $scope.$apply();
        }
        if(Service2048.boardChanged(self.grid, oldGrid) && !Service2048.isGridLocked(self.grid)) {
          //if the board has changed and the grid isnt locked up
          //add a new random tile 
          self.grid = Service2048.resetMergeable(Service2048.newTile(self.grid));

          //set current and or topscore
          if(self.topScore === 'No Top Score' && self.grid.score > 0) {
            self.topScore = self.grid.score;
            myStorage.setItem('topScore', self.grid.score);
          } else if(self.grid.score > self.topScore) {
            self.topScore = self.grid.score;
            myStorage.setItem('topScore', self.grid.score);
          }
          $scope.$apply();
        }
        if(!Service2048.boardChanged(self.grid, oldGrid) && !Service2048.isGridLocked(self.grid)) {
          //if the board hasnt changed and the grid isnt locked
          //make sure that all tiles are set to mergeable
          self.grid = Service2048.resetMergeable(self.grid);
          $scope.$apply();
        }
        if(Service2048.isGridLocked(self.grid)) {
          //set scope var to true to visually change the state of the app
          self.gridLocked = true;    
        }
      }
    }
  };
});

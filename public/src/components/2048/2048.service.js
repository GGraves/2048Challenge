angular.module('component.2048').factory('Service2048', function() {
  
  return {
    generateGrid: generateGrid
    //newTile: newTile 
  };

  function generateGrid(gridSize) {
    //build out grid based on gridSize
    var grid = [];
    for( var i = 0; i < gridSize; i++) {
      var row = [];
      for( var j = 0; j < gridSize; j++) {
        var tileObject = {};
        tileObject.value = '';
        row.push(tileObject);
      }
      grid.push(row);
    }
    //insert two random tiles
    //newTile(grid);
    //newTile(grid);
    return grid;
  }


  /*
  function newTile(grid) {
    
  }
  */
  
});

angular.module('component.2048').factory('Service2048', function() {
  
  return {
    generateGrid: generateGrid,
    newTile: newTile 
  };

  function generateGrid(gridSize) {
    //build out grid based on gridSize
    var grid = [];
    for(var i = 0; i < gridSize; i++) {
      var row = [];
      for(var j = 0; j < gridSize; j++) {
        var tileObject = {};
        tileObject.value = '';
        row.push(tileObject);
      }
      grid.push(row);
    }
    //insert two random tiles
    newTile(grid);
    newTile(grid);
    return grid;
  }

  function newTile(grid) {
    var openTiles = [],
        i=0,
        j=0;
    for(i = 0; i < grid.length; i++) {
      for(j = 0; j < grid.length; j++) {
        //find open tiles
        if(grid[i][j].value === '') {
          var tilePosition = {'row': i, 'column': j};
          openTiles.push(tilePosition); 
        } 
      }
    }
    //pull a random position from the openTiles 
    //and set the row and column
    var randomPosition = Math.floor((Math.random() * openTiles.length) + 1);
    var rowPosition = openTiles[randomPosition].row;
    var columnPosition = openTiles[randomPosition].column;
    for(i = 0; i < grid.length; i++) {
      for(j = 0; j < grid.length; j++) {
        if(i === rowPosition && j === columnPosition) {
          //assign tile to the # 2 or 4
          //90% chance 2, 10% chance 4
          grid[i][j].value = (Math.floor((Math.random() * 10) + 1)) <= 9 ? 2 : 4;
        }
      }
    }
    return grid;
  }
  
});

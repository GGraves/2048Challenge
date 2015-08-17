angular.module('component.2048').factory('Service2048', function() {
  
  return {
    boardChanged: boardChanged,
    generateGrid: generateGrid,
    isGridLocked: isGridLocked,
    newTile: newTile,
    playerWins: playerWins,
    updateGrid: updateGrid,
    resetMergeable: resetMergeable 
  };
  
  function boardChanged(newGrid, oldGrid) {
    //check to see if the board has Changed
    var gridLength = newGrid.board.length;
    var changed = false;
    for(var i = 0; i < gridLength; i++) {
      for(var j = 0; j < gridLength; j++) {
        if(newGrid.board[i][j].value !== oldGrid.board[i][j].value) {
          changed = true; 
        }
      }
    }
    return changed;
  }

  function generateGrid(gridSize) {
    //build out grid based on gridSize
    var grid = {};
    grid.score = 0;
    grid.board = [];
    for(var i = 0; i < gridSize; i++) {
      var row = [];
      for(var j = 0; j < gridSize; j++) {
        var tileObject = {};
        tileObject.value = '';
        tileObject.mergeable = true;
        row.push(tileObject);
      }
      grid.board.push(row);
    }
    //insert two random tiles
    newTile(grid);
    newTile(grid);
    return grid;
  }
  
  function isGridLocked(grid) {
    //check to see if the Grid is locked up
    //by checking current iterators neighbors
    var gridLength = grid.board.length;
    var locked = true;
    for(var i = 0; i < gridLength; i++) {
      for(var j = 0; j < gridLength; j++) {
        if( grid.board[i][j-1] !== undefined) {
          if(grid.board[i][j-1].value === '' || grid.board[i][j-1].value === grid.board[i][j].value) {
            locked = false; 
          }
        }
        if( grid.board[i][j+1] !== undefined) {
          if(grid.board[i][j+1].value === '' || grid.board[i][j+1].value === grid.board[i][j].value) {
            locked = false; 
          }
        }
        if( i !== 0 && grid.board[i-1][j] !== undefined) {
          if(grid.board[i-1][j].value === '' || grid.board[i-1][j].value === grid.board[i][j].value) {
            locked = false; 
          }
        }
        if( i !== gridLength-1 && grid.board[i+1][j] !== undefined) {
          if(grid.board[i+1][j].value === '' || grid.board[i+1][j].value === grid.board[i][j].value) {
            locked = false; 
          }
        }
      }
    }
    return locked;
  }
  
  function newTile(grid) {
    //add a new tile to the grid if able
    var openTiles = [],
        gridLength = grid.board.length,
        i=0,
        j=0;
    for(i = 0; i < gridLength; i++) {
      for(j = 0; j < gridLength; j++) {
        //find open tiles
        if(grid.board[i][j].value === '') {
          var tilePosition = {'row': i, 'column': j};
          openTiles.push(tilePosition); 
        } 
      }
    }
    //pull a random position from the openTiles 
    //and set the row and column
    var randomPosition = Math.floor(Math.random() * openTiles.length);
    if(openTiles.length) {
      var rowPosition = openTiles[randomPosition].row;
      var columnPosition = openTiles[randomPosition].column;
      for(i = 0; i < gridLength; i++) {
        for(j = 0; j < gridLength; j++) {
          if(i === rowPosition && j === columnPosition) {
            //assign tile to the # 2 or 4
            //90% chance 2, 10% chance 4
            grid.board[i][j].value = (Math.floor((Math.random() * 10) + 1)) <= 9 ? 2 : 4;
          }
        }
      }
    }
    return angular.copy(grid);
  }
  
  function playerWins(grid) {
    //check to see if the board is in a win state
    var gridLength = grid.board.length;
    var changed = false;
    for(var i = 0; i < gridLength; i++) {
      for(var j = 0; j < gridLength; j++) {
        if(grid.board[i][j].value === 2048) {
          changed = true; 
        }
      }
    }
    return changed;
  }
  
  function resetMergeable(grid) {
    //reset all tiles to mergeable
    var gridLength = grid.board.length;
    for(var i = 0; i < gridLength; i++) {
      for(var j = 0; j < gridLength; j++) {
        grid.board[i][j].mergeable = true;
      }
    }
    return grid;
  }

  //The Dream: combine these directional methods into one method with conditional direction logic
  //The Dream Killer: Time constraints.
  function leftShift(grid) {
    var gridLength = grid.board.length;
    for(var i = 0; i < gridLength; i++) {
      for(var j = 0; j < gridLength; j++) {
        //guard against out of bounds errors
        if(j > 0) {
          //prevent doublemerge
          if(grid.board[i][j - 1].value > 0 &&
             grid.board[i][j - 1].mergeable === true &&
             grid.board[i][j].value !== '' &&
             grid.board[i][j - 1].value !== grid.board[i][j].value) {
            grid.board[i][j - 1].mergeable = false;
          }
          //if the next tile is a number with
          //an equal value and mergeable = true
          //merge values and set mergeable to false 
          if(grid.board[i][j - 1].value > 0 && 
             grid.board[i][j - 1].mergeable === true &&
             grid.board[i][j - 1].value === grid.board[i][j].value) {
            grid.board[i][j - 1].value += grid.board[i][j].value;
            grid.score += grid.board[i][j - 1].value;
            grid.board[i][j - 1].mergeable = false;
            grid.board[i][j].value = '';
          }
          //if the next tile is empty
          //set that tile to the current value
          if(grid.board[i][j - 1].value === '') {
            grid.board[i][j - 1].value = grid.board[i][j].value;
            grid.board[i][j].value = '';
          }
        }
      } 
    }
    return grid;
  }

  function rightShift(grid) {
    var gridLength = grid.board.length-1;
    for(var i = gridLength; i >= 0; i--) {
      for(var j = gridLength; j >= 0; j--) {
        //guard against out of bounds errors
        if(j < gridLength) {
          //prevent doublemerge
          if(grid.board[i][j + 1].value > 0 &&
             grid.board[i][j + 1].mergeable === true &&
             grid.board[i][j].value !== '' &&
             grid.board[i][j + 1].value !== grid.board[i][j].value) {
            grid.board[i][j + 1].mergeable = false;
          }
          //if the next tile is a number with
          //an equal value and mergeable = true
          //merge values and set mergeable to false 
          if(grid.board[i][j + 1].value > 0 && 
             grid.board[i][j + 1].mergeable === true &&
             grid.board[i][j + 1].value === grid.board[i][j].value) {
            grid.board[i][j + 1].value += grid.board[i][j].value;
            grid.score += grid.board[i][j + 1].value;
            grid.board[i][j + 1].mergeable = false;
            grid.board[i][j].value = '';
          }
          //if the next tile is empty
          //set that tile to the current value
          if(grid.board[i][j + 1].value === '') {
            grid.board[i][j + 1].value = grid.board[i][j].value;
            grid.board[i][j].value = '';
          }
        }
      } 
    }
    return grid;
  }

  function upShift(grid) {
    var gridLength = grid.board.length;
    for(var i = 0; i < gridLength; i++) {
      for(var j = 0; j < gridLength; j++) {
        //guard against out of bounds errors
        if(i > 0) {
          //prevent doublemerge
          if(grid.board[i - 1][j].value > 0 &&
             grid.board[i - 1][j].mergeable === true &&
             grid.board[i][j].value !== '' &&
             grid.board[i - 1][j].value !== grid.board[i][j].value) {
            grid.board[i - 1][j].mergeable = false;
          }
          //if the next tile is a number with
          //an equal value and mergeable = true
          //merge values and set mergeable to false 
          if(grid.board[i - 1][j].value > 0 && 
             grid.board[i - 1][j].mergeable === true &&
             grid.board[i - 1][j].value === grid.board[i][j].value) {
            grid.board[i - 1][j].value += grid.board[i][j].value;
            grid.score += grid.board[i - 1][j].value;
            grid.board[i - 1][j].mergeable = false;
            grid.board[i][j].value = '';
          }
          //if the next tile is empty
          //set that tile to the current value
          if(grid.board[i - 1][j].value === '') {
            grid.board[i - 1][j].value = grid.board[i][j].value;
            grid.board[i][j].value = '';
          }
        }
      } 
    }
    return grid;
  }

  function downShift(grid) {
    var gridLength = grid.board.length-1;
    for(var i = gridLength; i >= 0; i--) {
      for(var j = gridLength; j >= 0; j--) {
        //guard against out of bounds errors
        if(i < gridLength) {
          //prevent doublemerge
          if(grid.board[i + 1][j].value > 0 &&
             grid.board[i + 1][j].mergeable === true &&
             grid.board[i][j].value !== '' &&
             grid.board[i + 1][j].value !== grid.board[i][j].value) {
            grid.board[i + 1][j].mergeable = false;
          }
          //if the next tile is a number with
          //an equal value and mergeable = true
          //merge values and set mergeable to false 
          if(grid.board[i + 1][j].value > 0 && 
             grid.board[i + 1][j].mergeable === true &&
             grid.board[i + 1][j].value === grid.board[i][j].value) {
            grid.board[i + 1][j].value += grid.board[i][j].value;
            grid.score += grid.board[i + 1][j].value;
            grid.board[i + 1][j].mergeable = false;
            grid.board[i][j].value = '';
          }
          //if the next tile is empty
          //set that tile to the current value
          if(grid.board[i + 1][j].value === '') {
            grid.board[i + 1][j].value = grid.board[i][j].value;
            grid.board[i][j].value = '';
          }
        }
      } 
    }
    return grid;
  }
 
  function updateGrid(grid, key) {
    //updateGrid driver
    var updatedGrid;
    
    if(key === 37)      { updatedGrid = leftShift(angular.copy(grid));}    
    else if(key === 38) { updatedGrid = upShift(angular.copy(grid));}    
    else if(key === 39) { updatedGrid = rightShift(angular.copy(grid));}    
    else                { updatedGrid = downShift(angular.copy(grid));}    
    
    return updatedGrid;
  }

});

// Generated by CoffeeScript 1.6.3
(function() {
  $(function() {
    var WinningTileValue, arrayEqual, boardEqual, boardIsFull, buildBoard, collapseCells, gameLost, gameWon, generateTile, getColumn, getRow, getTileValue, mergeCells, move, moveIsValid, noValidMoves, ppArray, randomCellIndices, randomInt, setColumn, setRow, showBoard, showValue,
      _this = this;
    WinningTileValue = 2048;
    ppArray = function(a) {
      var row, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        row = a[_i];
        _results.push(console.log(row));
      }
      return _results;
    };
    buildBoard = function() {
      return [0, 1, 2, 3].map(function() {
        return [0, 1, 2, 3].map(function() {
          return 0;
        });
      });
    };
    getRow = function(rowNumber, board) {
      var b, r, _ref;
      _ref = [rowNumber, board], r = _ref[0], b = _ref[1];
      return [b[r][0], b[r][1], b[r][2], b[r][3]];
    };
    getColumn = function(columnNumber, board) {
      var column, row, _i;
      column = [];
      for (row = _i = 0; _i <= 3; row = ++_i) {
        column[row] = board[row][columnNumber];
      }
      return column;
    };
    setRow = function(row, rowNumber, board) {
      return board[rowNumber] = row;
    };
    setColumn = function(column, columnNumber, board) {
      var i, _i;
      for (i = _i = 0; _i <= 3; i = ++_i) {
        board[i][columnNumber] = column[i];
      }
      return getColumn(columnNumber, board);
    };
    arrayEqual = function(a, b) {
      var i, val, _i, _len;
      for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
        val = a[i];
        if (val !== b[i]) {
          return false;
        }
      }
      return true;
    };
    boardEqual = function(a, b) {
      var i, row, _i, _len;
      for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
        row = a[i];
        if (!arrayEqual(row, b[i])) {
          return false;
        }
      }
      return true;
    };
    moveIsValid = function(a, b) {
      return !boardEqual(a, b);
    };
    noValidMoves = function(board) {
      var direction, directions, newBoard, _i, _len;
      directions = ['up', 'down', 'left', 'right'];
      for (_i = 0, _len = directions.length; _i < _len; _i++) {
        direction = directions[_i];
        newBoard = move(board, direction);
        if (moveIsValid(newBoard, board)) {
          return false;
        }
      }
      return true;
    };
    getTileValue = function() {
      var val, values;
      values = [2, 2, 2, 4];
      return val = values[Math.floor(Math.random() * values.length)];
    };
    randomInt = function(x) {
      return Math.floor(Math.random() * x);
    };
    randomCellIndices = function() {
      return [randomInt(4), randomInt(4)];
    };
    boardIsFull = function(board) {
      var row, _i, _len;
      for (_i = 0, _len = board.length; _i < _len; _i++) {
        row = board[_i];
        if ($.inArray(0, row) > -1) {
          return false;
        }
      }
      return true;
    };
    generateTile = function(board) {
      var column, row, value, _ref;
      value = getTileValue();
      _ref = randomCellIndices(), row = _ref[0], column = _ref[1];
      if (board[row][column] === 0) {
        return board[row][column] = value;
      } else {
        if (!boardIsFull(board)) {
          return generateTile(board);
        }
      }
    };
    move = function(board, direction) {
      var column, i, newBoard, row, _i;
      newBoard = buildBoard();
      for (i = _i = 0; _i <= 3; i = ++_i) {
        switch (direction) {
          case 'right':
          case 'left':
            row = mergeCells(getRow(i, board), direction);
            row = collapseCells(row, direction);
            setRow(row, i, newBoard);
            break;
          case 'up':
          case 'down':
            column = mergeCells(getColumn(i, board), direction);
            column = collapseCells(column, direction);
            setColumn(column, i, newBoard);
        }
      }
      return newBoard;
    };
    mergeCells = function(cells, direction) {
      var merge;
      merge = function(cells) {
        var i, j, m, n, _i, _j, _ref, _ref1;
        for (i = _i = 3; _i > 0; i = --_i) {
          for (j = _j = _ref = i - 1; _ref <= 0 ? _j <= 0 : _j >= 0; j = _ref <= 0 ? ++_j : --_j) {
            _ref1 = [cells[i], cells[j]], n = _ref1[0], m = _ref1[1];
            if (n === 0) {
              break;
            } else if (n === m) {
              cells[i] *= 2;
              cells[j] = 0;
              break;
            } else if (m !== 0) {
              break;
            }
          }
        }
        return cells;
      };
      switch (direction) {
        case 'right':
        case 'down':
          cells = merge(cells);
          break;
        case 'left':
        case 'up':
          cells = merge(cells.reverse()).reverse();
      }
      return cells;
    };
    collapseCells = function(cells, direction) {
      var i, padding, _i;
      cells = cells.filter(function(x) {
        return x !== 0;
      });
      padding = 4 - cells.length;
      for (i = _i = 0; 0 <= padding ? _i < padding : _i > padding; i = 0 <= padding ? ++_i : --_i) {
        switch (direction) {
          case 'right':
          case 'down':
            cells.unshift(0);
            break;
          case 'left':
          case 'up':
            cells.push(0);
        }
      }
      return cells;
    };
    gameWon = function(board) {
      var cell, row, _i, _j, _len, _len1;
      for (_i = 0, _len = board.length; _i < _len; _i++) {
        row = board[_i];
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          cell = row[_j];
          if (cell >= WinningTileValue) {
            return true;
          }
        }
      }
      return false;
    };
    gameLost = function(board) {
      return boardIsFull(board) && noValidMoves(board);
    };
    showValue = function(value) {
      if (value === 0) {
        return "";
      } else {
        return value;
      }
    };
    showBoard = function(board) {
      var c, r, _i, _results;
      _results = [];
      for (r = _i = 0; _i <= 3; r = ++_i) {
        _results.push((function() {
          var _j, _results1;
          _results1 = [];
          for (c = _j = 0; _j <= 3; c = ++_j) {
            _results1.push($(".r" + r + ".c" + c + " > div").html(showValue(board[r][c])));
          }
          return _results1;
        })());
      }
      return _results;
    };
    $('body').keydown(function(e) {
      var direction, key, keys, newBoard;
      key = e.which;
      keys = [37, 38, 39, 40];
      if ($.inArray(key, keys) > -1) {
        e.preventDefault();
      }
      direction = (function() {
        switch (key) {
          case 37:
            return 'left';
          case 38:
            return 'up';
          case 39:
            return 'right';
          case 40:
            return 'down';
        }
      })();
      newBoard = move(_this.board, direction);
      if (moveIsValid(newBoard, _this.board)) {
        _this.board = newBoard;
        generateTile(_this.board);
        showBoard(_this.board);
        if (gameLost(_this.board)) {
          return console.log("Game Over!");
        } else if (gameWon(_this.board)) {
          return console.log("Congrats!");
        }
      }
    });
    this.board = buildBoard();
    generateTile(this.board);
    generateTile(this.board);
    return showBoard(this.board);
  });

}).call(this);

/*
//@ sourceMappingURL=main.map
*/

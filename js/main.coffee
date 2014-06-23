$ ->

  # example
  # =======
  # board = []
  # for x in [0..3]
  #   board[x] = []
  #   for y in [0..3]
  #     board[x][y] = 0
  # ppArray board

  ppArray = (array) ->
    for row in array
      console.log row

  @board = [0..3].map -> [0..3].map -> 0

  ppArray(@board)

  generateTile = (board) ->

  randomIndex = (x) ->
    Math.floor(Math.random() * x)

  randomValue = ->
    values = [2, 2, 2, 4]
    val = values[randomIndex(values.length)]
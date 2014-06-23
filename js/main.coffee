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

  # random index between 0 to (x-1)
  randomIndex = (x) ->
    Math.floor(Math.random() * x)

  getRandomCellIndices = ->
    [randomIndex(4), randomIndex(4)]

  randomValue = ->
    values = [2, 2, 2, 4]
    values[randomIndex(values.length)]

  boardIsFull = (board) ->
    for row in board
      for cell in row
        if cell == 0
          return false
    true

  generateTile = (board) ->
    unless boardIsFull(board)
      # get random value for tile
      val = randomValue()
      # get random position
      [x, y] = getRandomCellIndices()
      # only if the cell is zero
      if board[x][y] == 0
        board[x][y] = val
      else
        # how about when board is full?
        generateTile(board)

  $('body').keydown (e) ->
    key = e.which
    keys = [37..40]

    if $.inArray(key, keys) > -1
      e.preventDefault()

    switch key
      when 37
        console.log 'left'
      when 38
        console.log 'up'
      when 39
        console.log 'right'
      when 40
        console.log 'down'

  generateTile(@board)
  generateTile(@board)
  ppArray(@board)








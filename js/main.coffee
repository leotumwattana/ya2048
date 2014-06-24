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

  getRow = (rowNumber, board) ->
    board[rowNumber]

  getColumn = (columnNumber, board) ->
    column = []
    for row in [0..3]
      column.push board[row][columnNumber]
    column

  getColumnV2 = (c, b) ->
    [b[0][c], b[1][c], b[2][c], b[3][c]]

  getColumnV3 = (c, b) ->
    col = []
    for r, i in b
      col[i] = r[c]
    col

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

      val = randomValue()
      [x, y] = getRandomCellIndices()

      if board[x][y] == 0
        board[x][y] = val
      else
        generateTile(board)

  mergeCells = (cells, direction) ->

    merge = (cells) ->
      for i in [3...0]
        for j in [i-1..0]
          [n, m] = [cells[i], cells[j]]

          if n == m
            cells[i] *= 2
            cells[j] = 0
            break
          else if n == 0 then break
          else break

      cells

    switch direction
      when 'right', 'down'
        cells = merge cells
      when 'left', 'up'
        cells = merge(cells.reverse()).reverse()

    cells

  collapseCells = (cells, direction) ->

    cells = cells.filter (x) -> x != 0
    padding = 4 - cells.length

    for i in [1..padding]
      switch direction
        when 'right', 'down' then cells.unshift 0
        when 'left', 'up' then cells.push 0
    cells

  console.log "mergeCells: " + collapseCells(mergeCells([2,2,2,2], 'left'), 'left')
  console.log "mergeCells: " + collapseCells(mergeCells([2,2,2,2], 'right'), 'right')
  console.log "mergeCells: " + collapseCells(mergeCells([2,2,4,2], 'left'), 'left')
  console.log "mergeCells: " + collapseCells(mergeCells([2,2,4,2], 'right'), 'right')

  console.log "collapseCells: " + collapseCells([0,2,0,4], 'left')
  console.log "collapseCells: " + collapseCells([0,2,0,4], 'right')

  $('body').keydown (e) ->
    key = e.which
    keys = [37..40]

    if ($.inArray(key, keys) > -1)
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








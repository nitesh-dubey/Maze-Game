import _ from "lodash";
export function generateMaze(boardWidth, boardHeight) {
  let bHeight = Number(boardHeight);
  let bWidth = Number(boardWidth);

  let maze = [];
  let vis = [];
  let neigh = [
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];
  let randomRowIndices = _.shuffle([...Array(bHeight).keys()]);
  let randomColIndices = _.shuffle([...Array(bWidth).keys()]);

  function getRandomUnvisitedNeighbour(currCell) {
    let x = currCell.x,
      y = currCell.y;
    let unvisNeigh = [];

    for (let p of neigh) {
      let nx = x + p.x,
        ny = y + p.y;
      if (nx < 0 || ny < 0 || nx >= bHeight || ny >= bWidth) continue;
      if (!vis[nx][ny]) {
        unvisNeigh.push({ x: nx, y: ny });
      }
    }
    if (unvisNeigh.length === 0) return null;
    let randomNeigh = unvisNeigh[Math.floor(Math.random() * unvisNeigh.length)];
    return maze[randomNeigh.x][randomNeigh.y];
  }

  function getVisitedNeighbour(currCell) {
    let x = currCell.x,
      y = currCell.y;
    let visNeigh = [];

    for (let p of neigh) {
      let nx = x + p.x,
        ny = y + p.y;
      if (nx < 0 || ny < 0 || nx >= bHeight || ny >= bWidth) continue;
      if (vis[nx][ny]) visNeigh.push({ x: nx, y: ny });
    }
    if (visNeigh.length === 0) return null;
    let randomVisNeigh = visNeigh[Math.floor(Math.random() * visNeigh.length)];
    return maze[randomVisNeigh.x][randomVisNeigh.y];
  }

  function hunt() {
    for (let row of randomRowIndices) {
      for (let col of randomColIndices) {
        if (!vis[row][col]) {
          let currCell = maze[row][col];
          let nextCell = getVisitedNeighbour(currCell);

          if (nextCell) {
            if (nextCell.x === currCell.x - 1 && nextCell.y === currCell.y) {
              maze[currCell.x][currCell.y].upBorder = false;
              maze[nextCell.x][nextCell.y].downBorder = false;
            } else if (
              nextCell.x === currCell.x + 1 &&
              nextCell.y === currCell.y
            ) {
              maze[currCell.x][currCell.y].downBorder = false;
              maze[nextCell.x][nextCell.y].upBorder = false;
            } else if (
              nextCell.x === currCell.x &&
              nextCell.y === currCell.y - 1
            ) {
              maze[currCell.x][currCell.y].leftBorder = false;
              maze[nextCell.x][nextCell.y].rightBorder = false;
            } else {
              maze[currCell.x][currCell.y].rightBorder = false;
              maze[nextCell.x][nextCell.y].leftBorder = false;
            }

            vis[currCell.x][currCell.y] = true;
            vis[nextCell.x][nextCell.y] = true;

            return currCell;
          }
        }
      }
    }
    return null;
  }

  function kill(currCell) {
    while (currCell) {
      let nextCell = getRandomUnvisitedNeighbour(currCell);

      if (nextCell) {
        if (nextCell.x === currCell.x - 1 && nextCell.y === currCell.y) {
          maze[currCell.x][currCell.y].upBorder = false;
          maze[nextCell.x][nextCell.y].downBorder = false;
        } else if (nextCell.x === currCell.x + 1 && nextCell.y === currCell.y) {
          maze[currCell.x][currCell.y].downBorder = false;
          maze[nextCell.x][nextCell.y].upBorder = false;
        } else if (nextCell.x === currCell.x && nextCell.y === currCell.y - 1) {
          maze[currCell.x][currCell.y].leftBorder = false;
          maze[nextCell.x][nextCell.y].rightBorder = false;
        } else {
          maze[currCell.x][currCell.y].rightBorder = false;
          maze[nextCell.x][nextCell.y].leftBorder = false;
        }

        vis[currCell.x][currCell.y] = true;
        vis[nextCell.x][nextCell.y] = true;
      }
      currCell = nextCell;
    }
  }

  function huntAndKill() {
    let randomX = Math.floor(Math.random() * bHeight);
    let randomY = Math.floor(Math.random() * bWidth);

    let currCell = maze[randomX][randomY];

    while (currCell) {
      kill(currCell);
      currCell = hunt();
    }
  }

  for (let i = 0; i < bHeight; i++) {
    let row = [];
    let rowVis = [];
    for (let j = 0; j < bWidth; j++) {
      let cell = {
        leftBorder: true,
        rightBorder: true,
        upBorder: true,
        downBorder: true,
        x: i,
        y: j,
      };
      row.push(cell);
      rowVis.push(false);
    }
    maze.push(row);
    vis.push(rowVis);
  }

  huntAndKill();

  return maze;
}

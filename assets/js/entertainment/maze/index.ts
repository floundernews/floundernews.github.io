const DEFAULT_ROWS = 15;
const DEFAULT_COLS = 15;
let cols: number;
let rows: number;

let boxSize: number;
let c: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let moveCharacter = (delta_x: number, delta_y: number) => {};
let showSolution = () => {};
let flagImage: HTMLImageElement;
let turtleImage: HTMLImageElement;
interface Wall {
  u: number;
  v: number;
  type: "horizontal" | "vertical";
}

function coordToId(x: number, y: number): number {
  return x * rows + y;
}

function idToCoord(id: number): [number, number] {
  return [Math.floor(id / rows), id % rows];
}

function idToGridCoord(id: number): [number, number] {
  let [x, y] = idToCoord(id);
  return [(x + 1.5) * boxSize, (y + 1.5) * boxSize];
}

function drawGridLine(x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo((x1 + 1) * boxSize, (y1 + 1) * boxSize);
  ctx.lineTo((x2 + 1) * boxSize, (y2 + 1) * boxSize);
  ctx.stroke();
}

function getInputNumOrDefault(id: string, defaultVal: number) {
  let s = (document.getElementById(id) as HTMLInputElement).value;
  let i = parseInt(s);
  if (i != NaN && i >= 1) {
    return i;
  } else {
    return defaultVal;
  }
}
function generateMaze() {
  let currentPositionId = 0;
  let adj: number[][] = [];
  let keyboardDisabled = false;

  rows = getInputNumOrDefault("maze-rows", 15);
  cols = getInputNumOrDefault("maze-cols", 15);
  boxSize = c.width / (cols + 2);
  c.height = boxSize * (rows + 2);

  let unionFind: number[] = [];
  let prev: number[] = [];
  for (let i = 0; i < cols * rows; ++i) {
    unionFind[i] = i;
    adj[i] = [];
  }
  let getParent: (u: number) => number = (u) => {
    if (unionFind[u] == u) {
      return u;
    } else {
      return (unionFind[u] = getParent(unionFind[u]));
    }
  };
  let joinSets = (u: number, v: number) => {
    u = getParent(u);
    v = getParent(v);
    unionFind[v] = u;
  };

  let walls: Wall[] = [];
  for (let x = 0; x < cols - 1; ++x) {
    for (let y = 0; y < rows; ++y) {
      walls.push({
        u: coordToId(x, y),
        v: coordToId(x + 1, y),
        type: "vertical",
      });
    }
  }
  for (let x = 0; x < cols; ++x) {
    for (let y = 0; y < rows - 1; ++y) {
      walls.push({
        u: coordToId(x, y),
        v: coordToId(x, y + 1),
        type: "horizontal",
      });
    }
  }

  for (let i = walls.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [walls[i], walls[j]] = [walls[j], walls[i]];
  }

  let mazeWalls: Wall[] = [];
  let startCell = coordToId(0, 0);
  let endCell = coordToId(cols - 1, rows - 1);

  for (let wall of walls) {
    if (getParent(wall.u) == getParent(wall.v)) {
      mazeWalls.push(wall);
    } else {
      joinSets(wall.u, wall.v);
      adj[wall.u].push(wall.v);
      adj[wall.v].push(wall.u);
    }
  }

  let dfs = (u: number, parent: number) => {
    prev[u] = parent;
    for (let v of adj[u]) {
      if (v != parent) {
        dfs(v, u);
      }
    }
  };
  dfs(startCell, startCell);
  let path: number[] = [];
  let i = endCell;
  while (i != startCell) {
    path.push(i);
    i = prev[i];
  }
  path.push(startCell);

  let indexCut = Math.floor(path.length / 2);
  let uCutWall = path[indexCut];
  let vCutWall = path[indexCut + 1];
  adj[uCutWall].splice(adj[uCutWall].indexOf(vCutWall), 1);
  adj[vCutWall].splice(adj[vCutWall].indexOf(uCutWall), 1);
  let [ux, uy] = idToCoord(uCutWall);
  let [vx, vy] = idToCoord(vCutWall);

  function drawMaze(drawImpossibleWall: boolean) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = boxSize / 20;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.moveTo(boxSize * 2, boxSize);
    ctx.lineTo(boxSize * (cols + 1), boxSize);
    ctx.lineTo(boxSize * (cols + 1), boxSize * (rows + 1));
    ctx.moveTo(boxSize * cols, boxSize * (rows + 1));
    ctx.lineTo(boxSize, boxSize * (rows + 1));
    ctx.lineTo(boxSize, boxSize);
    ctx.stroke();

    drawSeaweed();

    ctx.font = `${boxSize / 3}px Arial`;
    ctx.fillStyle = "white";
    ctx.fillText("START", boxSize, boxSize * 0.8);
    ctx.fillText("END", boxSize * (cols + 0.1), boxSize * (rows + 1.5));

    if (drawImpossibleWall) {
      let wallLine: [number, number, number, number] = [0, 0, 0, 0];
      if (ux == vx) {
        wallLine = [ux, (uy + vy + 1) / 2, ux + 1, (uy + vy + 1) / 2];
      } else if (uy == vy) {
        wallLine = [(ux + vx + 1) / 2, uy, (ux + vx + 1) / 2, uy + 1];
      }
      drawGridLine(...wallLine);
    }

    for (let wall of mazeWalls) {
      let [ux, uy] = idToCoord(wall.u);
      let [vx, vy] = idToCoord(wall.v);
      if (wall.type == "horizontal") {
        drawGridLine(ux, (uy + vy + 1) / 2, ux + 1, (uy + vy + 1) / 2);
      } else {
        drawGridLine((ux + vx + 1) / 2, uy, (ux + vx + 1) / 2, uy + 1);
      }
    }
    drawCharacter(currentPositionId);
  }
  drawMaze(true);

  moveCharacter = (delta_x: number, delta_y: number) => {
    if (keyboardDisabled) {
      return;
    }
    let [current_x, current_y] = idToCoord(currentPositionId);
    let [new_x, new_y] = [current_x + delta_x, current_y + delta_y];
    let newPositionId = coordToId(new_x, new_y);
    if (adj[currentPositionId].includes(newPositionId)) {
      eraseCharacter(currentPositionId);
      currentPositionId = newPositionId;
      drawCharacter(currentPositionId);
    }
  };

  showSolution = () => {
    keyboardDisabled = true;
    drawMaze(false);
    ctx.strokeStyle = "lightblue";
    ctx.beginPath();
    ctx.lineWidth = boxSize / 6;
    ctx.moveTo(...idToGridCoord(path[0]));
    for (let i = 1; i < path.length; ++i) {
      ctx.lineTo(...idToGridCoord(path[i]));
    }
    ctx.stroke();
  };
  document.getElementById("show-solution")!.onclick = showSolution;
}

function drawBoxImage(image: HTMLImageElement, x: number, y: number) {
  let [imgWidth, imgHeight] =
    image.width > image.height
      ? [boxSize * 0.8, (boxSize * 0.8 * image.height) / image.width]
      : [(boxSize * 0.8 * image.width) / image.height, boxSize * 0.8];

  ctx.drawImage(
    image,
    boxSize * x + (boxSize - imgWidth) / 2,
    boxSize * y + (boxSize - imgHeight) / 2,
    imgWidth,
    imgHeight
  );
}

function drawSeaweed() {
  drawBoxImage(flagImage, cols, rows);
}

function drawCharacter(positionId: number) {
  let [current_x, current_y] = idToCoord(positionId);
  drawBoxImage(turtleImage, current_x + 1, current_y + 1);
}

function eraseCharacter(positionId: number) {
  let [current_x, current_y] = idToCoord(positionId);
  ctx.clearRect(
    (current_x + 1.1) * boxSize,
    (current_y + 1.1) * boxSize,
    boxSize * 0.8,
    boxSize * 0.8
  );
}

window.onload = () => {
  let dpi = 5;
  c = document.getElementById("maze-canvas") as HTMLCanvasElement;
  c.width *= dpi;
  c.height *= dpi;
  ctx = c.getContext("2d")!;
  ctx.scale(dpi, dpi);
  (document.getElementById("maze-rows") as HTMLInputElement).value =
    DEFAULT_ROWS.toString();
  (document.getElementById("maze-cols") as HTMLInputElement).value =
    DEFAULT_COLS.toString();

  flagImage = document.getElementById("flag-img") as HTMLImageElement;
  turtleImage = document.getElementById("turtle-img") as HTMLImageElement;
  generateMaze();
};

window.onkeydown = (e) => {
  if (e.key == "ArrowLeft" || e.key == "a") {
    moveCharacter(-1, 0);
  } else if (e.key == "ArrowRight" || e.key == "d") {
    moveCharacter(1, 0);
  } else if (e.key == "ArrowUp" || e.key == "w") {
    moveCharacter(0, -1);
  } else if (e.key == "ArrowDown" || e.key == "s") {
    moveCharacter(0, 1);
  } else if (e.key == "g") {
    generateMaze();
  } else if (e.key == "l") {
    showSolution();
  } else if (e.key == "h") {
    hideControls();
  } else {
    return;
  }
  e.preventDefault();
  document.getElementById("maze-container")!.scrollIntoView();
};

document.getElementById("generate-maze")!.onclick = generateMaze;

function hideControls() {
  let mazeControls = document.getElementById("maze-controls")!;
  if (mazeControls.style.display == "none") {
    mazeControls.style.display = "";
  } else {
    mazeControls.style.display = "none";
  }
}

document.getElementById("hide-maze-controls")!.onclick = hideControls;

"use strict";
const DEFAULT_ROWS = 15;
const DEFAULT_COLS = 15;
let cols;
let rows;
let boxSize;
let c;
let ctx;
let moveCharacter = (delta_x, delta_y) => { };
let showSolution = () => { };
let flagImage;
let turtleImage;
function coordToId(x, y) {
    return x * rows + y;
}
function idToCoord(id) {
    return [Math.floor(id / rows), id % rows];
}
function idToGridCoord(id) {
    let [x, y] = idToCoord(id);
    return [(x + 1.5) * boxSize, (y + 1.5) * boxSize];
}
function drawGridLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo((x1 + 1) * boxSize, (y1 + 1) * boxSize);
    ctx.lineTo((x2 + 1) * boxSize, (y2 + 1) * boxSize);
    ctx.stroke();
}
function getInputNumOrNull(id) {
    let s = document.getElementById(id);
    if (s.reportValidity()) {
        return parseInt(s.value);
    }
    else {
        return null;
    }
}
function generateMaze() {
    let currentPositionId = 0;
    let adj = [];
    let keyboardDisabled = false;
    let maybe_rows = getInputNumOrNull("maze-rows");
    let maybe_cols = getInputNumOrNull("maze-cols");
    if (maybe_rows != null && maybe_cols != null) {
        rows = maybe_rows;
        cols = maybe_cols;
    }
    else {
        return;
    }
    boxSize = c.width / (cols + 2);
    c.height = boxSize * (rows + 2);
    let unionFind = [];
    let prev = [];
    for (let i = 0; i < cols * rows; ++i) {
        unionFind[i] = i;
        adj[i] = [];
    }
    let getParent = (u) => {
        if (unionFind[u] == u) {
            return u;
        }
        else {
            return (unionFind[u] = getParent(unionFind[u]));
        }
    };
    let joinSets = (u, v) => {
        u = getParent(u);
        v = getParent(v);
        unionFind[v] = u;
    };
    let walls = [];
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
    let mazeWalls = [];
    let startCell = coordToId(0, 0);
    let endCell = coordToId(cols - 1, rows - 1);
    for (let wall of walls) {
        if (getParent(wall.u) == getParent(wall.v)) {
            mazeWalls.push(wall);
        }
        else {
            joinSets(wall.u, wall.v);
            adj[wall.u].push(wall.v);
            adj[wall.v].push(wall.u);
        }
    }
    let dfs = (u, parent) => {
        prev[u] = parent;
        for (let v of adj[u]) {
            if (v != parent) {
                dfs(v, u);
            }
        }
    };
    dfs(startCell, startCell);
    let path = [];
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
    function drawMaze(drawImpossibleWall) {
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
            let wallLine = [0, 0, 0, 0];
            if (ux == vx) {
                wallLine = [ux, (uy + vy + 1) / 2, ux + 1, (uy + vy + 1) / 2];
            }
            else if (uy == vy) {
                wallLine = [(ux + vx + 1) / 2, uy, (ux + vx + 1) / 2, uy + 1];
            }
            drawGridLine(...wallLine);
        }
        for (let wall of mazeWalls) {
            let [ux, uy] = idToCoord(wall.u);
            let [vx, vy] = idToCoord(wall.v);
            if (wall.type == "horizontal") {
                drawGridLine(ux, (uy + vy + 1) / 2, ux + 1, (uy + vy + 1) / 2);
            }
            else {
                drawGridLine((ux + vx + 1) / 2, uy, (ux + vx + 1) / 2, uy + 1);
            }
        }
        drawCharacter(currentPositionId);
    }
    drawMaze(true);
    moveCharacter = (delta_x, delta_y) => {
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
    document.getElementById("show-solution").onclick = showSolution;
}
function drawBoxImage(image, x, y) {
    let [imgWidth, imgHeight] = image.width > image.height
        ? [boxSize * 0.8, (boxSize * 0.8 * image.height) / image.width]
        : [(boxSize * 0.8 * image.width) / image.height, boxSize * 0.8];
    ctx.drawImage(image, boxSize * x + (boxSize - imgWidth) / 2, boxSize * y + (boxSize - imgHeight) / 2, imgWidth, imgHeight);
}
function drawSeaweed() {
    drawBoxImage(flagImage, cols, rows);
}
function drawCharacter(positionId) {
    let [current_x, current_y] = idToCoord(positionId);
    drawBoxImage(turtleImage, current_x + 1, current_y + 1);
}
function eraseCharacter(positionId) {
    let [current_x, current_y] = idToCoord(positionId);
    ctx.clearRect((current_x + 1.1) * boxSize, (current_y + 1.1) * boxSize, boxSize * 0.8, boxSize * 0.8);
}
window.onload = () => {
    let dpi = 5;
    c = document.getElementById("maze-canvas");
    c.width *= dpi;
    c.height *= dpi;
    ctx = c.getContext("2d");
    ctx.scale(dpi, dpi);
    document.getElementById("maze-rows").value =
        DEFAULT_ROWS.toString();
    document.getElementById("maze-cols").value =
        DEFAULT_COLS.toString();
    flagImage = document.getElementById("flag-img");
    turtleImage = document.getElementById("turtle-img");
    generateMaze();
};
window.onkeydown = (e) => {
    if (e.key == "ArrowLeft" || e.key == "a") {
        moveCharacter(-1, 0);
    }
    else if (e.key == "ArrowRight" || e.key == "d") {
        moveCharacter(1, 0);
    }
    else if (e.key == "ArrowUp" || e.key == "w") {
        moveCharacter(0, -1);
    }
    else if (e.key == "ArrowDown" || e.key == "s") {
        moveCharacter(0, 1);
    }
    else if (e.key == "g" || e.key == "Enter") {
        generateMaze();
    }
    else if (e.key == "l") {
        showSolution();
    }
    else if (e.key == "h") {
        hideControls();
    }
    else {
        return;
    }
    e.preventDefault();
    document.getElementById("maze-container").scrollIntoView();
};
document.getElementById("generate-maze").onclick = generateMaze;
function hideControls() {
    let mazeControls = document.getElementById("maze-controls");
    if (mazeControls.style.display == "none") {
        mazeControls.style.display = "";
    }
    else {
        mazeControls.style.display = "none";
    }
}
document.getElementById("hide-maze-controls").onclick = hideControls;

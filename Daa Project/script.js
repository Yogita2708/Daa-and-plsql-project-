const knightMoves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
];

const boardSize = 8;

function createBoard() {
    const board = document.getElementById('chessboard');
    board.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if ((row + col) % 2 === 1) {
                cell.classList.add('black');
            }
            cell.id = `${row},${col}`;
            cell.innerText = '';
            board.appendChild(cell);
        }
    }
}

function isValid(x, y) {
    return x >= 0 && y >= 0 && x < boardSize && y < boardSize;
}

function findKnightMovesBFS() {
    findKnightMoves('BFS');
}

function findKnightMovesDFS() {
    findKnightMoves('DFS');
}

function findKnightMoves(algorithm) {
    createBoard();
    const start = document.getElementById('start').value.split(',').map(Number);
    const end = document.getElementById('end').value.split(',').map(Number);

    if (!isValid(start[0], start[1]) || !isValid(end[0], end[1])) {
        alert('Invalid start or end position');
        return;
    }

    const queue = [[...start, 0, [[...start]]]];
    const visited = new Set([`${start[0]},${start[1]}`]);
    let shortestPath = null;
    let shortestDist = Infinity;

    while (queue.length > 0) {
        const [x, y, dist, path] = algorithm === 'BFS' ? queue.shift() : queue.pop();

        if (x === end[0] && y === end[1]) {
            if (dist < shortestDist) {
                shortestDist = dist;
                shortestPath = path;
            }
            highlightPath(path, 'yellow');
            continue;
        }

        for (const [dx, dy] of knightMoves) {
            const newX = x + dx;
            const newY = y + dy;

            if (isValid(newX, newY) && !visited.has(`${newX},${newY}`)) {
                queue.push([newX, newY, dist + 1, [...path, [newX, newY]]]);
                visited.add(`${newX},${newY}`);
            }
        }
    }

    if (shortestPath) {
        highlightPath(shortestPath, 'green');
        alert(`Minimum moves: ${shortestDist}`);
    } else {
        alert('No valid path found');
    }
}

function highlightPath(path, color) {
    path.forEach(([x, y], index) => {
        const cell = document.getElementById(`${x},${y}`);
        cell.classList.add('highlight');
        cell.style.backgroundColor = color;
        if (index === 0) {
            cell.innerText = 'S';
        } else if (index === path.length - 1) {
            cell.innerText = 'E';
        } else {
            cell.innerText = index;
        }
    });
}

createBoard();

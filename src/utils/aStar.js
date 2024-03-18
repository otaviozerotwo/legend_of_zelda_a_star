function init(matrizMapa) {
    for (let x = 0; x < matrizMapa.length; x++) {
        for (let y = 0; y < matrizMapa[x].length; y++) {
            matrizMapa[x][y] = {
                f: 0,
                g: 0,
                h: 0,
                debug: "",
                parent: null,
                custo: matrizMapa[x][y]
            };
        }
    }
}

function aStar(matrizMapa, startX, startY, endX, endY) {
    init(matrizMapa);

    const start = matrizMapa[startX][startY];
    const end = matrizMapa[endX][endY];

    const openList = [];
    const closedList = [];
    openList.push(start);

    while (openList.length > 0) {
        const lowInd = openList.reduce((minInd, currentNode, ind) => {
            return currentNode.f < openList[minInd].f ? ind : minInd;
        }, 0);
        const currentNode = openList[lowInd];

        if (currentNode === end) {
            let curr = currentNode;
            const ret = [];
            while (curr.parent) {
                ret.push(curr);
                curr = curr.parent;
            }
            return ret.reverse();
        }

        openList.splice(lowInd, 1);
        closedList.push(currentNode);
        const neighbors = getNeighbors(matrizMapa, currentNode.pos.x, currentNode.pos.y);

        for (const neighbor of neighbors) {
            if (closedList.includes(neighbor) || neighbor.isWall()) {
                continue;
            }

            const gScore = currentNode.g + 1;
            let gScoreIsBest = false;

            if (!openList.includes(neighbor)) {
                gScoreIsBest = true;
                neighbor.h = heuristic(neighbor.pos, end.pos);
                openList.push(neighbor);
            }
            else if (gScore < neighbor.g) {
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {
                neighbor.parent = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.debug = `F: ${neighbor.f}<br />G: ${neighbor.g}<br />H: ${neighbor.h}`;
            }
        }
    }

    return [];
}

function heuristic(pos0, pos1) {
    // Euclidean distance
    const d1 = Math.abs(pos1.x - pos0.x);
    const d2 = Math.abs(pos1.y - pos0.y);
    return Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2));
}

function getNeighbors(matrizMapa, x, y) {
    const ret = [];

    if (x > 0 && matrizMapa[x - 1][y] !== undefined) {
        ret.push(matrizMapa[x - 1][y]);
    }
    if (x < matrizMapa.length - 1 && matrizMapa[x + 1][y] !== undefined) {
        ret.push(matrizMapa[x + 1][y]);
    }
    if (y > 0 && matrizMapa[x][y - 1] !== undefined) {
        ret.push(matrizMapa[x][y - 1]);
    }
    if (y < matrizMapa[x].length - 1 && matrizMapa[x][y + 1] !== undefined) {
        ret.push(matrizMapa[x][y + 1]);
    }

    return ret;
}

export default aStar;
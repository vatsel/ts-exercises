`
You are given an m x n integer matrix grid, and three integers row, col, and color. Each value in the grid represents the color of the grid square at that location.

Two squares are called adjacent if they are next to each other in any of the 4 directions.

Two squares belong to the same connected component if they have the same color and they are adjacent.

The border of a connected component is all the squares in the connected component that are either adjacent to (at least) a square not in the component, or on the boundary of the grid (the first or last row or column).

You should color the border of the connected component that contains the square grid[row][col] with color.

Return the final grid.


Example 1:
Input: grid = [
    [1,1],
    [1,2]
], row = 0, col = 0, color = 3
Output: [
    [3,3],
    [3,2]
]

Example 2:
Input: grid = [
    [1,2,2],
    [2,3,2]
], row = 0, col = 1, color = 3
Output: [
    [1,3,3],
    [2,3,3]
]

Example 3:
Input: 
grid = [
    [1,1,1],
    [1,1,1],
    [1,1,1]
], 
row = 1, col = 1, color = 2
Output: [
    [2,2,2],
    [2,1,2],
    [2,2,2]
]
`
{

    function getAdjacent(grid: number[][], row: number, col: number): [number,number][] {
        if (row > grid.length - 1){
            throw new Error(`getAdjacent row lookup out of bounds (too many rows) ${row} vs ${grid.length -1 } `);
        } else if (row < 0){
            throw new Error(`getAdjacent row lookup out of bounds ${row} <0`);
        } else if (col > grid[row].length - 1){
            throw new Error(`getAdjacent col lookup out of bounds (too many cols) ${col} vs ${grid[row].length -1 } `);
        } else if (col < 0){
            throw new Error(`getAdjacent col lookup out of bounds ${col} <0`);
        } else {
            const coords: [number, number][] = [];
            // get above
            if (row > 0){
                // console.log(`adding above`);
                coords.push([row-1, col]);
            }
            
            // get below
            if (row < grid.length -1){
                // console.log(`adding below`);
                coords.push([row+1, col]);
            }
            
            // get left
            if (col > 0){
                // console.log(`adding left`);
                coords.push([row, col-1]);
            }
            
            // get right
            if (col < grid[0].length - 1){ // grid is a square 
                // console.log(`adding right`);
                coords.push([row, col+1]);
            }

            if (coords.length < 2) {
                throw new Error(`number of adjacent square less than 2! grid=${grid.toString()} row=${row} col=${col} \n result: ${coords.toString()}`);
            }
            return coords;
        }
    }

    function filterVisited(coords: [number,number][], visited: Set<string>): [number,number][]{
        return coords.filter(val => !visited.has(val.toString()));
    }

    function getSameComponentAdj(grid: number[][], row: number, col: number): [number, number][]{
        const adjacent = getAdjacent(grid, row, col);
        console.log(`adjacent: ${adjacent.toString()}`);
        const componentColor = grid[row][col];
        return adjacent.filter(coords => grid[coords[0]][coords[1]] === componentColor);
    }

    function isOnMatrixEdge(grid: number[][], row: number, col: number): boolean {
        if (row === 0 || col === 0 || row === grid.length -1 || col === grid[0].length -1) return true; // guaranteed to be square we can use 0

        return false;
    }

    function isOnComponentEdge(grid: number[][], row: number, col: number): boolean {
        if (isOnMatrixEdge(grid, row, col)) return true;

        const color = grid[row][col];
        const neighbours = getAdjacent(grid, row, col);
        return neighbours.some(coords => grid[coords[0]][coords[1]] !== color);
    }


    function colorBorder(grid: number[][], row: number, col: number, color: number): number[][] {
        const visited = new Set<string>();
        visited.add([row,col].toString());
        const toPaint : [number, number][] = [];

        if (isOnComponentEdge(grid, row, col)){
            toPaint.push([row,col]);
        }


        const toSearch: [number,number][] = getSameComponentAdj(grid, row, col);
        console.log(`initial toSearch: ${toSearch.toString()}`);

        while (toSearch.length > 0){
            const coordinate = toSearch.pop();
            if (!coordinate){
                throw new Error(`coordinate undefined!`)
            } 
            if (visited.has(coordinate.toString())){
                console.log(`skipping already visited ${coordinate}`);
                continue;
            }

            console.log(`iterating over ${coordinate}`);

            if (isOnComponentEdge(grid, coordinate[0], coordinate[1])){
                toPaint.push(coordinate);
            }
            visited.add(coordinate.toString());

            const componentAdjacent = filterVisited(
                getSameComponentAdj(grid, coordinate[0], coordinate[1]), visited
            );
            toSearch.push(...componentAdjacent);
        }
        // find the rest of the component's shape 
        // we can iterate by going in each cardinal recursively
        // and save the points that we have visited, alongside the points that should be coloured

        // DFS:
        // 1. create a heap of points to visit
        // 2. recurse for each remaining point. Overlaps will be consistend, the sets are passed as a point

        toPaint.forEach(coords => {
            console.log(`painted [${coords[0]},${coords[1]}]`);
            grid[coords[0]][coords[1]] = color;
        });

        return grid;
    };
   
    const INPUT_1 = [[1,1],[1,2]];
    const INPUT_2 = [[1,1,1],[1,1,1],[1,1,1]];
    const INPUT_3 = [[1,2,2],[2,3,2]];

    // const result = colorBorder(INPUT_1, 0, 0, 3);
    const result = colorBorder(INPUT_3, 0, 1, 3);
    console.log(result);

    // console.log(getSameComponentAdj(INPUT_2, 1,2));

    // console.log(v.values().toArray());
    // console.log(getNonVisitedAdj(INPUT_1, 0,1, v).toString());

    // console.log(isOnComponentEdge(INPUT_2, 1,1));

}
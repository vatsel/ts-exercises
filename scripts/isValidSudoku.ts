`
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.




0 , 1 , 2
3 , 4 , 5
6 , 7 , 8

(0->2, 0->2), (3->5, 0->2), (6->8, 0->2)
(0->2, 3->5), (3->5, 3->5), (6->8, 3->5)
(0->2, 6->8), (3->5, 6->8), (6->8, 6->8)



`


{
    
    function getGridNumFromCoords(rowIndex: number, colIndex: number): number{
        // if (rowIndex > 8) throw new Error(`rowIndex > 8: ${rowIndex}`);
        // if (colIndex > 8) throw new Error(`rowIndex > 8: ${colIndex}`);
        // const base =
        // const added =;
        // console.log(`base ${base} + added ${added} = ${base+added}`);
        return  Math.floor(colIndex / 3) * 3 +  Math.floor(rowIndex / 3); 
    }

    function isValidSudoku(board: string[][]): boolean {
        const columnSets: Set<string>[] = Array.from({length: 9}, () => new Set<string>());
        const gridSets: Set<string>[] = Array.from({length: 9}, () => new Set<string>());



        for (let rowIndex = 0; rowIndex < board.length; rowIndex++ ){
            const thisRowSet = new Set<string>();
            for (let colIndex = 0; colIndex < board[0].length; colIndex++){

                //ignore dots
                const cell = board[rowIndex][colIndex];
                if (cell === '.') continue;


                // track rows
                if (thisRowSet.has(cell)) return false;
                thisRowSet.add(cell);
                
                // track columns
                if (columnSets[colIndex].has(cell)) return false;
                columnSets[colIndex].add(cell);
                // console.log(columnSets);

                const gridIndex = getGridNumFromCoords(rowIndex, colIndex);
                if (gridSets[gridIndex].has(cell)) return false;
                gridSets[gridIndex].add(cell);

            }
        }

        return true;
    };

    const BOARD_1 = [["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]];

    const BOARD_2 = [["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]

    console.log(isValidSudoku(BOARD_1));
    // console.log(isValidSudoku(BOARD_2));
    // console.log(getGridNumFromCoords(0,0));
    // console.log(getGridNumFromCoords(2,2));
    // console.log(getGridNumFromCoords(4,0));
}
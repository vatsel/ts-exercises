const BOARD = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]
const EXPECTED = [
    ["5","3","4","6","7","8","9","1","2"],
    ["6","7","2","1","9","5","3","4","8"],
    ["1","9","8","3","4","2","5","6","7"],
    ["8","5","9","7","6","1","4","2","3"],
    ["4","2","6","8","5","3","7","9","1"],
    ["7","1","3","9","2","4","8","5","6"],
    ["9","6","1","5","3","7","2","8","4"],
    ["2","8","7","4","1","9","6","3","5"],
    ["3","4","5","2","8","6","1","7","9"]
]

/*
square nums:
0 , 1 , 2
3 , 4,  5 
6,  7,  8
*/


/*
TODO: needs to solve by trying to guess a number


*/

function rowColToSquareNum(rowNum: number, colNum: number): number{
    const base = Math.floor( rowNum / 3) * 3;
    const add = Math.floor( colNum / 3);
    
    return base + add;
}

function selectSquareVals(squareNum: number, board: string[][]): string[]{
    const rowStartingIndex = Math.floor(squareNum / 3 ) * 3 ;
    const colStartingIndex = (squareNum % 3) * 3;

    const values = Array<string>(9);
    let i = 0;
    for (let rowI = rowStartingIndex; rowI < rowStartingIndex + 3; rowI++){
        for (let colI = colStartingIndex; colI < colStartingIndex + 3; colI++){
            values[i] = board[rowI][colI];
            i++;
        }
    }
    return values;
}



function existsInSquare(value: string, squareNum: number, board: string[][]): boolean{
    const squareVals = selectSquareVals(squareNum, board);
    for (let i=0; i < 9; i++){
        if (squareVals[i] === value){
            return true;
        }
    }
    return false;
}


function existsInColumn(value:string, colNum:number, board: string[][]): boolean{
    for (let i=0; i < 9; i++){
        if (board[i][colNum] === value){
            return true;
        }
    }
    return false;
}

function existsInRow(value:string, rowNum: number, board: string[][]): boolean{
    for (let i = 0; i < 9; i++){
        if (board[rowNum][i] === value){
            return true;
        }
    }
    return false;
}


function cellIsFull(rowIndex:number, colIndex: number, board: string[][]): boolean{
    const cellValue = board[rowIndex][colIndex];
    return cellValue !== '.';
}

/** @returns true if the cell is solved, false if it's empty */
function checkCell(rowIndex:number, colIndex: number, board: string[][]): boolean{
    if (cellIsFull(rowIndex, colIndex, board)){
        console.log(`[${rowIndex},${colIndex}] cell already full, skipping`);
        return true;
    }
    
    const possibleVals = new Set<string>();
    const squareNum = rowColToSquareNum(rowIndex, colIndex);
    for (let val=1; val < 10; val++){
        const asStr = val.toString();

        const hasConflict = (
            existsInRow(asStr, rowIndex, board) 
            || existsInColumn(asStr, colIndex, board) 
            || existsInSquare(asStr, squareNum, board)
        );

        if (!hasConflict){
            possibleVals.add(asStr);
            if (possibleVals.size > 2){
                console.log(`[${rowIndex},${colIndex}] can have multiple values, skipping.`);
                return false;
            }
        }

    }
    if (possibleVals.size === 1){
        // only set if there's only one possible value
        const [ assignValue ] = possibleVals;
        console.log(`[${rowIndex},${colIndex}] setting ${assignValue}.`)
        board[rowIndex][colIndex] = assignValue;
        return true;
    }
    console.log(`[${rowIndex},${colIndex}] can have multiple values, skipping.`);
    return false;
}



function printBoard(board: string[][]): void {
    let output = "-------------------------------------\n";
    
    for(let rowNum=0; rowNum < 9; rowNum++){
        output += "| ";
        for (let colNum=0; colNum < 9; colNum++){
            output += board[rowNum][colNum] + " | ";
        }
        output += "\n-------------------------------------\n";
    }
    console.log(output);
}



function solveSudoku(board: string[][]): void {
    const coordinatesToSolve = new Set<{ rowI:number; colI:number; }>();

    // fill up set
    for (let rowI=0; rowI < 9; rowI++){
        for (let colI=0; colI < 9; colI++){
            coordinatesToSolve.add({rowI, colI});
        }
    }
    while (coordinatesToSolve.size > 0){
        for (const aCoord of coordinatesToSolve){
            const isFilled = checkCell(aCoord.rowI, aCoord.colI, board);
            if (isFilled){
                coordinatesToSolve.delete(aCoord);
            }
        }
    }


    if (BOARD === EXPECTED){
        console.log('solved!');
    } else {
        console.log('failed');
        printBoard(board);
    }
};



solveSudoku(BOARD);
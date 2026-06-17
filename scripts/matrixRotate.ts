/**
 Do not return anything, modify matrix in-place instead.
 */

// rotating clockwise

// we will solve it by selecting 4 values that are symmetrical to each other in each part of the quarter, and then shifting them 1 forward.
// 

/*
X X 3 
4 5 6
7 8 9



*/


// ORDER IS IMPORANT BELOW !
// {0,0} ->  {0, 2}       {2,  2}  {2,0} 
//  r, c      c, 1-r      1-c 1-r 
// {0,0} ->.  0, 2-0     

// {0,3} ->   {3,  5}     {5,  3}     {3,  0}
//. r,c  ->    c, 1-r       
//.            3,  5-0                           
// {0,2} -> {2,5} {5,2} {2,0}

// {1,0} ->     {0,3}           {3,     4}                {4,       1}     
// {R, C} ->    {C,L-R-1}       {L-R-1, L-C-1}            {L-C-1,  R}     
// {R, C} ->    {C,5-1-1}       {5-1-1,   5-0-1}          {5-0-1,  R}     
//  
// {0,0} ->      {0, 2}         {2,  2}                    {2,0} 
// {R, C} ->    {C,L-R-1}       {L-R-1, L-C-1}            {L-C-1,  R}     
//                  3-0-1.       3-0-1 3-0-1                3-0-1 

// {1,1} ->     {1,3}       {3,3}     {3,1}     


// for even-length matrices we need to perform a number of transformations equal to the length of a side (4 for 4)

// for odd-length matrices we need to do 1 less operation because the center doesn't move? for the 3-sided one, it's 2 transforms

// {0,2}

/*
X X X O 1
O X X 1 1
5 1 3 1 2
5 1 3 1 O
5 O 3 1 2

these are the transforms needed for an odd number of sides
on rows, we iterate until we reach ceil(i/2)
on columns we iterate until we reach floor(i/2)
These values should work for an even-sided matrix, too.
*/

/* 
rough pseudo code:

...iterate over indexes in quadrant:
    const coords = select the 3 other coordinates matching this in the other quadrants
    const values = select the values of the coords
    assign values -> coords at an offset of 1



*/
// {R, C} ->  {C,L-R-1}  {L-R-1, L-C-1}   {L-C-1,  R}     
function selectOtherCoords(rowI: number, colI: number, matrixLength: number): 
    {rowI: number; colI: number}[] 
{
    const topRight = {
        rowI: colI, 
        colI: matrixLength -rowI -1 
    };
    const bottomRight = {
        rowI: matrixLength -rowI -1, 
        colI: matrixLength -colI -1
    };
    const bottomLeft = {
        rowI: matrixLength -colI -1,
        colI: rowI
    };

    return [{rowI, colI}, topRight, bottomRight, bottomLeft];
}


function shiftOneForwardInPlace(array:number[]): number[]{

    let nextElem = array[0];
    array[0] = array[array.length-1]; // swap last with first to loop around
    
    for (let i=1; i<array.length; i++){
        const buffer = array[i];
        array[i] = nextElem;
        nextElem = buffer;
    }
    return array;
}


function rotate(matrix: number[][]): void {
    // ...iterate over indexes in quadrant:
    const sideLength = matrix[0].length;
    const rowLimit = Math.ceil(sideLength /2 );
    const colLimit = Math.floor(sideLength / 2);

    for (let rowI = 0; rowI < rowLimit; rowI++){
        for (let colI = 0; colI < colLimit; colI++){

            const coords = selectOtherCoords(rowI, colI, sideLength);
            
            // keep first 
            let replacedVal = matrix[coords[0].rowI][coords[0].colI];

            // write last to first
            matrix[coords[0].rowI][coords[0].colI] = matrix[coords[3].rowI][coords[3].colI];

            // ...iterate over the next elements
            for (let i=1; i<4; i++){    
                // save value you're about to overwrite in buffer
                const buffer = matrix[coords[i].rowI][coords[i].colI];
                // write keep to this value
                matrix[coords[i].rowI][coords[i].colI] = replacedVal;
                // write buffer to keep
                replacedVal = buffer;
            }
        }
    }
    console.log(matrix);
};




rotate([[1,2,3],[4,5,6],[7,8,9]]);
`
Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.
 

Example 1:

Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
Example 2:

Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
 

Constraints:

0 <= x <= 231 - 1
`
{

    function isClosest(x: number, target: number): boolean {
        const squareFloor = Math.floor(x * x);
        const squareFloorPlus = Math.floor( (x+1) * (x+1));

        return target < squareFloorPlus && target >= squareFloor ;
    }

    function mySqrt(x: number): number {
        if (x < 2){
            return x;
        }
        

        let lowerPrediction = 1;
        let higherPrediction = Math.floor(x / 2);
        console.log(`starting lowerPrediction: ${lowerPrediction}`)
        console.log(`starting higherPrediction: ${higherPrediction}`)
        let kill = 1;
        while (higherPrediction > lowerPrediction){
            console.log(`iteration [${kill}]: lowerPrediction=${lowerPrediction} higherPrediction=${higherPrediction}`);
            const lowerSquare = Math.floor(lowerPrediction*lowerPrediction);
            const lowerSqrPlusOne = Math.floor((lowerPrediction+1) * (lowerPrediction+1));
            if (x < lowerSqrPlusOne && x >= lowerSquare ){
                return lowerPrediction;
            }
            const higherSquare = Math.floor(higherPrediction*higherPrediction);
            const higherSqrPlusOne = Math.floor((higherPrediction+1)*(higherPrediction+1));
            if (x < higherSqrPlusOne && x>= higherSquare){
                return higherPrediction;
            }
            const higherDiff = higherSquare - x;
            const lowerDiff = x - lowerSquare;
            console.log(`higherDiff = ${higherDiff} (${higherSquare} - ${x})  lowerDiff= ${lowerDiff} (${x} - ${lowerSquare})`);
            if (lowerDiff < higherDiff){
                // go left
                higherPrediction = higherPrediction - Math.ceil((higherPrediction - lowerPrediction) / 4);
                console.log(`updated higherPrediction = ${higherPrediction}`);
            }
            else {
                // go right 
                lowerPrediction = lowerPrediction + Math.floor((higherPrediction - lowerPrediction) / 2);
                console.log(`updated lowerPrediction ${lowerPrediction}`);
            }

            if (kill > 20){
                return -1;
            }
            kill++;
            console.log(``);
        }
        //error
        return lowerPrediction;
        
    };

    function test(input: number, expected: number){
        const result = mySqrt(input);
        if (result === expected){
            console.log(`passed ${input}`);
        } else {
            console.log(`failed ${input}. received ${result} expected ${expected}`);

        }
    }
    // test(4, 2);
    // test(8, 2);
    // test(36,6);
    test(10,3);
    // test(8192,90);
}


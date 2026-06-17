`
You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

 

Example 1:

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].
Example 2:

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].
Example 3:

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].
`
{

    function plusOne(digits: number[]): number[] {
        let incrementIndex = digits.length -1;
        while (digits[incrementIndex] === 9){
            digits[incrementIndex] = 0;
            // console.log(`iterated ${incrementIndex}`);
            incrementIndex--;
        }
        if (incrementIndex === -1){
            return [1, ...digits];
        }
        digits[incrementIndex]++;
        return digits;
    };
    
    function arraysAreEqual(arrA: number[], arrB: number[]): boolean {
        if (arrA.length !== arrB.length){
            return false;
        }        
        for(const [index, item] of arrA.entries()){
            if (item !== arrB[index]){
                return false;
            }
        }
        return true;
    };

    function test(input: number[], expected: number[]){
        const result = plusOne(input);
        if (arraysAreEqual(result, expected)){
            console.log(`passed ${input}`);
        } else {
            console.log(`failed ${input}. Received ${result}, but expected ${expected}`);
        }
    }

    // test([1,2,3],[1,2,4]);
    test([9],[1,0]);
    test([8,9,9,9],[9,0,0,0])
}
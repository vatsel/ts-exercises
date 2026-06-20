`
Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


 

Example 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:

Input: numRows = 1
Output: [[1]]



`

{
    function generate(numRows: number): number[][] {
        const result: number[][] = [[1]];
        for(let i = 1; i < numRows; i++){
            const prev = result[i-1];
            
            const next = prev.map((digit, index) => {
                if (index === 0) return 1;

                const prevDigit = prev[index - 1];
                return digit + prevDigit;
            });
            next.push(1);
            result.push(next);
        }
        console.log(result);
        return result;
    };

    generate(5);
}
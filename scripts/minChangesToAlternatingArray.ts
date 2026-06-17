`
ou are given a string s consisting only of the characters '0' and '1'. In one operation, you can change any '0' to '1' or vice versa.

The string is called alternating if no two adjacent characters are equal. For example, the string "010" is alternating, while the string "0100" is not.

Return the minimum number of operations needed to make s alternating.

 

Example 1:

Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be "0101", which is alternating.
Example 2:

Input: s = "10"
Output: 0
Explanation: s is already alternating.
Example 3:

Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".

"0101010" 
// even 0s odd 1s
// odd 0s even 1s

"1011010" = 3
"X0X1X1X"
"1X1X0X0"

Constraints:

1 <= s.length <= 104
s[i] is either '0' or '1'.
`
{
    function minOperations(s: string): number {
        if (s.length === 1) return 0;

        let evenZeroes = 0, oddZeroes = 0;
        for (let i = 0; i < s.length; i++){
            if (s[i] === '0'){
                if (i%2 === 0) evenZeroes++;
                else oddZeroes++;
            } 
        }
        const totalLengthIsEven = s.length % 2 === 0;
        const halfLength = s.length /2;

        const totalEvens     = totalLengthIsEven ? halfLength : Math.ceil(halfLength);
        const totalOdds      = totalLengthIsEven ? halfLength : Math.floor(halfLength);

        const evenOnes = totalEvens - evenZeroes;
        const oddOnes = totalOdds - oddZeroes;

        if (oddZeroes + evenOnes > evenZeroes + oddOnes){
            // more odd zeroes and even ones, flip the rest 
            return evenZeroes + oddOnes;
        } else {
            // more even zeroes and odd ones, flip the rest
            return oddZeroes + evenOnes;
        }
    };

    console.log(minOperations("0110"));
}
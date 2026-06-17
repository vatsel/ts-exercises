`
7. Reverse Integer


Given a signed 32-bit integer x, return x with its digits reversed. 
If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

Example 1:

Input: x = 123
Output: 321


Example 2:

Input: x = -123
Output: -321


Example 3:

Input: x = 120
Output: 21
 

Constraints:

-231 <= x <= 231 - 1
`


{
    function reverse(x: number): number {
        if (x === 0) return 0;
        
        const charStrings = x.toString().split('');
        
        const isNegative = charStrings[0] === '-';
        if (isNegative){
            charStrings.splice(0, 1);
        }
        const reversed = charStrings.toReversed();

        let hitNotZero = false;
        let stringResult = '';
        for (const char of reversed){
            if (char === '0'){
                if (!hitNotZero){
                    continue;
                }
                stringResult += char;
            } else {
                hitNotZero = true;
                stringResult += char;
            }
        }
        const numberResult = parseInt(stringResult) * (isNegative ? -1 : 1);
        if (numberResult > 2 ** 31) return 0;
        if (numberResult < (-2) ** 31) return 0;



        return numberResult;
    }; 

    function test(input: number, expected: number) {
        const res = reverse(input);
        if (res === expected){
            console.log(`passed ${input}`);
        } else {
            console.log(`failed ${input}: expected ${expected}, recieved ${res}`);
        }
    };

    test(123, 321);
    test(-123, -321);
    test(120, 21);
}
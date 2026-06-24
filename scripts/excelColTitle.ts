`
Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.

For example:

A -> 1
B -> 2
C -> 3
...
Y -> 25
Z -> 26
AA -> 27
AB -> 28 
...
 

Example 1:

Input: columnNumber = 1
Output: "A"
Example 2:

Input: columnNumber = 28
Output: "AB"
Example 3:

Input: columnNumber = 701
Output: "ZY"
 

Constraints:

1 <= columnNumber <= 2^31 - 1


AB = 26, 2
ZY = 676 , 25


`
{
    const A_CHAR_CODE = 65;
    
    function numToOneChar (num: number): string {
        return String.fromCharCode(A_CHAR_CODE + num -1); 
    }

    function toBijected(num: number): number[]{
        const output: number[] = [];
        while (num > 0){
            num -= 1; // switch to zero-indexed
            const item = num % 26 + 1;// switch back to 1-indexed
            output.unshift(item);
            num = Math.floor(num / 26 );  
        }

        return output;
    }

    function convertToTitle(columnNumber: number): string {
        const letterCodes = toBijected(columnNumber);
        return letterCodes.map(lc => numToOneChar(lc)).join('');
    };
    // console.log('Y'.charCodeAt(0));
    // console.log(convertToTitle(26));
    // numToOneChar(1,1);
    // console.log(convertToTitle(26));
    console.log(convertToTitle(27));
    
}
`
ou are given a string num representing a large integer. An integer is good if it meets the following conditions:

It is a substring of num with length 3.
It consists of only one unique digit.
Return the maximum good integer as a string or an empty string "" if no such integer exists.

Note:

A substring is a contiguous sequence of characters within a string.
There may be leading zeroes in num or a good integer.
 

Example 1:

Input: num = "6777133339"
Output: "777"
Explanation: There are two distinct good integers: "777" and "333".
"777" is the largest, so we return "777".
Example 2:

Input: num = "2300019"
Output: "000"
Explanation: "000" is the only good integer.
Example 3:

Input: num = "42352338"
Output: ""
Explanation: No substring of length 3 consists of only one unique digit. Therefore, there are no good integers.
 

Constraints:

3 <= num.length <= 1000
num only consists of digits.
`
{
    const VAL_MAP = new Map<string,number>([
        ['000', 0],
        ['111', 1],
        ['222', 2],
        ['333', 3],
        ['444', 4],
        ['555', 5],
        ['666', 6],
        ['777', 7],
        ['888', 8],
        ['999', 9],
    ]);
    
    function largestGoodInteger(num: string): string {
        // find three same digits
        let savedStr = '';
        let savedval = -1;
        for (let i = 0; i < num.length -3; i++ ){
            // console.log(`savedSt = ${savedStr}`);
            if (num[i] === num[i+1] && num[i+1] === num[i+2] ){
                const tripleDigits = num.slice(i, i+3);
                const val = VAL_MAP.get(tripleDigits);
                if (val === undefined) throw new Error(`unexpected. not found val ${tripleDigits} in VAL_MAP`);
                if (val === 9){
                    return tripleDigits;
                }
                if (val > savedval){
                    savedStr = tripleDigits;
                    savedval = val;
                }
            }
        }
        return savedStr;
    };
    console.log(largestGoodInteger("6777133339"));

}
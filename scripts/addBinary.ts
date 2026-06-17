`
Given two binary strings a and b, return their sum as a binary string.

 

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
 

Constraints:

1 <= a.length, b.length <= 104
a and b consist only of '0' or '1' characters.
Each string does not contain leading zeros except for the zero itself.

X101 = 5
X111 = 7
1100 = 12

XXX0+
XX00+
X100+
1100+


`
{
    function addBinary(a: string, b: string): string {
        let reveresedOutput: string[] = [];

        let carry = 0;
        let aArr = a.split('');
        let bArr = b.split('');
        while (aArr.length > 0 || bArr.length > 0){
            const aVal = (aArr.pop() === "1") ? 1 : 0;
            const bVal = (bArr.pop() === "1") ? 1 : 0;
            const total = carry + aVal + bVal;

            // console.log(`aVal ${aVal} bVal=${bVal} total=${total}`);
            carry = (total > 1) ? 1 : 0;
            reveresedOutput.push((total % 2 === 1) ? "1" : "0");
            // console.log(`carry ${carry} reversedOutput ${reveresedOutput.toReversed().join('')}`);
        }
        if (carry === 1){
            reveresedOutput.push("1");
        }
        return reveresedOutput.reverse().join('');
    };

    function test(inA:string, inB:string, expected: string){
        const result = addBinary(inA, inB);
        if (result === expected){
            console.log(`passed ${inA} & ${inB}`);
        } else {
            console.log(`failed ${inA} & ${inB}. Received ${result}, expected ${expected}`);
        }
    }

    // test("11","1","100");
    test("1010","1011","10101");
    // test("11","1","100");
    // test("1","0","1");
}
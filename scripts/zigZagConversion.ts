`
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: 
(you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);
 

Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

========
Example 1:

1   5   9
2 4 6 8
3   7

? option 1: create a new data structure.
? option 2: 


skip 3
every second one
the remaining one


1    7   13 
2  6 8  12
3 5  9 11  
4    10


Input: s =  "PAYPALISHIRING", numRows = 3
Output:     "PAHNAPLSIIGYIR"
* skip 3
========

Example 2:
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
Example 3:

Input: s = "A", numRows = 1
Output: "A"
 

Constraints:

1 <= s.length <= 1000
s consists of English letters (lower-case and upper-case), ',' and '.'.
1 <= numRows <= 1000
`
{
    function convert(s: string, numRows: number): string {
        if (numRows === 1) return s;
        const rows : string[] = new Array<string>(numRows).fill('');


        let rowIndex = 0;
        let goingDown = true;
        for (let stringIndex = 0; stringIndex < s.length; stringIndex++){
            rows[rowIndex] += s[stringIndex];

            if (goingDown) {
                if (rowIndex === numRows - 1) {
                    rowIndex--;
                    goingDown = false;
                } else {
                    rowIndex++;
                }
            } else {
                if (rowIndex === 0){
                    goingDown = true;
                    rowIndex++;
                } else {
                    rowIndex--;
                }
            }
        }
        return rows.join('');
    };

    console.log(convert('AB', 1));
}

/**
 * Your LUPrefix object will be instantiated and called as such:
 * var obj = new LUPrefix(n)
 * obj.upload(video)
 * var param_2 = obj.longest()
 */
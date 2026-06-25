`
Given a string s, return the longest palindromic substring in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
`
{
    function expandToCheckLongest(s: string, leftIndex: number, rightIndex: number): string {
        if (s[leftIndex] !== s[rightIndex]) return '';

        let validLeft = leftIndex;
        let validRight = rightIndex;
        while (leftIndex >= 0 && rightIndex < s.length && s[rightIndex] === s[leftIndex]){
            console.log(`run ${leftIndex} - ${rightIndex}`);
            validLeft = leftIndex;
            validRight = rightIndex;
            leftIndex--;
            rightIndex++;
        }
        // console.log(`returning ${s.slice(validLeft, validRight + 1)}`);
        return s.slice(validLeft, validRight + 1);
    }

    function longestPalindrome(s: string): string {
        if (s.length < 2) return s;

        let longestPalindrome = '';

        for (let i =0; i < s.length; i++){
            const oddResult = expandToCheckLongest(s,i,i);
            // console.log(`oddResult ${oddResult}`);
            if (longestPalindrome.length < oddResult.length) longestPalindrome = oddResult;

            const evenResult = expandToCheckLongest(s,i,i+1);
            // console.log(`evenResult ${evenResult}`);
            if (longestPalindrome.length < evenResult.length) longestPalindrome = evenResult;
        }

        return longestPalindrome;
    };

    console.log(longestPalindrome('babad'));

}
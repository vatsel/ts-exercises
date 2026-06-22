`
Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "(*)"
Output: true
Example 3:

Input: s = "(*))"
Output: true
 

Constraints:

1 <= s.length <= 100
s[i] is '(', ')' or '*'.
`
{
    function checkValidString(s: string): boolean {
        let lowestUnmatched = 0;
        let highestUnmatched = 0;
        for (const char of s){
            if (char === '('){
                lowestUnmatched++;
                highestUnmatched++;
            } else if (char === ')'){
                lowestUnmatched--;
                highestUnmatched--;

            } else { // char is *
                lowestUnmatched--;
                highestUnmatched++;
            }

            if (lowestUnmatched < 0) lowestUnmatched = 0;
            if (highestUnmatched < 0) return false;
        }

        return lowestUnmatched === 0;
    };
    const INPUT = '(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())'
    console.log(`result = ${checkValidString(INPUT)}`);
    // XXXX((*))
    // XXXX((*))
    // 
}
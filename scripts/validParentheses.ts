` 
20. Valid Parentheses

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

Example 5:

Input: s = "([)]"

Output: false

 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'
`
{

const PARENTESES_MAP = new Map<string, string>([
    ['(',')'],
    ['[',']'],
    ['{','}'],
]);


function isValid(s: string): boolean {
    if (s.length < 2){
        // console.log(`discarded ${s} due to len < 2 ${s.length}`);
        return false;
    }
    console.log(`checking ${s}`);
    const targetChar = PARENTESES_MAP.get(s[0]);
    if (!targetChar){
        // console.log(`discarded because couldn't find target char for ${s[0]}`);
        return false;
    }
    for (let i=s.length-1; i > 0; i--){
        // console.log(`iterating through ${s[i]}`);
        if (s[i] === targetChar){
            // recurse over any remainder
            const remainderStr = s.slice(i+1);
            if (remainderStr){
                // console.log(`remainderStr = ${remainderStr}`);
                const remainderResult = isValid(remainderStr);
                if (!remainderResult){
                    // false !try another combination
                    // return false;
                    continue;
                }
            }

            // recurse over any inside str
            const insideStr = s.slice(1,i);
            if (insideStr){
                // console.log(`insideStr = ${insideStr}`);
                const insideResult = isValid(insideStr);
                if (!insideResult){
                    // false !try another combination
                    continue;
                }
            }
            return true;
        }
    }
    // console.log('No match found with target ',targetChar);
    return false;
};
// console.log(isValid("(]"));
// console.log(isValid("()[]{}"));
console.log(isValid("([)]"));
// console.log(isValid("[({(())}[()])]"));
// console.log(isValid("{}{}()[]"));

}
`
Given a string s consisting of words and spaces, return the length of the last word in the string.

A word is a maximal substring consisting of non-space characters only.

 

Example 1:

Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
Example 2:

Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
Example 3:

Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
 

Constraints:

1 <= s.length <= 104
s consists of only English letters and spaces ' '.
There will be at least one word in s.
`
{
    function lengthOfLastWord(s: string): number {
        if (s.length === 0){
            return 0;
        }
        let hitNonEmptyspace = false;
        let endOfWordIndex = -1;
        for (let i= s.length -1; i >= 0; i-- ){
            if (s[i] === " "){
                console.log(' empty space');
                if (hitNonEmptyspace){
                    // return current
                    console.log(`${endOfWordIndex} - ${i}`)
                    return endOfWordIndex - i;
                }
            } else {
                if (!hitNonEmptyspace){
                    endOfWordIndex = i;
                }
                hitNonEmptyspace = true;
                console.log(`non empty space ${hitNonEmptyspace} ${endOfWordIndex}`)
            }
        }    
        return endOfWordIndex + 1;
    };

    function test(input:string, expected: number){
        const result = lengthOfLastWord(input);
        if (result === expected){
            console.log(`passed ${input}`);
        } else {
            console.log(`failed ${input}. Received ${result} expected ${expected}`);
        }
        
    }
    // test('Hello World',5);
    // test("   fly me   to   the moon  ",4);
    test(" a",1);
    // test("a ",1);
}
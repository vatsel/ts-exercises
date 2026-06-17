`Given a string s, find the length of the longest substring without duplicate characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.`


{

function lengthOfLongestSubstring(s: string): number {

    // the plan is to find sub strings without repeating chars.
    // keep track of exisitng chars in a hash table
    // go l->r until we hit a duplicate
    // then, 
    // find where the duplicate was, 
    // and start the iteration to +1 of the dupe, creating a smaller range
    // 
    // storing existing chars in a map: 
    // (1) saves looking back. 
    // (2) will need to remove the found char

    // iteration
    // for-loop is not the right one because we'll be moving the iteration range back

    let longest = 0;
    let leftmost = 0;
    let index = 0;
    const map = new Map<string, number>();
    while (index < s.length){
        const char = s[index];
        const inMap = map.get(char);
        if (inMap === undefined){
            // char is not duplicate, save it
            map.set(char, index);
            console.log(`i=${index}  ch=${char}  map=${map.entries().toArray()}`);
        } else {
            // char is duplicate
            map.clear();

            // see if this range is the longest range
            const curRange = index - leftmost;
            console.log(`dupe ${char}. index=${index} - leftmost=${leftmost} range: `, curRange);
            longest = Math.max(longest, curRange);


            // iterate over the shorter range
            const newLeft = inMap;
            leftmost = newLeft + 1;
            index = newLeft;
        }

        index++;
    }

    // if there were no dupes, return the remaining length
    const remaining = s.length - leftmost;
    console.log(`remaining = ${remaining} `);
    return Math.max(longest, remaining);
 

};

function test(input: string, expected:number){
    const result = lengthOfLongestSubstring(input);
    if (result === expected){
        console.log(`passed ${input}`);
    } else {
        console.log(`failed ${input}. received ${result} expected ${expected}`)
    }
}

test("abcabcbb",3);
// test("bbbbb",1);
// test("dvdf", 3);
}
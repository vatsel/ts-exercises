/*

Given a string s, find the length of the longest substring without duplicate characters.

 

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

0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.

// solution

longest substring without repeating characters.
we can save the chars in a set to see if there's a repeat

algo:
setOfUniques = new set
longestSubstringLen = 0 
currentSubstring = ""

if inputString.len === 0:
    return ""
else if inputString.len == 1:
    return inputString[0]

for char in string:
- if char is already in set: STOP
    if currentSubstring.length > longestSubstring.length:
        longest = current
- else:
    - append to substring
    - add to set

? how to continue to iterate over the next char? remove the original and see if the next sequence is longer?



*/
{

function lengthOfLongestSubstring(s: string): number {
    if (s.length === 0){
        return 0;
    } 
    if (s.length === 1){
        return 1;
    }

    let longestSubString = 0;
    for (let startIndex=0; startIndex < s.length; startIndex++){ 
        // early return if found substr is already guranteed longest
        const remainingChars = s.length - startIndex;
        if (remainingChars < longestSubString){ 
            return longestSubString;
        }

        const uniquesSet = new Set<string>();
        let curSubstring = "";
        for (let curIndex=startIndex; curIndex < s.length; curIndex++){ 
            
            const curChar = s[curIndex];
            if (uniquesSet.has(curChar)){
                longestSubString = Math.max(longestSubString, curSubstring.length);
                // find location of repeating str. what if it's at the end or in the middle? 
                // you can be thorough by returning back to the original index and trying again until you reach another repeating char.
                // is there a way to use the repeating index to "jump ahead" in the check? 
                // we do not need to check the existing members in the set. Remove ONLY the first element
                // so we
                // > increment startIndex
                // > increment curIndex 
                // > remove found element in the set
                // > remove first element in the substr
                // AasdfgeApoiuy
                // X------^-----
                // -X=====------
                // AasdAfgeApoiuy
                // X---^---------
                // -X==----^----
                // ....
                // ----X---^
                uniquesSet.delete(curChar);
                const copySubStr = [...curSubstring];

                // TODO: don't break, increment both indices
                // remove first char in substr
                // MAKE sure we're not going out of bounds creating this new substr !
                break;
            }
            curSubstring += curChar;
            uniquesSet.add(curChar);
        }
    }

    return longestSubString;
};

function test(input: string, expected: number){
    const result = lengthOfLongestSubstring(input);
    if (result === expected){
        console.log(`passed ${input}`);
    } else {
        console.log(`FAILED ${input}. Expected "${expected}" Received "${result}"`);
    }
};

// test("abcabcbb",3);
// test("bbbbb",1);
// test("pwwkew",3);

const abc = "abc";
const bc = abc.slice(1);
console.log(bc);

}
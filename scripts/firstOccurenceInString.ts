`
28. Find the Index of the First Occurrence in a String
Easy

Topics
premium lock icon
Companies
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

 

Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
 

Constraints:

1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters.
`

{
    function strStr(haystack: string, needle: string): number {
        if (needle.length > haystack.length || needle.length === 0 || haystack.length === 0){
            return -1;
        }
        for (const [index, char] of [...haystack].entries()){
            // if needle is larger than remaining haystack, break early
            if (needle.length > haystack.length   - index){
                // console.log(`early return at index ${index}\n${needle.length} > ${haystack.length}  - ${index}`)
                return -1;
            }
            if(char === needle[0]){
                // iterate to check the rest
                const sliced = haystack.slice(index, index + needle.length);
                // console.log(`sliced = ${sliced}`);
                if (sliced === needle){
                    return index;
                }
                // otherwise fall through
            }
        }
        // if nothing is found
        console.log(`failed, dropped out`)
        return -1;
    };



    function test(input:string, find: string, expected: number){
        const result = strStr(input, find);
        if (result === expected){
            console.log(`passed ${input}`);
        }
        else {
            console.log(`failed ${input}. result ${result} !== expected ${expected}`)
        }
    } 

    // test("leetcode", "leeto", -1);
    test("hello", "ll", 2);
    // console.log(strStr('','1'))

}
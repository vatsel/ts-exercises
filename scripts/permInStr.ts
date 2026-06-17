`
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

 

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false
 

Constraints:

1 <= s1.length, s2.length <= 104
s1 and s2 consist of lowercase English letters.
`
{
    function mapsEqual(m1: Map<string, number>, m2: Map<string, number>): boolean {
        if (m1.size !== m2.size) return false;

        for(const [k,v] of m1.entries()){
            const otherVal = m2.get(k);
            if (!otherVal) return false;
            if (otherVal !== v) return false;
        }

        return true;
    }

    function getLetterOccurences(s:string ): Map<string, number> {
        const result = new Map<string, number>();
        for (let i = 0; i < s.length; i++ ){
            const c = s[i];
            const count = result.get(c);
            if (count === undefined){
                result.set(c, 1);
            } else {
                result.set(c, count+1);
            }
        }
        return result;
    }

    function checkInclusion(s1: string, s2: string): boolean {
        if (s1.length > s2.length) return false;
        // split s1 into a letter occurence map
        const map = getLetterOccurences(s1);
        // iterate ... once we detect one of the letters
        for (let i=0; i < s2.length; i++){
            const remainingStr = s2.split('')
                .slice(i, i + s1.length)
                .join('');
            if (s1.length > remainingStr.length) continue;

            const char = s2[i];
            if (!map.get(char)) continue;
            // char occurs, take the next s1 length elements
            const map2 = getLetterOccurences(remainingStr);

            if( mapsEqual(map, map2)) return true;
        
        }

        return false;
        
    };

    function test(in1:string, in2:string, expected: boolean){
        const result = checkInclusion(in1, in2);
        if (result === expected){
            console.log(`passed ${in1} ${in2}`);
        } else {
            console.log(`failed. Expected ${expected} received ${result}`);
        }
    }


    test("ab", "eidbaooo", true);
    test("ab", "eidboaoo", false);
}
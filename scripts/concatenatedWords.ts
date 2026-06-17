`
Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.

A concatenated word is defined as a string that is comprised entirely of at least two shorter words 
(not necessarily distinct) in the given array.

 

Example 1:

Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
"dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
Example 2:

Input: words = ["cat","dog","catdog"]
Output: ["catdog"]
`
{
    function arraysHaveSameContent(arr1: string[], arr2: string[]): boolean {
        if (arr2.length !== arr1.length) return false;
        const set1 = new Set<string>(arr1);
        const set2 = new Set<string>(arr2);

        return set1.isSubsetOf(set2) && set2.isSubsetOf(set1);
    }



    function canMakeWord(target: string, allWordsSet: Set<string>, memo: Map<string, boolean>): boolean {
        const anyMemo = memo.get(target);
        if (anyMemo !== undefined) return anyMemo;

        for (let i = 1; i < target.length; i++){
            const prefix = target.slice(0, i);
            if (!allWordsSet.has(prefix)){ 
                continue;
            } // prefix doesn't match, no match, skip

            const remainingChars = target.slice(i, target.length);
            if (allWordsSet.has(remainingChars)) {
                // console.log(`match on prefix ${prefix} and remainingChars ${remainingChars}`);
                memo.set(target, true);
                return true; 
            }// instant match
            
            // dfs remaining chars
            const canMake = canMakeWord(remainingChars, allWordsSet, memo) 
            memo.set(remainingChars, canMake);
            if (canMake) return true; // recursive match
        }
        memo.set(target, false);
        return false;
    }

    function findAllConcatenatedWordsInADict(words: string[]): string[] {
        // shorter words can not be contatenated by longer words
        const allWordsSet = new Set(words);
        const memo = new Map<string, boolean>();

        // console.log('sortedByLongest',sortedByLongest);
        const results: string[] = [];
        for (const word of words){
            allWordsSet.delete(word); // don't check self
            
            if (canMakeWord(word, allWordsSet, memo)){
                results.push(word);
            }
            allWordsSet.add(word);
        }
        return results;
    };

    function test(input: string[], expected: string[]){
        const result = findAllConcatenatedWordsInADict(input);
        if (arraysHaveSameContent(result, expected)){
            console.log(`passed ${expected}`);
        } else {
            console.log(`failed. expected ${expected} \n result ${result.toString()}`);

        }
    }

    test(
        ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"],
        ["catsdogcats","dogcatsdog","ratcatdogcat"]
    );
    // console.log(wordIsConcatenatedFrom('catdog',['dog','caat']));
    // const set = new Set(['dog', 'cat']);
    // console.log(canMakeWord('dogcat', set));
    // wordIsConcatenatedFrom()
}
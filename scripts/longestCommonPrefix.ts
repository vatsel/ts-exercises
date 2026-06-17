function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0){
        // return immediately
        return "";
    }
    let shortestWord = 200;
    for (let wordIndex=0; wordIndex < strs.length; wordIndex++ ){
        const wordLen = strs[wordIndex].length;
        if ( wordLen < shortestWord){
            shortestWord = wordLen;
            if (shortestWord === 0){
                // return immediately
                return "";
            }
        }
    }

    let commonChars = "";
    for (let charIndex=0; charIndex < shortestWord; charIndex++){
        const char = strs[0][charIndex]; 
        let isEqual = true;
        for (let wordIndex=1; wordIndex<strs.length ; wordIndex++){
            if (char !== strs[wordIndex][charIndex]){
                isEqual = false;
                break;
            }
        }
        if (isEqual){
            commonChars += char;
        } else {
            break;
        }
    }
    return commonChars;
}

function test(expected: string, input: string[]): void {
    const result = longestCommonPrefix(input);
    if (result === expected){
        console.log(`passed test ${input}.`);

    } else {
        console.log(`failed test ${input}. Received [ ${result} ] vs [ ${expected} ]`);
    }
}


test("flower", ["flower","flower","flower","flower"]);

test("fl", ["flower","flow","flight"]);
test("", ["dog","racecar","car"]);
test("", [""]);
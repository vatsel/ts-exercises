
// TASK 1 
// the reverse of the input string
function reverseString(input: string): string {
    // O(n) time, O(n) space
    // I assume the task didn't want me to use a built-in method like:
    // return input.split('').reverse().join('');
    
    let copy = "";

    for (let i = input.length - 1; i > -1; i--){
        copy += input[i];
    }

    return copy;
}



// TASK 2 
// the earliest character in the alphabet present in the input string (making a reasonable assumption as to what "earliest" means).
function getAsciiNumberOfChar(input: string): number {
    if (input.length !== 1){
        console.warn("getAsciiNumber() received an input of an odd length: ", input);
    }

    return input.toLowerCase().charCodeAt(0);
}


function getEarliestAlphabetChar(input: string): string {
    // O(n) time, O(1) space 
    // Assumption: string is ASCII

    // reduce() could have also been used to get the min value 
    // but it didn't look very readable
    /*
    const result = input.split('').reduce((a, b) => {
        if (getAsciiNumber(a) <= getAsciiNumber(b)){
            return a;
        } else {
            return b;
        }
    });
    */
    let earliestCharIndex = 0;
    let earliestCharVal = 257; // more than largest ascii char

    for (let i = 0; i < input.length; i++){
        const asciiNum = getAsciiNumberOfChar(input[i]);

        if (asciiNum < earliestCharVal){
            earliestCharVal = asciiNum;
            earliestCharIndex = i; 
        }

    }

    return input[earliestCharIndex];
}



// TASK 3
// count the number of vowels in the input string and append "open" if that number is odd, and "rent" if that number is even.
function countVowels(input: string): number {
    const VOWELS_SET : Set<string> = new Set(['a','e','i','o','u','y']);

    const splitStr = input.split('');
    let vowelsCount = 0;

    splitStr.forEach((chr:string) => {
        if (VOWELS_SET.has(chr.toLowerCase())) {
            vowelsCount++;
        }
    });

    return vowelsCount;
}

function returnOpenOrRentBasedOnVowelNum(input: string): string{
    // O(n) time, O(1) space
    const vowelsNum = countVowels(input);

    if (vowelsNum % 2 === 0){
        //even
        return 'rent';
    } else{
        //odd
        return 'open';
    }
}



function stringManip(input: string): string{
    const result = reverseString(input);
    const result2 = getEarliestAlphabetChar(input);
    const result3 = returnOpenOrRentBasedOnVowelNum(input);

    return [result, result2, result3].join('');
}


// All together now
function main(){
    const input = 'nepo';

    const result = stringManip(input);
    
    console.log("Input: ", input);
    console.log("Output: ", result);
    console.log(`================`);
}

main();


// tests 
function run_a_test(input: string, expected_output: string){
    const output = stringManip(input);
    if (expected_output === output){
        console.log(`passed test ${input}`);
    } else {
        console.log(`failed test ${input}: Output: ${output}. Expected: ${expected_output}.`);
    }
}


function test(){
    run_a_test('nepo','openerent');
    run_a_test('zzzz','zzzzzrent');
    run_a_test('zazz','zzazaopen');
    run_a_test('lorem','merolerent');
    run_a_test('aaaaaa','aaaaaaarent');
    run_a_test('aAaAaAa','aAaAaAaaopen');
    run_a_test('c','ccrent');
    run_a_test('a','aaopen');
    run_a_test('xyz','zyxxopen');
    run_a_test('XYZ','ZYXXopen');
}


test();
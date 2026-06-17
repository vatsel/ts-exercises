
// convert to integer, using ascii

// A -> 0
// B -> 1
// Z -> 25

// A    A -> 26
// 26 * 1 + 0
// 26 * (Char+1) + Char

// AR -> 43
// 26 * 1 + 17
// 26 * (Char+1) + Char


//     Y        O -> 664
// (25 * 26) + 14 = 664
// 26 * (Char+1) + Char

// Z Z -> 701
// 26 * (Char+1) + Char

// AAA -> 702
// 676 26 0 
// (26 ** 2)x(Char+1)             + (26**1) x (Char+1)             + (26**0) x Char
// 26 ** indexReversed x (Char+1) + 26 ** indexReversed x (Char+1) + 

// AAB -> 703
{
const A_VALUE_IN_ASCII = 65;

function charToAsciiNumber(input: string): number{
    return input.charCodeAt(0) - A_VALUE_IN_ASCII;
}


function reversedString(input:string): string{
    let reversed = "";
    for (let i=input.length-1; i > -1; i--){
        reversed += input[i];
    }
    return reversed;
}


function columnToInteger(input: string ): number{
    const reversed = 
}


function test(input: string, expected: number){
    const result = columnToInteger(input);
    if (result === expected){
        console.log(`passed test ${input}`);
    } else {
        console.log(`failed test ${input}. expected ${expected} got ${result}`);

    }
}

/*
test('A',0);
test('B',1);
*/

console.log(reversedString('ABC'));
}

function charToAsciiNumber(input: string): number{
    return input.charCodeAt(0) - 65;
}


function reversedString(input:string): string{
    let reversed = "";
    for (let i=input.length-1; i > -1; i--){
        reversed += input[i];
    }
    return reversed;
}


function columnToInteger(input: string ): number{
    const reversed = reversedString(input);
    let value = charToAsciiNumber(reversed[0]);

    // 26 ** indexReversed x (Char+1)
    for (let i=1; i < reversed.length; i++ ){
        const multiplier = Math.pow(26, i);
        const charValue = charToAsciiNumber(reversed[i]);
        const add = multiplier * (charValue + 1 );
        value += add;
    }

    return value;
}


function test(input: string, expected: number){
    const result = columnToInteger(input);
    if (result === expected){
        console.log(`passed test ${input}`);
    } else {
        console.log(`failed test ${input}. expected ${expected} got ${result}`);

    }
}


test('A',0);
test('B',1);
test('AR',43);
test('ZZ',701);
test('AAA',702);

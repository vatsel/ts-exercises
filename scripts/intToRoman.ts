`
Seven different symbols represent Roman numerals with the following values:

Symbol	Value
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. 
Converting a decimal place value into a Roman numeral has the following rules:

[1] If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, 
[2] append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.

[3] If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, 
for example, 4 is 1 (I) less than 5 (V): IV and 9 is 1 (I) less than 10 (X): IX. 
Only the following subtractive forms are used: 4 (IV), 9 (IX), 40 (XL), 90 (XC), 400 (CD) and 900 (CM).

Only powers of 10 (I, X, C, M) can be appended consecutively at most 3 times to represent multiples of 10. 
You cannot append 5 (V), 50 (L), or 500 (D) multiple times. If you need to append a symbol 4 times use the subtractive form.
Given an integer, convert it to a Roman numeral.

 

Example 1:

Input: num = 3749

Output: "MMMDCCXLIX"

Explanation:

3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
Example 2:

Input: num = 58

Output: "LVIII"

Explanation:

50 = L
 8 = VIII
Example 3:

Input: num = 1994

Output: "MCMXCIV"

Explanation:

1000 = M
 900 = CM
  90 = XC
   4 = IV
 

Constraints:

1 <= num <= 3999
`
{
    // function decimalToRoman(digit: number, place: number): string {
    //     if (place === 1){ 
    //         const modulo = digit % 5;
    //         console.log('mod',modulo);
    //         if (modulo === 4){
    //             return 'I' + (digit === 9 ? 'X' : 'V');
    //         }
    //         if (modulo === 0){
    //             return digit === 0 ? 'X' : 'V';
    //         }
    //         let result = digit > 4 ? 'V' : '';
    //         return result + 'I'.repeat(modulo);
    //     }
    //     if (place === 2){ 


    //     }
    // };

    const ROMAN_NUMERALS: { value: number; letter: string;}[] = [
        { value: 1000, letter: 'M' },
        { value: 500,  letter: 'D' },
        { value: 100,  letter: 'C' },
        { value: 50,   letter: 'L' },
        { value: 10,   letter: 'X' },
        { value: 5,    letter: 'V' },
        { value: 1,    letter: 'I' },
    ];

    const SUBTRACTIVE_FORMS: { value: number; letter: string;}[] = [
        { value: 900,  letter: 'CM' },
        { value: 400,  letter: 'CD' },
        { value: 90,   letter: 'XC' },
        { value: 40,   letter: 'XL' },
        { value: 9,    letter: 'IX' },
        { value: 4,    letter: 'IV' },
    ];  

    function subtractMaximal(currentNum: number): {newNumber: number, roman: string} {
        for (const romanNumeral of ROMAN_NUMERALS){
            if (romanNumeral.value <= currentNum){
                return {
                    newNumber: currentNum - romanNumeral.value, 
                    roman: romanNumeral.letter
                };
            }
        }
        throw new Error(`unexpected: not found numeral for number ${currentNum}`);
    }

    function subtractMaxSubtractive(currentNum: number): {newNumber: number, roman: string} {
        for (const romanNumeral of SUBTRACTIVE_FORMS){
            if (romanNumeral.value <= currentNum){
                return {
                    newNumber: currentNum - romanNumeral.value, 
                    roman: romanNumeral.letter
                };
            }
        }
        throw new Error(`unexpected: not found numeral for number ${currentNum}`);
    }
    
    
    function intToRoman(num: number): string {
        if (num === 0) return ''; // stop recursion

        let result = '';
        
        const isSubtractive = ["4","9"].includes(num.toString()[0]);
        const subtracted = isSubtractive ? subtractMaxSubtractive(num) : subtractMaximal(num);

        // console.log('subtracted', subtracted);
        result += subtracted.roman;
        
        return result += intToRoman(subtracted.newNumber);
    };

    function test(input: number, expected: string){
        const result = intToRoman(input);
        if(result === expected){
            console.log(`passed ${input}`);
        } else {
            console.log(`failed ${input}. Received ${result} vs expected ${expected}`);
        }
    };

    // console.log(decimalToRoman(9,1));
    // console.log(decimalToRoman(8,1));
    // console.log(decimalToRoman(7,1));
    // console.log(decimalToRoman(6,1));
    // console.log(decimalToRoman(5,1));
    // console.log(decimalToRoman(4,1));
    // console.log(decimalToRoman(3,1));
    
    // test(3749, "MMMDCCXLIX");
    // test(58, "LVIII");
    test(1994, "MCMXCIV");
}
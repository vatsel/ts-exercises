`
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:


n =2 
["(())","()()"]

1 <= n <= 8





Expected (missing):
["(())(())"]



Output: ["((()))","(()())","(())()","()(())","()()()"]
// [3] [11)]
`
{
    function nestParentheses(n: number): string{
        if (n === 0) throw new Error(`got input of zero`);
        let result = '';
        for (let i = 0; i < n; i++){
            result += '(';
        }
        for (let i = 0; i < n; i++){
            result += ')';
        }
        return result;
    }

    function generateParenthesis(n: number): string[] {
        if (n === 0) throw new Error(`got input of zero`);
        if (n === 1) return ["()"];
        if (n === 2) return ["(())","()()"];
        
        const results =  new Set<string>();

        const nested = generateParenthesis(n-1);
        for (const nestedItem of nested){
            results.add(`(${nestedItem})`);
        }


        for (let i = 1; i < n; i++){
            const left = generateParenthesis(i);
            const right = generateParenthesis(n-i);
            for (const l of left){
                for (const r of right){
                    results.add(`${l}${r}`);
                }
            }

        }
        return [...results.keys()];
    };

    // console.log(generateParenthesis(2));
    console.log(generateParenthesis(3));
    // console.log(generateParenthesis(4));
}
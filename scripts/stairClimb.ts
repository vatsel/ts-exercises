`
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

Constraints:

1 <= n <= 45
`
{
    function climbStairs(n: number): number {
        if (n <= 2){
            return n;
        }
        let prev = 1;
        let curr = 2;

        for (let i = 3; i <= n; i++){
            const next = prev + curr;
            prev = curr;
            curr = next;
        }

        return curr;
    };

    function test(input: number, expected: number){
        const result = climbStairs(input);
        if (result === expected){
            console.log(`passed ${input}`);
        } else {
            console.log(`failed ${input}. Got ${result} expected ${expected}`);
        }
    }

    // test(2, 2);
    test(3, 3);
    
}
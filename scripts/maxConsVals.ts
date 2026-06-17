`
1798. Maximum Number of Consecutive Values You Can Make

You are given an integer array coins of length n which represents the n coins that you own. The value of the ith coin is coins[i]. You can make some value x if you can choose some of your n coins such that their values sum up to x.

Return the maximum number of consecutive integer values that you can make with your coins starting from and including 0.

Note that you may have multiple coins of the same value.

 

Example 1:

Input: coins = [1,3]
Output: 2
Explanation: You can make the following values:
- 0: take []
- 1: take [1]
You can make 2 consecutive integer values starting from 0.


Example 2:

Input: coins = [1,1,1,4]
Output: 8
Explanation: You can make the following values:
- 0: take []
- 1: take [1]
- 2: take [1,1]
- 3: take [1,1,1]
- 4: take [4]
- 5: take [4,1]
- 6: take [4,1,1]
- 7: take [4,1,1,1]
You can make 8 consecutive integer values starting from 0.


Example 3:

Input: coins = [1,4,10,3,1]
Output: 20
 

Constraints:

coins.length == n
1 <= n <= 4 * 104
1 <= coins[i] <= 4 * 104

[1,89,8,1,47,34,99,1,1,1,55,89,1,52,36,1,62,1,1,1,4,27,1,45,1,1,48,1,94,1,63]
`
{
    function doesArrHaveSum(arr: number[], sum: number): boolean {
        if (arr.length === 0) return false; // empty array, skip
        if (sum <= 0) return false; // can't do non-positives
        
        const filteredElements = arr.filter(v => v <= sum).sort((a,b) => a-b);
        // console.log(`arr ${arr.toString()} filtered ${filtered.toString()}`);
        if (filteredElements.length === 0){ 
            // console.log(`nothing remained after filtering ${arr.toString()} for ${sum}`);
            return false;
        }

        let runningTally = 0;
        for (let i=0; i < filteredElements.length; i++ ){
            const item = filteredElements[i];
            if (item === sum) {
                // console.log(`found exact match of ${sum} in ${filteredElements.toString()}`);
                return true;
            }
            runningTally += item;
            if (sum === runningTally){
                // console.log(`found match by looking at running tally`);
                return true;
            }
        }
        if (runningTally < sum){
            // console.log(`filtered sum ${filteredElements} smaller than target sum ${sum}`);
            return false;
        }
        // console.log(`will recurse to find ${sum} in ${filtered.toString()}`);
        // check for: sum === any element in the array
        for (let i=0; i < filteredElements.length; i++){
            const selectedItem = filteredElements[i];

            // generate subset
            const subArr = [...filteredElements.slice(0,i), ...filteredElements.slice(i+1)];
            const subArrResult = doesArrHaveSum(subArr, sum - selectedItem);
            if (subArrResult) {
                // console.log(`found recursive result of ${sum - selectedItem} in ${subArr}`);
                return true;
            }
        }

        // no matches
        // console.log(`no matches of ${sum} in ${arr.toString()}`);
        return false;
    }

    function getMaximumConsecutive(coins: number[]): number {
        let target = 1;

        while(true){
            console.log(`iteration looking for ${target}`);

            const hasSum = doesArrHaveSum(coins, target);
            if (hasSum){
                target++;
            } else {
                return target;
            }
        }

        // console.log(`UNEXPECTED dropped out of WHILE loop `);

        return target;

        // ?APPROACH2: sort the array and then try to add up to it...
        // we do this by iterating until we find a coin larger than our target, foreach coin:
        // (easy) testing if the coin's value is equal to target
        // (easy2) if the sum of the coins up to now equal target
        //
        // once we reach a value larger than the target, we can fire off another function that checks if a diff combination works instead
        // target 7 = [1,1,1,1,2,2] adds up, but would fail our in-loop test
        // SUB QUESTION: how to see if an array of numbers adds up to a specific sum?
        // what we do here is search for a subset of numbers smaller than sum
        // we should DFS into this array by making ever smaller sets
        // how to DFS over all the combinations ? recurse via taking a different item from the array
        // DFS(item, arr without item) : target(sum-item)
    
    };



    function test(input: number[], expected: number){
        const result = getMaximumConsecutive(input);
        if (result === expected){
            console.log(`passed ${input.toString()}`);
        } else {
            console.log(`failed ${input.toString()}. Got ${result} vs expected ${expected}`);
        }
    }
    test([1,89,8,1,47,34,99,1,1,1,55,89,1,52,36,1,62,1,1,1,4,27,1,45,1,1,48,1,94,1,63], 10000);
    // console.log(doesArrHaveSum([1,1,1,4],5));
}
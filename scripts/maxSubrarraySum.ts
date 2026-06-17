`
Given an integer array nums, find the subarray with the largest sum, and return its sum.

 

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 

Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
`

{
    function maxSubArray(nums: number[]): number {
        // TODO: solve for a negative stream at the start
        if (nums.length === 1){
            return nums[0];
        }
        let largestSum = nums[0];
        let currentSum = nums[0];

        for (let i = 1; i < nums.length; i++){
            const item = nums[i];

            // console.log(`[${i}] = ${item}`);
            if (item < 0){
                if (currentSum < item){
                    currentSum = item;
                } else {
                    currentSum += item;
                }
            } else { // non-negative
                if (currentSum < 0){ // reset from here, we don't need the previous elements
                    currentSum = 0;
                }
                currentSum += item;
            }
            // console.log(`before comparison: current=${currentSum} largest=${largestSum}`);
            largestSum = Math.max(currentSum, largestSum);
        }
        return largestSum;
        
        // negative numbers subtract from the sum of the subarray, we should not include them unless their sum is smaller than the combined sum.
        // add ranges that are non-negative, then combine them if the negative range gaps are smaller than the positive sums


        // iterative solution
        // try to find the highest range / peak of numbers
        // INSIGHT: positive numbers are always useful to include in the range. 
        //      a negative number range should only be included if it brings together two adjacent, even bigger positive ranges
        //
        // METHOD
        // by going left-to-right we will iterate over array.
        // if the element is non-negative:
        //      keep adding to current sum
        // else (is negative):
        //      add to current sum
        //      if current sum > 0: 
        //          keep adding and iterating
        //      else (currentSum <= 0 ): 
        //          set currentSum = 0 (essentially discarding)
    }

    function test(input: number[], expected: number){
        const result = maxSubArray(input);
        if (result === expected){
            console.log(`passed ${input.toString()}`);

        } else {
            console.log(`failed ${input.toString()}. got ${result} expected ${expected}`);
        }
    }

    // test([-2,1,-3,4,-1,2,1,-5,4], 6);
    // test([1], 1);
    test([5,4,-1,7,8], 23);
    // test([-23,0,-7,-13,-1],0);
}
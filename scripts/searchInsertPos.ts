`
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1
Example 3:

Input: nums = [1,3,5,6], target = 7
Output: 4
 

Constraints:

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums contains distinct values sorted in ascending order.
-104 <= target <= 104
`

{
    function searchInsert(nums: number[], target: number): number {
        // binary search: get halfway index.
        let startIndex = 0;
        let endIndex = nums.length;
        let previousHalfIndex: null | number = null;
        while (true){
            const halfIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
            // console.log(` half= ${halfIndex}  start=${startIndex} end=${endIndex}`);
            if (halfIndex === previousHalfIndex){
                // can't iterate further
                // console.log(`stopped search ${halfIndex} == ${previousHalfIndex}`);
                return halfIndex;
            }

            const value = nums[halfIndex];
            if (value === target){
                return halfIndex;
            } 

            if (value > target){
                // check if value is larger than previous value
                if (halfIndex === 0){
                    // no value before, return 0
                    return 0;
                }
                if (nums[halfIndex-1] < target ){
                    // is between the 2 values
                    return halfIndex;
                }
                // go left
                endIndex = halfIndex;
            } 
            if (value < target){
                if (halfIndex === nums.length - 1){
                    // no value after, return next index
                    return nums.length;
                }
                if (target < nums[halfIndex+1]){
                    // is between the 2 values
                    return halfIndex + 1;
                }
                // go right
                startIndex = halfIndex;
            }
            // value < target, go right
            previousHalfIndex = halfIndex;
        }

    }

    function test(nums: number[], target: number, expected: number){
        const result = searchInsert(nums, target);
        if (result === expected){
            console.log(`passed ${target}.`);
        } else {
            console.log(`failed ${target}. recevied ${result} vs expected ${expected}`);
        }
    }

    // test([1,3,5,6], 5, 2);
    test([1,3,5,6], 2, 1);
    // test([1,3,5,6], 7, 4);

}
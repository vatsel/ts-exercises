/*
Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
 

Constraints:

1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.
*/
{
function search(nums: number[], target: number): number {
    if (nums.length === 0){
        return -1;
    }
    let leftSearchBound = 0;
    let rightSearchBound = nums.length;

    let searchIndex = -1;
    while (true) {
        // find middle 
        searchIndex = Math.floor(leftSearchBound + (rightSearchBound - leftSearchBound) /2);
        if (nums[searchIndex] === target){
            return searchIndex;
        }

        if (target < nums[searchIndex]){
            // safeguard going back is not out of bounds
            if (searchIndex === 0 || nums[searchIndex-1] < target){
                // can't go back in the array, or the target value does not exist
                return -1;
            }
            // select left half of array
            rightSearchBound = searchIndex;

        } else if (nums[searchIndex] < target){
            if (searchIndex === nums.length-1 || target < nums[searchIndex+1]){
                return -1;
            }
            // adjust search to select right half of array
            leftSearchBound = searchIndex;
        }

        //...loop back
    }
};

function test(inputArray: number[], inputTarget:number, expected: number){
    const result = search(inputArray, inputTarget);
    if (result === expected){
        console.log(`passed for target ${inputTarget}`);
    } else {
        console.log(`failed ${inputTarget}. Expected: ${expected} received: ${result}`)
    }
}

test([-1,0,3,5,9,12], 9, 4);
test([-1,0,3,5,9,12], 2, -1);
}
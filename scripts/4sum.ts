`
18. 4Sum
Given an array nums of n integers, 
return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.

 

Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
Example 2:

Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
 

Constraints:

1 <= nums.length <= 200
-109 <= nums[i] <= 109
-109 <= target <= 109
`
{
    function fourSum(nums: number[], target: number): number[][] {
        if (nums.length < 4) return [];

        nums.sort((a,b) => a - b );

        const quads: number[][] = [];
        for(let a = 0; a < nums.length - 3; a++){
            if (a > 0 && nums[a] === nums[a - 1]) continue;
            for (let b = a + 1; b < nums.length - 2; b++){
                if (b >  a + 1 && nums[b] === nums[b - 1]) continue;
                let left = b + 1;
                let right = nums.length - 1;
                // console.log(`${a} ${b} ${left} ${right}`);
                while (left < right){
                    const sum = nums[a] + nums[b] + nums[left] + nums[right];
                    if (sum === target){ 
                        quads.push([nums[a],nums[b],nums[left],nums[right]]);
                        left++;
                        right--;
                        while (nums[left] === nums[left -1]) left++;
                        while (left < right && nums[right] === nums[right +1]) right--;
                    }
                    else if (sum < target){
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return quads;
    };

    console.log(fourSum([2,2,2,2,2],8));
}
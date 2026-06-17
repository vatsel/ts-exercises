`
Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
`
{
    class TreeNode {
        val: number;
        left: TreeNode | null;
        right: TreeNode | null;
        constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null){
            this.val = (val===undefined ? 0 : val);
            this.left = left ?? null;
            this.right = right ?? null;
        }
    }

    

    function btreeToStr(tree: TreeNode| null): string[]{
        if (!tree){
            return [];
        }
        const row = [`(${tree.val})`];
        const nextRow = [`(${btreeToStr(tree.left)})`,`(${btreeToStr(tree.right)})`];

        return [...row, ...nextRow];
    }

    function printBtree(tree: TreeNode|null){
        const strings = btreeToStr(tree);
        for (const str of strings){
            console.log(str);
        }
    }

    function treesEqual(treeA: TreeNode|null, treeB: TreeNode|null): boolean{
        if (!treeA){
            return !treeB;
        }
        if (!treeB){
            return false;
        }

        if (treeA.val !== treeB.val){
            return false;
        }

        if (!treesEqual(treeA.left, treeB.left)){
            return false;
        }
        if (!treesEqual(treeA.right, treeB.right)){
            return false;
        }
        return true;
    }

    

    function sortedArrayToBST(nums: number[]): TreeNode | null {
        if (nums.length === 0){
            return null;
        }
        const midIndex = Math.floor(nums.length / 2);
        const leftNums = nums.slice(0,midIndex);
        const rightNums = nums.slice(midIndex+1);

        const head = new TreeNode(nums[midIndex],
            sortedArrayToBST(leftNums),
            sortedArrayToBST(rightNums)
        );

        return head;
    };

    const in1 = [-10,-3,0,5,9];
    const out1 = new TreeNode(0,
        new TreeNode(-3, new TreeNode(-10)),
        new TreeNode(9, new TreeNode(5))
    );

    function test(input: number[], expected: TreeNode| null){
        const result = sortedArrayToBST(input);
        if (treesEqual(result, expected)){
            console.log(`passed ${input}`);
        } else {
            console.log(`failed for ${input}`);
        }
    }

    test(in1, out1);
}
`
112. Path Sum
Easy

Topics
premium lock icon
Companies
Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.
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


    function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
        if (!root){
            return false;
        }

        const stack: [TreeNode, number][] = [[root, 0]];
        while (stack.length > 0){
            const item = stack.pop();
            if (item){
                const [ node, sum ] = item;
                const currentSum = sum + node.val;
                if (node.left === null && node.right === null ){
                    // is leaf node
                    if (currentSum === targetSum){
                        return true;
                    }
                }
                if (node.left !== null){
                    stack.push([node.left, currentSum]);
                }
                if (node.right !== null){
                    stack.push([node.right, currentSum]);
                }

            } else {
                console.log(`unexpected null value on the stack !`);
            }
        }

        console.log(`did not find sum.`);
        return false;
    };

    const in1 = new TreeNode(5, 
        new TreeNode(4, new TreeNode(11,
            new TreeNode(7),
            new TreeNode(2)
        )),
        new TreeNode(8,
            new TreeNode(13),
            new TreeNode(4, null, new TreeNode(1))
        )
    );

    function test(input: TreeNode|null, targetSum: number, expected: boolean){
        const result = hasPathSum(input, targetSum);
        if (result === expected){
            console.log(`passed`);
        } else {
            console.log(`failed: expected ${expected}. Got ${result}`);
        }
    }

    test(in1, 22, true);
}
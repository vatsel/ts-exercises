import { headers } from "next/headers";

`
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


    function dfsBalanced(root: TreeNode| null): [boolean, number] {
        if (!root){
            return [true, 0];
        }

        const [leftBalanced, leftLen] = dfsBalanced(root.left);
        const [rightBalanced, rightLen] = dfsBalanced(root.right);

        const isBalanced = leftBalanced && rightBalanced && Math.abs(leftLen - rightLen) < 2;

        return [isBalanced, Math.max(rightLen, leftLen)];
    }


    function isBalanced(root: TreeNode| null): boolean {
        const [result, num] = dfsBalanced(root);

        return result;
    }

    function test(input: TreeNode| null, expected: boolean){
        const result = isBalanced(input);
        if (result === expected){
            console.log('passed');
        } else {
            console.log('failed');
        }

    }

    const in1 = new TreeNode(3, 
        new TreeNode(9),
        new TreeNode(20,
            new TreeNode(15),
            new TreeNode(7)
        )
    );

    // test(in1, true);

    console.log(heightOfBTreeBranches(in1));
    

}
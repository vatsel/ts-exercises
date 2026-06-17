`
94. Binary Tree Inorder Traversal
Easy

 

Example 1:

Input: root = [1,null,2,3]

Output: [1,3,2]

Explanation:



Example 2:

Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]

Output: [4,2,6,5,7,1,3,9,8]

Explanation:



Example 3:

Input: root = []

Output: []

Example 4:

Input: root = [1]

Output: [1]

 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
 

Follow up: Recursive solution is trivial, could you do it iteratively?

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

    function printStack(heap: TreeNode[]){
        for (const item of heap){
            console.log(`item ${item.val}`);
        }
    }


    function inorderTraversal(root: TreeNode | null): number[] {
        if (!root){
            return [];
        }
        let outputList: number[] = [];


        // traverse left side recursively
        outputList.push(...inorderTraversal(root.left));

        outputList.push(root.val);

        // traverse right side recursively
        outputList.push(...inorderTraversal(root.right));

        return outputList;

    }

    function arrIsEqual(arrA: number[], arrB: number[]){
        if (arrA.length !== arrB.length){
            return false;
        }

        for (let i = 0; i < arrA.length; i++){
            if (arrA[i] !== arrB[i]){
                return false;
            }
        }

        return true;
    }


    function test(input: TreeNode, expected: number[]){
        const result = inorderTraversal(input);
        if (arrIsEqual(result, expected)){
            console.log(`passed. ${result}`);
        } else {
            console.log(`failed ! Expected ${expected}. Received ${result}`);
        }
    }

    const TREE_INPUT = new TreeNode(1, 
        null,  // left blank
        new TreeNode(2, 
            new TreeNode(3) // no children
            // right blank
        ));

    const TREE_INPUT_2 = new TreeNode(1, 
        new TreeNode(2, 
            new TreeNode(4),
            new TreeNode(5,
                new TreeNode(6),
                new TreeNode(7)
            )
        ),
        new TreeNode(3,
            null,
            new TreeNode(8, 
                new TreeNode(9)
            )
        )
    );

    test(TREE_INPUT, [1,3,2]);
    test(TREE_INPUT_2, [4,2,6,5,7,1,3,9,8]);
}
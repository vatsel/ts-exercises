

`
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

    function isMirrored(treeA: TreeNode | null, treeB: TreeNode | null ): boolean{
        if (!treeA){
            if (!treeB){
                return true;
            }
            return false;
        }
        if (!treeB){
            return false;
        }

        if (treeA.val !== treeB.val){
            return false;
        }

        if (!isMirrored(treeA.left, treeB.right)){
            return false;
        }

        if (!isMirrored(treeA.right, treeB.left)){
            return false;
        }

        return true;
    };

    function isSymmetric(root: TreeNode | null): boolean {
        if (!root){
            return false;
        }
        const leftTree = root.left;
        const rightTree = root.right;

        return isMirrored(leftTree, rightTree);
        
    
    };
    function test(in1:TreeNode| null, expected: boolean){
        const result = isSymmetric(in1);
        if (result === expected){
            console.log(`passed.`);
        } else {
            console.log(`failed. expected ${expected} received ${result}`);
        }
    };

    const IN1 = new TreeNode(1,
        new TreeNode(2,
            new TreeNode(3),
            new TreeNode(4)
        ),
        new TreeNode(2,
            new TreeNode(4),
            new TreeNode(3)
        )
    );

    test(IN1, true);
}
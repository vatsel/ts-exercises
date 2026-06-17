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

    function minDepth(root: TreeNode|null): number {
        if (!root){
            return 0;
        }

        const left = root.left ? minDepth(root.left): null;
        const right = root.right ? minDepth(root.right): null;

        if (left){
            if (right){
                return 1 + Math.min(left, right);
            } 
            return 1 + left;
        } 
        
        if (right){
            return 1 + right;
        }

        return 1;
    }

    function test(input: TreeNode|null, expected: number){
        const result = minDepth(input);
        if (result === expected){
            console.log(`passed`);
        } else {
            console.log(`failed. got ${result} expected ${expected}`);
        }
    }

    const in1 = new TreeNode(3, 
        new TreeNode(9),
        new TreeNode(20,
            new TreeNode(15),
            new TreeNode(7)
        )
    );

    test(in1, 2);
}
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
    function maxDepth(root: TreeNode | null): number {
        if (!root){
            return 0;
        }

        const left = maxDepth(root.left);
        const right = maxDepth(root.right);

        return 1 + Math.max(left, right);
    };

    function test(input: TreeNode | null, expected: number){
        const result = maxDepth(input);
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
    )
    test(in1, 3);
}
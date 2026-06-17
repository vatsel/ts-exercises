
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
    function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
        if (!p){
            if (!q){
                return true;
            }
            return false;
        }
        if (!q){
            return false;
        }

        if (p.val !== q.val){
            return false;
        }

        if(!isSameTree(p.left, q.left)){
            return false;
        }

        if (!isSameTree(p.right, q.right)){
            return false;
        }

        return true;
    };

    function test(in1:TreeNode| null, in2: TreeNode|null, expected: boolean){
        const result = isSameTree(in1, in2);
        if (result === expected){
            console.log(`passed.`);
        } else {
            console.log(`failed. expected ${expected} received ${result}`);
        }
    }

    const IN1 = new TreeNode(1,
        new TreeNode(2),
        new TreeNode(3)
    );
    const IN2 = new TreeNode(1,
        new TreeNode(3),
        new TreeNode(2)
    );

    test(IN1, IN2, false);
}
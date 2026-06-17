{
    
    /*
    Rules: 
        - the node at the top is always SMALLER OR EQUAL to any two nodes below
        - every layer of the tree occupies level * 2
    Interface: 
    1. add to tree
        - replace with top of tree
        - traverse down if needed 
    2. pop top of tree
        - pick one of the two children to move up
        - continue down 
    3. [internal] get parent from index
    4. [internal] get children indices from parent index
    */

    class MinHeap{
        dataArr: number[];

        constructor(){
            this.dataArr = [];
        }

        addToTree(item: number){
            let valToAdd = item;

            const traversePath = MinHeap._traverseChainToTargetIndex(this.dataArr.length);

            for (const nodeIndex of traversePath){
                // console.log(`traversing node ${nodeIndex}`);
                if (nodeIndex === this.dataArr.length){
                    // add node 
                    this.dataArr.push(valToAdd);
                    return;
                }

                if (valToAdd < this.dataArr[nodeIndex]){
                    // swap and continue
                    // console.log(`swapped ${nodeVal} and ${valToAdd}`)
                    const temp = this.dataArr[nodeIndex];
                    this.dataArr[nodeIndex] = valToAdd;
                    valToAdd = temp;
                }
            }
        }

        pop(): number | null {
            if (this.dataArr.length === 0) return null;
            const result = this.dataArr[0];

            const traversePath = MinHeap._traverseChainToTargetIndex(this.dataArr.length - 1);
            // console.log('traversePath', traversePath);

            traversePath.forEach((nodeIndex, index) => {
                if (index === traversePath.length -1) {
                    // now at last element. everything is already swapped, just pop() to remove
                    this.dataArr.pop();
                } else {
                    // non last elements. make a swap and make sure tree is correct
                    const nextIndex = traversePath[index + 1];
                    this.dataArr[nodeIndex] = this.dataArr[nextIndex];
                    
                    // check branch still balanced
                    const otherBranchIndex = MinHeap._getSiblingIndex(nextIndex);
                    if (this.dataArr[otherBranchIndex] < this.dataArr[nodeIndex]){
                        // swap 
                        const temp = this.dataArr[nodeIndex];
                        this.dataArr[nodeIndex] = this.dataArr[otherBranchIndex];
                        this.dataArr[otherBranchIndex] = temp;

                        // balance other (on separate branch, so it won't disturb the rest of the swaps)
                        this.rebalanceBranch(otherBranchIndex);
                    }

                }
            });

            return result;
        }

        rebalanceBranch(branchRootIndex: number) {
            const parentValue = this.dataArr[branchRootIndex];
            const leftChildIndex = branchRootIndex * 2 + 1;
            const rightChildIndex = branchRootIndex * 2 + 2;

            const leftChildValue = this.dataArr[leftChildIndex];
            const rightChildValue = this.dataArr[rightChildIndex];

            if (leftChildValue < parentValue || rightChildValue < parentValue){
                let swapIndex = leftChildIndex;
                if (rightChildValue < leftChildValue) swapIndex = rightChildIndex;

                const temp = this.dataArr[branchRootIndex];
                this.dataArr[branchRootIndex] = this.dataArr[swapIndex];
                this.dataArr[swapIndex] = temp;

                // recurse to keep the branch balanced
                this.rebalanceBranch(swapIndex);

            } // else means already balanced
        }

        static _traverseChainToTargetIndex(targetI: number): number[] {
            const result: number[] = [targetI];
            while (targetI > 0){
                targetI = (targetI - 1) >> 1;
                result.push(targetI);
            }
            return result.reverse();
        }
        
        static _getSiblingIndex(targetI: number): number {
            if (targetI < 1) throw Error(`tried to _getSiblingIndex on a root node or a negative number`);
            const modulo = targetI % 2;

            return modulo === 1 
                ? targetI + 1 // odd
                : targetI - 1; // even
        }


        static _getParentIndex(childIndex: number): number {
            return (childIndex - 1) >> 1;
        }

        static _getChildrenIndices(parentIndex: number): [number, number] {
            const base = parentIndex * 2;
            return [base + 1, base + 2];
        }
    };
    const INPUT = [1, 3,2, 3,3,1,2, 3,3,3,3,2,2,2,2, 9];

    const minHeap = new MinHeap();
    minHeap.dataArr = INPUT;
    // for (const item of INPUT){
    //     minHeap.addToTree(item);
    //     console.log(`after adding ${item}: ${minHeap.dataArr.toString()}`);
    // }
    console.log(`before pop(): ${minHeap.dataArr.toString()}`);
    minHeap.pop();
    console.log(`after pop(): ${minHeap.dataArr.toString()}`);
}
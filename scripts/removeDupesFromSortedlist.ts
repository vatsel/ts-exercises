`
Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

Input: head = [1,1,2]
Output: [1,2]

Input: head = [1,1,2,3,3]
Output: [1,2,3]

Constraints:

The number of nodes in the list is in the range [0, 300].
-100 <= Node.val <= 100
The list is guaranteed to be sorted in ascending order.
`
{

    class ListNode {
        val: number
        next: ListNode | null
        constructor(val?: number, next?: ListNode | null) {
            this.val = (val===undefined ? 0 : val)
            this.next = (next===undefined ? null : next)
        }
    }
    function deleteDuplicates(head: ListNode | null): ListNode | null {
        if (!head){
            return null;
        }
        let newHead = new ListNode(head.val, null);
        let newCurrentNode = newHead;
        let selectExistingNode: ListNode | null = head;


        while (selectExistingNode){
            // console.log(`iterating over ${selectExistingNode.val}`);
            if (selectExistingNode.val > newCurrentNode.val ){
                const newNode = new ListNode(selectExistingNode.val, null);
                newCurrentNode.next = newNode;
                newCurrentNode = newNode;
            }
            
            selectExistingNode = selectExistingNode.next;
        }
        return newHead;

        // intuition: grab the head and skip any element that's not larger than the next element
    };

    function printListNode(node: ListNode | null){
        if (!node){
            console.log('null');
            return;
        }
        let out = "[" ;
        let current: ListNode | null = node;
        while (current){
            out += current.val.toString();
            current = current.next;
            if (current) {
                out += ','
            }
        }

        out += "]";
        console.log(out);
    }

    const INPUT_A = new ListNode(1, new ListNode(1, new ListNode(2)));
    const INPUT_B = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3)))));
    const result = deleteDuplicates(INPUT_B);
    printListNode(result);

}
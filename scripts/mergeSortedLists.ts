/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:
Input: list1 = [], list2 = []
Output: []

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function listNodeToStr(list: ListNode|null): string {
    let output = '[';
    let node = list;
    while (node !== null){
        output += node.val.toString()
        node = node.next;
        if (node !== null){
            output += ',';
        }
    }
    output += ']';
    return output;
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (!list1){
        return list2;
    } 
    if (!list2){
        return list1;
    }
    
    let head: ListNode| null = null;
    if (list1.val < list2.val) {
        head = new ListNode(list1.val, null);
        list1 = list1.next ?? null;
    } else {
        head = new ListNode(list2.val, null);
        list2 = list2.next ?? null;
    }
    let current: ListNode | null = head;

    while (list1 || list2 ){
        console.log(`CURRENT LIST: ${listNodeToStr(head)}`);
        // console.log(`List1 = ${listNodeToStr(list1)}`);
        // console.log(`List2 = ${listNodeToStr(list2)}`);
        if (!list1){
            if (!list2){
                throw new Error ('unexpected null for both lists ');
            }
            // console.log(`Adding val  ${list2.val}`);
            const node = new ListNode(list2.val, list2.next);
            current.next = node;
            current = node;
            list2 = list2?.next ?? null;
            continue;
        }        
        if (!list2 || list1.val < list2.val){
            // console.log(`PICKED list1: list1.val=${list1.val} < list2.val=${list2?.val}`);
            if (!list1){
                throw new Error ('unexpected null for both lists');
            }
            // console.log(`Adding val  ${list1.val}`);
            const node = new ListNode(list1.val, list1.next);
            current.next = node;
            current = node;
            list1 = list1?.next ?? null;
            continue;
        }
        // console.log(`PICKED list2: list1.val=${list1.val} >= list2.val=${list2?.val}`);

        const node = new ListNode(list2.val, list2.next);
        current.next = node;
        current = node;
        list2 = list2?.next ?? null;
    }



    return head;
    
};

const LIST_A = new ListNode(2);
const LIST_B = new ListNode(1);



console.log(listNodeToStr(mergeTwoLists(LIST_A, LIST_B)));
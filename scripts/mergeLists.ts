/*
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.


Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted linked list:
1->1->2->3->4->4->5->6


Example 2:

Input: lists = []
Output: []


Example 3:

Input: lists = [[]]
Output: []
 

Constraints:

k == lists.length
0 <= k <= 104
0 <= lists[i].length <= 500
-104 <= lists[i][j] <= 104
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 104.
*/

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
 */

/* class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}*/

function mergeKListsDebug(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0){
    return null;
  }
  if (lists.length === 1){
    return lists[0]; // immediate return of current list
  }

  // what if all lists are empty?

  // find first min head
  let smallestVal = 105;
  let smallestIndex = -1;
  for (let i=0; i< lists.length; i++){
    const node = lists[i];
    if (node === null || node.val === undefined){
      // TODO: think of how to remove the node from the array so we don't need to check again
      continue;
    }
    if (node.val < smallestVal){
      smallestVal = node.val;
      smallestIndex = i;

    }
  }
  if (smallestIndex === -1){
    // all lists are empty
    return null;
  }
  const head = new ListNode(smallestVal, null);
  lists[smallestIndex] = lists[smallestIndex]?.next || null; // increment
  // this will need a while loop that will check if any head val was selected
  let currentNode = head;
  console.log('lists length before while loop ', lists.length);
  while (true){
    smallestVal = 105;
    smallestIndex = -1;

    for (let i =0; i < lists.length; i++){
      const selected = lists[i];
      console.log('selected ', listNodeToStr(selected), 'index ', i);

      if (selected === null || selected.val === undefined){
        continue; // exhausted listNode
      }

      if (selected.val === currentNode.val){
        //immediate match, Add !
        smallestIndex = i;
        smallestVal = selected.val;
        //reset smallest counters, break FOR loop
        console.log('SAME VAL BREAK, ', selected.val, ' ', currentNode.val, '\n');
        break;
      }

      if (selected.val < smallestVal){
        console.log('is smaller, ', selected.val, ' ', smallestVal);
        smallestVal = selected.val;
        smallestIndex = i;
      } 
    }

    if (smallestIndex === -1){
      console.log('break WHILE loop');
      // no more numbers, break WHILE loop
      break;
    } 

    console.log('ASSIGNING smallestVal ', smallestVal, ' smallestIndex ', smallestIndex,'\n ');

    // add smallest element
    currentNode.next = new ListNode(smallestVal, null);
    currentNode = currentNode.next;
    lists[smallestIndex] = lists[smallestIndex]?.next || null;
    console.log('AFTER ASSIGNMENTS ', listNodeToStr(head), '\n');
  }

  return head;
};

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0){
    return null;
  }

  // find first min head
  let smallestVal = 105;
  let smallestIndex = -1;
  for (let i=0; i< lists.length; i++){
    const node = lists[i];
    if (node === null || node.val === undefined){
      // TODO: think of how to remove the node from the array so we don't need to check again
      continue;
    }
    if (node.val < smallestVal){
      smallestVal = node.val;
      smallestIndex = i;

    }
  }
  if (smallestIndex === -1){
    // all lists are empty
    return null;
  }
  const head = new ListNode(smallestVal, null);
  lists[smallestIndex] = lists[smallestIndex]?.next || null; // increment
  // this will need a while loop that will check if any head val was selected
  let currentNode = head;
  while (true){
    smallestVal = 105;
    smallestIndex = -1;

    for (let i =0; i < lists.length; i++){
      const selected = lists[i];

      if (selected === null || selected.val === undefined){
        continue; // exhausted listNode
      }

      if (selected.val === currentNode.val){
        //immediate match, Add !
        smallestIndex = i;
        smallestVal = selected.val;
        //reset smallest counters, break FOR loop
        break;
      }

      if (selected.val < smallestVal){
        smallestVal = selected.val;
        smallestIndex = i;
      } 
    }

    if (smallestIndex === -1){
      // no more numbers, break WHILE loop
      break;
    } 


    // add smallest element
    currentNode.next = new ListNode(smallestVal, null);
    currentNode = currentNode.next;
    lists[smallestIndex] = lists[smallestIndex]?.next || null;
  }

  return head;
};


function listNodeToStr(toPrint: ListNode | null): string {
  if (toPrint === null){
    return '[]';
  }
  let current = toPrint;
  let outputStr = current.val.toString();
  while (current.next !== null){
    outputStr += '->' + current.next.val.toString();
    current = current.next;
  }
  return outputStr;
}

function test(inList: Array<ListNode | null>, expected: ListNode | null){
  const merged = mergeKLists(inList);
  if (merged === expected){
    console.log('success ', inList);
  } else {
    console.log(`failed. Result ${listNodeToStr(merged)} expected: ${listNodeToStr(expected)} `)
  }
}

const in1: Array<ListNode|null> = [
  new ListNode(1, new ListNode(4, new ListNode(5))),
  new ListNode(1, new ListNode(3, new ListNode(4))),
  new ListNode(2, new ListNode(6))
];
const res1 = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(5, new ListNode(6))))))));

const in2: Array<ListNode|null> = [
  new ListNode()
];
const res2 = new ListNode();

const in3: Array<ListNode|null> = [];
const res3 = new ListNode();


test(in1, res1);
test(in2, res2);
test(in3, res3);
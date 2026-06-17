`
Given two arrays of strings list1 and list2, find the common strings with the least index sum.

A common string is a string that appeared in both list1 and list2.

A common string with the least index sum is a common string such that if it appeared at list1[i] and list2[j] 
then i + j should be the minimum value among all the other common strings.

Return all the common strings with the least index sum. Return the answer in any order.

 

Example 1:

Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], 
list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
Output: ["Shogun"]
Explanation: The only common string is "Shogun".
Example 2:

Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], 
list2 = ["KFC","Shogun","Burger King"]
Output: ["Shogun"]
Explanation: The common string with the least index sum is "Shogun" with index sum = (0 + 1) = 1.
Example 3:

Input: list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]
Output: ["sad","happy"]
Explanation: There are three common strings:
"happy" with index sum = (0 + 1) = 1.
"sad" with index sum = (1 + 0) = 1.
"good" with index sum = (2 + 2) = 4.
The strings with the least index sum are "sad" and "happy".
 

Constraints:

1 <= list1.length, list2.length <= 1000
1 <= list1[i].length, list2[i].length <= 30
list1[i] and list2[i] consist of spaces ' ' and English letters.
All the strings of list1 are unique.
All the strings of list2 are unique.
There is at least a common string between list1 and list2.
`
{
    function arraysEqual(listA: string[], listB: string[]): boolean{
        if (listA.length !== listB.length) return false;
        for(let i = 0; i < listA.length; i++){
            if (listA[i] !== listB[i]) return false;
        }
        return true;
    }

    function findRestaurant(list1: string[], list2: string[]): string[] {
        const indexMapOne = new Map<string, number>();
        const indexMapTwo = new Map<string, number>();
        const matchMap = new Map<string, number>();
        const longestLength = Math.max(list1.length, list2.length);

        // const listOneIsLonger = list1.length > list2.length;
        let lowestIndexSum = 1001;
        for (let i =0; i < longestLength; i++){
            // console.log(`iteration ${i}: result ${result} lowestIndexSum`)
            if (lowestIndexSum < i) break;

            if (i < list1.length){
                const elemList1 = list1[i];
                indexMapOne.set(elemList1, i);
            }
            if (i < list2.length){
                const elemList2 = list2[i];
                indexMapTwo.set(elemList2, i);

                const otherIndex = indexMapOne.get(elemList2);
                if (otherIndex !== undefined) {
                    matchMap.set(elemList2, otherIndex + i);
                    if (lowestIndexSum !== 1001){
                        lowestIndexSum = otherIndex + i;
                    }
                }
            }

            // now check other side
            if (i < list1.length){
                const elemList1 = list1[i];
                const otherIndex = indexMapTwo.get(elemList1);

                if (otherIndex !== undefined){
                    matchMap.set(elemList1, otherIndex + i);
                    if (lowestIndexSum !== 1001){
                        lowestIndexSum = otherIndex + i;
                    }
                }
            }
        }
        const lowestSum = [...matchMap.values()]
            .reduce((acc, cur) => cur > acc ? acc : cur);

        const result = [...matchMap.entries()]
            .filter(([_, sum]) => sum === lowestSum)
            .map(([item, _]): string => item);

        return result;
        

    };

    function test(listA: string[], listB: string[], expected: string[]){
        const result = findRestaurant(listA, listB);
        if (arraysEqual(result, expected)){
            console.log(`passed ${expected}`);
        } else {
            console.log(`failed ${expected} !== ${result}`);
        }
    }

    // test(
    //     ["Shogun","Tapioca Express","Burger King","KFC"], 
    //     ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"], 
    //     ["Shogun"]
    // );
    test(["Shogun","Tapioca Express","Burger King","KFC"], 
        ["KFC","Burger King","Tapioca Express","Shogun"], 
        ["KFC","Burger King","Tapioca Express","Shogun"]
    );
    // test(
    //     ["Shogun","Tapioca Express","Burger King","KFC"], 
    //     ["KFC","Shogun","Burger King"], 
    //     ["Shogun"]
    // );
    // test(["happy","sad","good"], ["sad","happy","good"], ["sad","happy"]);
}
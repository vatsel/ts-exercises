`
It is a sweltering summer day, and a boy wants to buy some ice cream bars.

At the store, there are n ice cream bars. 
You are given an array costs of length n, where costs[i] is the price of the ith ice cream bar in coins. 
The boy initially has coins coins to spend, and he wants to buy as many ice cream bars as possible. 

Note: The boy can buy the ice cream bars in any order.

Return the maximum number of ice cream bars the boy can buy with coins coins.

You must solve the problem by counting sort.

 

Example 1:

Input: costs = [1,3,2,4,1], coins = 7
Output: 4
Explanation: The boy can buy ice cream bars at indices 0,1,2,4 for a total price of 1 + 3 + 2 + 1 = 7.
Example 2:

Input: costs = [10,6,8,7,7,8], coins = 5
Output: 0
Explanation: The boy cannot afford any of the ice cream bars.
Example 3:

Input: costs = [1,6,3,1,2,5], coins = 20
Output: 6
Explanation: The boy can buy all the ice cream bars for a total price of 1 + 6 + 3 + 1 + 2 + 5 = 18.
 

Constraints:

costs.length == n
1 <= n <= 105
1 <= costs[i] <= 105
1 <= coins <= 108
`
{
    function maxIceCream(costs: number[], coins: number): number {
        // simpler implemntation

        // costs.sort((a,b) => a-b);
        // let spent = 0;
        // for (let i =0; i < costs.length; i++){
        //     const cost = costs[i];
        //     if (coins < spent + cost) return i;
        //     spent += cost;
        // }
        // return costs.length;
        

        // counting sort implementation

        const maxCost = Math.max(...costs);
        const itemsCount = Array<number>(maxCost+1).fill(0);
        for (const cost of costs){ 
            if (cost <= coins) itemsCount[cost]++;
        }

        let spentCoins = 0;
        let boughtItems = 0;
        for (let i =1; i <= coins; i++){
            if (i >= itemsCount.length) break;

            const unspentCoins = coins - spentCoins;
            if (unspentCoins < i) break; // can't afford anything anymore

            const availableItems = itemsCount[i];
            if (availableItems === 0) continue;
            const canBuyTotal = availableItems * i;
            if (unspentCoins < canBuyTotal){
                const canAffordItems = Math.floor(unspentCoins / i);
                return boughtItems + canAffordItems;
                // calculate final
            } else {
                // buy all
                boughtItems += availableItems;
                spentCoins += canBuyTotal;
            }
        }
        return boughtItems;
    };
}
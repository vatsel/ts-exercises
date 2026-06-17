`

You are given an m x n integer matrix grid and an array queries of size k.

Find an array answer of size k such that for each integer queries[i] 
you start in the top left cell of the matrix and repeat the following process:

If queries[i] is strictly greater than the value of the current cell that you are in, 
then you get one point if it is your first time visiting this cell, 
and you can move to any adjacent cell in all 4 directions: up, down, left, and right.

Otherwise, you do not get any points, and you end this process.

After the process, answer[i] is the maximum number of points you can get. 
Note that for each query you are allowed to visit the same cell multiple times.

Return the resulting array answer.
`
{
    type CellData = {
        value: number;
        row: number;
        col: number;
    }

    class CellMinHeap {
        data: CellData[];

        constructor(){
            this.data = [];
        }

        peek(): number {
            if (this.data[0] === undefined) return -1;
            return this.data[0].value;
        }

        static _getPath(toIndex: number): number[]{
            const path = [toIndex];
            while (toIndex > 0){
                toIndex =  (toIndex - 1) >> 1
                path.push(toIndex);
            }
            return path.reverse();
        }

        addItem(value: number, row: number, col: number){
            let cellData: CellData = { value, row, col };

            const indicesPath = CellMinHeap._getPath(this.data.length);
            for (const index of indicesPath){
                if (index === this.data.length){
                    // it's a new element, place at the end
                    this.data.push(cellData);
                    break;
                } 

                if (value < this.data[index].value){
                    // swap
                    const temp = this.data[index];
                    this.data[index] = cellData;
                    cellData = temp;
                } // else, continue traversing down the path 
            }
        }

        rebalanceTree(parentIndex: number) {
            const dataArrLength = this.data.length;
            
            while (parentIndex < dataArrLength){
                const leftChild = parentIndex * 2 + 1;
                if (leftChild >= dataArrLength) return; // no children
                
                const rightChild = parentIndex * 2 + 2;
                let targetSwapIndex = leftChild;
                if (rightChild < dataArrLength && this.data[rightChild].value < this.data[leftChild].value){
                    targetSwapIndex = rightChild;
                }
                if (this.data[parentIndex].value < this.data[targetSwapIndex].value) return; // is already balanced
                
                const swap = this.data[parentIndex];
                this.data[parentIndex] = this.data[targetSwapIndex];
                this.data[targetSwapIndex] = swap;

                parentIndex = targetSwapIndex;
            }
        }

        pop(): CellData | null {
            if (this.data.length === 0) return null;
            const valToReturn = this.data[0];

            // safe to shrink
            const last = this.data.pop()!; 
            
            // check if there's any elements left after pop()
            if (this.data.length > 0){ 
                // move last element to root and rebalance
                this.data[0] = last;             
                this.rebalanceTree(0);           
            }

            return valToReturn;
        }
    }

    function runQuery(grid: number[][], query: number, visited: Set<string>, frontier: CellMinHeap): number {

        const coordsToStr =(row: number, col: number): string => {
            return `${row},${col}`;
        }

        const getValidNeighbours = (row: number, col: number): [number,number][] => {
            const result: [number, number][] = [];
            //above
            if (grid[row-1] && !visited.has(coordsToStr(row-1, col))) result.push([row-1, col]);
            //below
            if (grid[row+1] && !visited.has(coordsToStr(row+1, col))) result.push([row+1, col]);
            //right
            if (grid[row][col+1] && !visited.has(coordsToStr(row, col+1))){ result.push([row, col+1]);}
            //left
            if (grid[row][col-1] && !visited.has(coordsToStr(row, col-1))) result.push([row, col-1]);

            return result;
        }
        

        while (frontier.peek() !== -1 && frontier.peek() < query){

            const nextVal = frontier.pop();
            if (nextVal === null) throw new Error(`unexpected null value after successfull peek()`);

            const { row, col } = nextVal;
            if (visited.has(coordsToStr(row, col))) continue;
            
            // see if we can add any neighbours to the frontier
            const validNeighbours = getValidNeighbours(row, col);
            for (const neighbour of validNeighbours){
                frontier.addItem(grid[neighbour[0]][neighbour[1]], neighbour[0], neighbour[1]);
            }
            visited.add(coordsToStr(row, col));
        }

        return visited.size;
    }

    function maxPoints(grid: number[][], queries: number[]): number[] {
        const total = grid.length * grid[0].length;
        const sortedOrder = [...queries.keys()].sort((a,b) => queries[a] - queries[b]);
        
        
        const visited = new Set<string>();
        const frontier = new CellMinHeap();
        frontier.addItem(grid[0][0], 0, 0);
        const scores = new Array<number>(queries.length).fill(0);

        let score = 0, prev = -1;
        for (const index of sortedOrder){
            const query = queries[index];
            if (query === prev || visited.size === total){
                scores[index] = score;
                continue;
            }

            prev = query;
            score = runQuery(grid, query, visited, frontier);
            scores[index] = score;
        };

        return scores;
    };
    const GRID = [[444424,409221,703419,11307,578382,330430,522887,38831,267101,315541,148425,360873],[353160,3217,718922,509568,494803,327636,715882,456279,374061,701863,711832,644822],[459535,264294,246310,405317,275802,948618,449015,176733,921040,56692,632708,556696],[167402,594284,8377,766746,728202,329140,399028,907843,68783,149661,244321,861358],[727577,582470,946680,222674,152875,128658,389710,581164,512061,367464,883657,78004],[463513,473823,328325,888670,267782,435621,153221,877511,900231,72761,825121,532939],[992835,33883,587426,680675,674055,682929,750368,241142,241026,369751,462134,785672],[915635,918034,398025,400424,695630,594801,748962,278900,705889,570212,42410,823342],[644602,961002,489119,606936,327139,664880,455045,231423,114466,315707,25092,961268],[962857,647428,139005,221262,469484,669734,66022,473118,258066,67408,545435,316643],[977028,938186,277400,756609,491213,704014,292941,392893,280499,650462,270100,477276],[393574,562825,637562,639836,8932,540799,758836,403682,79851,17885,851550,499020],[403665,119906,305796,88211,759076,441097,164887,709599,194,468995,922288,359913],[696749,265394,517399,161062,512967,205098,814158,627951,286474,763625,370987,798077],[166098,940946,871758,690278,903705,368584,576209,94794,25522,255261,209835,540769],[8088,89612,457088,492467,511285,900536,734726,683046,515695,14749,988608,977041],[76149,112648,515127,257871,912674,880020,32805,688253,722582,931114,734057,939655],[395351,377494,543729,368629,913310,69242,737795,849175,870860,278493,575561,111787]];
    const QUERIES = [483649,690923,317026,408761,985459,619592,287085,302896,241756,557463,914140,994632,511904,377570,272415,840485,578955,797418,609746,388421,517504,170621,188489,169881,466574];
    
    const results = maxPoints(GRID, QUERIES);
    console.log(`results ${results.toString()} length = ${results.length}`);
    // console.log(runQuery(GRID, 2));
}
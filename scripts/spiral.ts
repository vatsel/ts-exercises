`
Spiral(n) => (x, y)
Spiral(0) => (0, 0)
Spiral(2) => (1, 1)
Spiral(6) => (-1, -1)
Spiral(10) => (0, 2)
`
{
    function positionIsEqual(posA: [number, number], posB: [number, number]){
        return posA[0] === posB[0] && posA[1] === posB[1];
    }

    function distanceToZero(x:number,y:number):number{
        return Math.sqrt(Math.pow(x,2)+ Math.pow(y,2));
    } 


    function getNextPosInPrefOrder(
        currentPosition: [number, number]
    ): [number, number][]{
        const [x,y] = currentPosition;
        

        const up: [number, number] = [x, y+1];
        const down: [number, number] = [x, y-1];
        const left: [number, number] = [x-1, y];
        const right: [number, number] = [x+1, y];

        const ordered = [up,down,left,right].toSorted((itemA, itemB) => 
            distanceToZero(itemA[0], itemA[1]) - distanceToZero(itemB[0], itemB[1])
        );
        return ordered;
    }


    function spiral(step: number): [number, number]{
        if (step === 0){
            return [0,0];
        }

        const traversedSet: Set<string> = new Set(["0,0"]);

        let currentPosition: [number, number] = [0,0];
        for (let i = 1; i <= step; i++){
            const preferredPositions = getNextPosInPrefOrder(currentPosition);
            const prefStr = preferredPositions.map((pos) => {
                const asStr = `${pos[0]},${pos[1]}`;
                const isInSet = traversedSet.has(asStr) ? 'X' : '';
                return `[${asStr}]${isInSet} `;
            }
            ).join('');
            console.log(`current: ${currentPosition}.`);
            console.log(`Preferred next ${prefStr}`);
            
            for (const prefPos of preferredPositions){
                const asStr = `${prefPos[0]},${prefPos[1]}`;

                if (!traversedSet.has(asStr)){
                    currentPosition = prefPos;
                    traversedSet.add(asStr);

                    console.log(`walked to [${i}] ${currentPosition}`);
                    break;
                }
            }
        }
        
        return currentPosition;
    }

    function test(input: number, expected: [number, number]){
        const result = spiral(input);
        if (positionIsEqual(result, expected)){
            console.log(`passed ${input}`);
        } else {
            console.log(`failed ${input}. Received ${result}, expected ${expected}`);
        }
    }



    // console.log(getNextPosInPrefOrder([-1,0]));
    test(10, [0,2]);
}
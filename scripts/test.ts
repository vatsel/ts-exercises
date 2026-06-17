
// (X, Y)


function spiral(input: number): [number, number]{
    if (input === 0){
        return [0,0];
    }
    const existingPoints = new Set<[number, number]>();
    let currentPosition: [number, number] = [0,0];

    // current position 
    // preferrable would be the point closest to the center
    // output the 4 options in an array
    // see if they're blocked (exist in a set) ranked of desirability
    // pick the first one not in the set


    for (let i= 1; i < input; i++ ) {
        // should it be smaller or do we finish on the last one?
        // currentPosition [x,y] -> 4 neighours
        const neighbours = [
            [currentPosition[0] + 1, currentPosition[1]], // top
            [currentPosition[0], currentPosition[1] -1 ],  // bottom
            [currentPosition[0], currentPosition[1]],  // right
            [currentPosition[0], currentPosition[1]]  // left
            // left
            // right
        ];
        // const desiredPosition: [number, number] = 

        // my goal: go as close as possible to the start

        // if I can't go to my preferred point (because it's in existingPoints)

        // i will select another point based on the spiral heuristic (up, right, down, left)
        if (!existingPoints.has(desiredPosition)){
            return desiredPosition;
        }

    }
    throw new Error('could not find point');

}


console.log(spiral(0));



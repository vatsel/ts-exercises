{type Dep = [string, string]; // [step, dependency]


const dependencies: Dep[] = [
    ["mix", "weigh"],
    ["heat", "mix"],
    ["test_viscosity", "heat"],
    ["test_color", "heat"],
    ["package", "test_viscosity"],
    ["package", "test_color"],
];



function findOrder(deps: Dep[]): string[]{
    // we get an order like [a,b]
    // we traverse the chain to find a match for either element
    // once we find an element, we will then insert behind or in front
    if (deps.length === 0){
        throw new Error('empty input');
    }

    let order: string[] = deps[0];

    const remainingDeps: string[][] = deps.slice(1);
    for (const dep of remainingDeps){
        for (let orderIndex = 0; orderIndex < order.length; orderIndex++){
            const item = order[orderIndex];
            if (item === dep[0]){
                // we need to insert after:
                order = order.toSpliced(orderIndex+1, 0, dep[1]);
                
                break;
                
            } else if (item === dep[1]){
                // we need to insert before: 
                order = order.toSpliced(orderIndex, 0, dep[0]);
                
                break;
            }
        }


    }


    console.log(order);
}

console.log(findOrder(dependencies));

}

// image we are at 1 and we need to insert BEFORE

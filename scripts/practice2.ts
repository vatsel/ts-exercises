{
    const csvData = `project,scientist,temperature,viscosity,yield
    Adhesive,alice@lab.com,120.5,340.2,89.1
    Adhesive,bob@lab.com,125.0,,92.3
    Coating,alice@lab.com,110.0,280.5,
    Adhesive,alice@lab.com,118.0,350.0,87.5`;

    type ColumnStats = {
        min: number;
        max: number;
        mean: number;
        count: number;
    }

    function summarize(csvString: string): Record<string, ColumnStats> {
        const dividedByLine = csvString.split('\n');
        const headers = dividedByLine[0].split(',');
        const valueLines: string[] = dividedByLine.slice(1);
        const valueMatrix: string[][] = valueLines.map(line => line.split(','));
        console.log(headers);
        console.log(valueMatrix);

        // iterate over each column and if you can coerce to number, add it to the stats
        const allColStats: Record<string, ColumnStats> = {};

        for (const colIndex in headers){
            console.log(headers[colIndex]);
            const valArray: number[] = [];
            for (const rowIndex in valueMatrix) {
                const value = valueMatrix[rowIndex][colIndex];
                if (!value){
                    continue;
                }
                const asNum = Number(value);
                if (!!asNum){
                    valArray.push(asNum);
                }
            }
            if (valArray.length > 1){
                console.log(valArray);
                const min = Math.min(...valArray);
                const max = Math.max(...valArray);
                const sum = valArray.reduce((total, value) => total+value, 0 );
                const mean = Math.round(sum / valArray.length * 100) / 100;
                const count = valArray.length;

                const colStats: ColumnStats = {
                    min, max, mean, count
                };
                
                allColStats[headers[colIndex]] = colStats;

            }
        }
        return allColStats;
        

    }
    console.log(summarize(csvData));
}

{
    type Ingredient = {
    name: string;
    value: number;
  }


  type Experiment = Ingredient[];

  const EXPERIMENTS = [
    [["Polymer A", 30.0], ["Filler B", 10.01]],
    [["Filler B", 10.0], ["Polymer A", 30.0]], 
    [["Polymer A", 30.0], ["Filler B", 15.0]], 
    [["Resin C", 50.0]],
    [["Resin C", 50.0]], 
  ];

  const SOLVED = [
    [["Polymer A", 30.0], ["Filler B", 10.0]], 
    [["Polymer A", 30.0], ["Filler B", 15.0]], 
    [["Resin C", 50.0]]
  ];


  function dataToExperiments(data: (string | number)[][][]): Experiment[]{
    return data.map(
      (outerArr) => {
        return outerArr.map(
          (innerArr) => {
            return {
              name: innerArr[0] as string, 
              value: innerArr[1] as number}
          }
        );
      }
    );
  }

  const E_OBJ = dataToExperiments(EXPERIMENTS);
  const SOLVED_OBJ = dataToExperiments(SOLVED);

  function ingredientsToHash(ingredients: Ingredient[]): string{
    const sorted = ingredients.toSorted(
      (a,b) => a.name.localeCompare(b.name)
    );
    const asStr: string = sorted.flatMap((ingredient) => (ingredient.name + ingredient.value.toString())).join('');
    return asStr;
  }


  function roundIngredientsToTolerance(ingredients: Ingredient[]): Ingredient[]{
    const rounded: Ingredient[] = [];
    for (const { name, value } of ingredients){
      const roundedIngredient: Ingredient = {
        name,
        value: Math.round(value * 100) / 100
      }
      rounded.push(roundedIngredient);
    }
    return rounded;
  }


  function deduplicate(experiments: Experiment[]): Experiment[]{
    const hashSet = new Set<string>();
    const uniques: Experiment[] = [];
    for (const experiment of experiments){
      const rounded = roundIngredientsToTolerance(experiment);
      const hashed = ingredientsToHash(rounded);
      console.log(`DEBUG: ${hashed}`);
      if (!hashSet.has(hashed)){
        hashSet.add(hashed);
        uniques.push(experiment);
      }   
    }
    return uniques;
  }


  const result = deduplicate(E_OBJ);
  console.log(result);
}



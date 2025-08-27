export interface Ingredient {
  id: number;
  description: string;
}

export interface Step {
  id: number;
  description: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  steps: Step[];
}

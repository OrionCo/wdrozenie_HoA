export interface Recipe {
  _id: string;
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  _id: string;
  name: string;
  quantity: string;
}

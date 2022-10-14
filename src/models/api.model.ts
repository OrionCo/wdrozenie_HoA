export interface recipe {
  _id: string;
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients: ingredient[];
}

export interface ingredient {
  _id: string;
  name: string;
  quantity: string;
}

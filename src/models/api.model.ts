export namespace apiModel {
  export interface recipe {
    _id: string;
    name: string;
    preparationTimeInMinutes: number;
    description: string;
    ingredients: ingredients[];
  }

  export interface ingredients {
    _id: string;
    name: string;
    quantity: string;
  }
}

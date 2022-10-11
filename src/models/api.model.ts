export namespace apiModel {
  interface recipe {
    _id: string;
    name: string;
    preparationTimeInMinutes: number;
    description: string;
    ingredients: ingredients[];
  }

  interface ingredients {
    _id: string;
    name: string;
    quantity: string;
  }
}

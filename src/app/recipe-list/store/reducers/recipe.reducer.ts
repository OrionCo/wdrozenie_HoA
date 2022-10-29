import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/models/api.model';
import {
  addRecipe,
  addRecipeFail,
  addRecipeSuccess,
  deleteRecipe,
  deleteRecipeFail,
  deleteRecipeSuccess,
  getRecipe,
  getRecipeFail,
  getRecipes,
  getRecipesFail,
  getRecipesSuccess,
  updateRecipe,
  updateRecipeFail,
  updateRecipeSuccess,
} from '../actions/recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipeReducer = createReducer(
  initialState,
  on(
    getRecipes,
    getRecipe,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    (state): RecipeState => {
      return { ...state, loading: true };
    }
  ),
  on(
    getRecipesFail,
    addRecipeFail,
    deleteRecipeFail,
    updateRecipeFail,
    getRecipeFail,
    (state, { error }): RecipeState => {
      return {
        ...state,
        loading: false,
        error: new HttpErrorResponse({ error }),
      };
    }
  ),
  on(getRecipesSuccess, (state, { recipes }): RecipeState => {
    return { ...state, recipes, loading: false, error: null };
  }),
  on(deleteRecipeSuccess, (state, { removedRecipe }): RecipeState => {
    const filteredRecipes = state.recipes.filter(
      (recipe) => recipe._id !== removedRecipe._id
    );
    console.log(`REMOVED::: ${removedRecipe}`);

    return {
      ...state,
      recipes: filteredRecipes,
      loading: false,
    };
  }),
  on(addRecipeSuccess, (state, { recipe }): RecipeState => {
    const recipes = [...state.recipes, recipe];
    console.log(`ADDED::: ${recipe}`);
    return { ...state, recipes, loading: false };
  }),
  on(updateRecipeSuccess, (state, { recipe }): RecipeState => {
    const recipes = state.recipes.map(
      (oldRecipe) =>
        state.recipes.find((item) => item._id === recipe._id) || oldRecipe
    );
    console.log(`UPDATED::: ${recipe}`);
    console.log(`RECIPES:::`, recipes);
    return { ...state, recipes };
  })
);

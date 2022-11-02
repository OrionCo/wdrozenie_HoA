import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/models/api.model';
import { RecipeListActions } from '../actions/recipe.actions';

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
    RecipeListActions.getAllRecipes,
    RecipeListActions.getSingleRecipe,
    RecipeListActions.addRecipe,
    RecipeListActions.deleteRecipe,
    RecipeListActions.updateRecipe,
    (state): RecipeState => {
      return { ...state, loading: true };
    }
  ),
  on(
    RecipeListActions.getAllRecipesFail,
    RecipeListActions.getSingleRecipeFail,
    RecipeListActions.addRecipeFail,
    RecipeListActions.deleteRecipeFail,
    RecipeListActions.updateRecipeFail,
    (state, { error }): RecipeState => {
      return {
        ...state,
        loading: false,
        error: new HttpErrorResponse({ error }),
      };
    }
  ),
  on(
    RecipeListActions.getAllRecipesSuccess,
    (state, { recipes }): RecipeState => {
      return { ...state, recipes, loading: false, error: null };
    }
  ),
  on(
    RecipeListActions.deleteRecipeSuccess,
    (state, { removedRecipe }): RecipeState => {
      const filteredRecipes = state.recipes.filter(
        (recipe) => recipe._id !== removedRecipe._id
      );

      return {
        ...state,
        recipes: filteredRecipes,
        loading: false,
      };
    }
  ),
  on(RecipeListActions.addRecipeSuccess, (state, { recipe }): RecipeState => {
    const recipes = [...state.recipes, recipe];
    console.log(`ADDED::: ${recipe}`);
    return { ...state, recipes, loading: false };
  }),
  on(
    RecipeListActions.updateRecipeSuccess,
    (state, { recipe }): RecipeState => {
      const recipes = state.recipes.map(
        (oldRecipe) =>
          state.recipes.find((item) => item._id === recipe._id) || oldRecipe
      );
      console.log(`UPDATED::: ${recipe}`);
      console.log(`RECIPES:::`, recipes);
      return { ...state, recipes };
    }
  )
);

import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from 'src/models/api.model';
import { RecipeListActions } from '../actions/recipe.actions';

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  loaded: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: RecipeState = {
  recipes: [],
  loading: false,
  loaded: false,
  error: null,
};

export const recipeReducer = createReducer(
  initialState,
  on(
    RecipeListActions.getAllRecipes,
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
        loaded: false,
        error: new HttpErrorResponse({ error }),
      };
    }
  ),
  on(
    RecipeListActions.getAllRecipesSuccess,
    (state, { recipes }): RecipeState => {
      return { ...state, recipes, loading: false, loaded: true, error: null };
    }
  ),
  on(
    RecipeListActions.deleteRecipeSuccess,
    (state, { recipeId }): RecipeState => {
      const filteredRecipes = state.recipes.filter(
        (recipe) => recipe._id !== recipeId
      );

      return {
        ...state,
        recipes: filteredRecipes,
        loading: false,
        loaded: true,
        error: null,
      };
    }
  ),
  on(RecipeListActions.addRecipeSuccess, (state, { recipe }): RecipeState => {
    const recipes = [...state.recipes, recipe];

    return {
      ...state,
      recipes,
      loading: false,
      loaded: true,
      error: null,
    };
  }),
  on(
    RecipeListActions.updateRecipeSuccess,
    (state, { recipe }): RecipeState => {
      const recipes = state.recipes.map(
        (oldRecipe) =>
          state.recipes.find((item) => item._id === recipe._id) || oldRecipe
      );

      return { ...state, recipes, loading: false, loaded: true, error: null };
    }
  )
);

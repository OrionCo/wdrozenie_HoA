import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/models/api.model';

// create recipe

export const addRecipe = createAction('[Recipe List] Add Recipe');

export const addRecipeSuccess = createAction(
  '[Recipe List] Add RecipeSuccess',
  props<{ recipe: Recipe }>()
);

export const addRecipeFail = createAction(
  '[Recipe List] Add Recipe Fail',
  props<{ error: HttpErrorResponse }>()
);

// update recipe

export const updateRecipe = createAction('[Recipe List] Update Recipe');

export const updateRecipeSuccess = createAction(
  '[Recipe List] Update Recipe',
  props<{ recipe: Recipe }>()
);

export const updateRecipeFail = createAction(
  '[Recipe List] Update Recipe',
  props<{ error: HttpErrorResponse }>()
);

// delete recipe

export const deleteRecipe = createAction(
  '[Recipe List] Delete Recipe',
  props<{ recipeId: string }>()
);

export const deleteRecipeSuccess = createAction(
  '[Recipe List] Delete Recipe Success',
  props<{ removedRecipe: Recipe }>()
);

export const deleteRecipeFail = createAction(
  '[Recipe List] Delete Recipe Fail',
  props<{ error: HttpErrorResponse }>()
);

// get recipes

export const getRecipes = createAction('[Recipe List/API] Get Recipes');

export const getRecipesSuccess = createAction(
  '[Recipe List/API] Get Recipes Success',
  props<{ recipes: Recipe[] }>()
);

export const getRecipesFail = createAction(
  '[Recipe List/API] Get Recipes Fail',
  props<{ error: HttpErrorResponse }>()
);

// view single recipe

export const getRecipe = createAction('[Recipe List/API] Get Single Recipe');

export const getRecipeSuccess = createAction(
  '[Recipe List/API] Get Single Recipe Success',
  props<{ recipe: Recipe }>()
);

export const getRecipeFail = createAction(
  '[Recipe List/API] Get Single Recipe Fail',
  props<{ error: HttpErrorResponse }>()
);

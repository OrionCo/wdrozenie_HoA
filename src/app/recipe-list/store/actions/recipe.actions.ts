import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Recipe } from 'src/models/api.model';

export const RecipeListActions = createActionGroup({
  source: 'Recipe List',
  events: {
    // fetch all recipes
    'Get All Recipes': emptyProps(),
    'Get All Recipes Success': props<{ recipes: Recipe[] }>(),
    'Get All Recipes Fail': props<{ error: HttpErrorResponse }>(),

    // view single recipe
    'Get Single Recipe': props<{ recipeId: string }>(),
    'Get Single Recipe Success': props<{ recipe: Recipe }>(),
    'Get Single Recipe Fail': props<{ error: HttpErrorResponse }>(),

    // add recipe
    'Add Recipe': props<{ recipe: Recipe }>(),
    'Add Recipe Success': props<{ recipe: Recipe }>(),
    'Add Recipe Fail': props<{ error: HttpErrorResponse }>(),

    // update recipe
    'Update Recipe': props<{ recipe: Recipe }>(),
    'Update Recipe Success': props<{ recipe: Recipe }>(),
    'Update Recipe Fail': props<{ error: HttpErrorResponse }>(),

    // delete recipe
    'Delete Recipe': props<{ recipeId: string }>(),
    'Delete Recipe Success': props<{ recipeId: string }>(),
    'Delete Recipe Fail': props<{ error: HttpErrorResponse }>(),

    // filter recipes
    'Filter Recipes': props<{ value: string }>(),
  },
});

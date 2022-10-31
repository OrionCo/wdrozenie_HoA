import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Recipe } from 'src/models/api.model';
import { RecipeListActions } from '../actions/recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(
    private _actions$: Actions,
    private _recipeService: RecipeService,
    private _snackbar: SnackbarService,
    private _router: Router
  ) {}

  getRecipes$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(
        RecipeListActions.getAllRecipes,
        RecipeListActions.deleteRecipeSuccess,
        RecipeListActions.addRecipeSuccess,
        RecipeListActions.updateRecipeSuccess
      ),
      switchMap(() =>
        this._recipeService.getRecipes().pipe(
          map((recipes: Recipe[]) =>
            RecipeListActions.getAllRecipesSuccess({ recipes })
          ),
          catchError((error: HttpErrorResponse) =>
            of(RecipeListActions.getAllRecipesFail({ error }))
          )
        )
      )
    );
  });

  getSingleRecipe$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(RecipeListActions.getSingleRecipe),
      switchMap((action) =>
        this._recipeService.fetchRecipe(action.recipeId).pipe(
          map((recipe: Recipe) =>
            RecipeListActions.getSingleRecipeSuccess({ recipe })
          ),
          catchError((error: HttpErrorResponse) =>
            of(RecipeListActions.getSingleRecipeFail({ error }))
          )
        )
      )
    );
  });

  createRecipe$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(RecipeListActions.addRecipe),
      switchMap((action) =>
        this._recipeService.createRecipe(action.recipe).pipe(
          map((recipe: Recipe) =>
            RecipeListActions.addRecipeSuccess({ recipe })
          ),
          catchError((error: HttpErrorResponse) =>
            of(RecipeListActions.addRecipeFail(error))
          )
        )
      )
    );
  });

  updateRecipe$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(RecipeListActions.updateRecipe),
      switchMap((action) =>
        this._recipeService.updateRecipe(action.recipe).pipe(
          map((recipe: Recipe) =>
            RecipeListActions.updateRecipeSuccess({ recipe })
          ),
          catchError((error: HttpErrorResponse) =>
            of(RecipeListActions.updateRecipeFail(error))
          )
        )
      )
    );
  });

  deleteRecipe$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(RecipeListActions.deleteRecipe),
      switchMap((action) =>
        this._recipeService.deleteRecipe(action.recipeId).pipe(
          map((removedRecipe) => {
            this._snackbar.open('Successfully deleted recipe.');
            this._router.navigate(['/']);
            return RecipeListActions.deleteRecipeSuccess({ removedRecipe });
          }),
          catchError((error: HttpErrorResponse) => {
            this._snackbar.open('Failed to delete recipe.', false);
            return of(RecipeListActions.deleteRecipeFail({ error }));
          })
        )
      )
    );
  });
}

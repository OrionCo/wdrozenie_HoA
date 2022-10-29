import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import * as fromActions from '../actions/recipe.actions';

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
        fromActions.getRecipes,
        fromActions.deleteRecipeSuccess,
        fromActions.addRecipeSuccess,
        fromActions.updateRecipeSuccess
      ),
      switchMap(() =>
        this._recipeService.getRecipes().pipe(
          map((recipes) => fromActions.getRecipesSuccess({ recipes })),
          catchError((error: HttpErrorResponse) =>
            of(fromActions.getRecipesFail({ error }))
          )
        )
      )
    );
  });

  deleteRecipe$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(fromActions.deleteRecipe),
      switchMap((action) =>
        this._recipeService.deleteRecipe(action.recipeId).pipe(
          map((removedRecipe) => {
            this._snackbar.open('Successfully deleted recipe.');
            this._router.navigate(['/']);
            return fromActions.deleteRecipeSuccess({ removedRecipe });
          }),
          catchError((error: HttpErrorResponse) => {
            this._snackbar.open('Failed to delete recipe.', false);
            return of(fromActions.deleteRecipeFail({ error }));
          })
        )
      )
    );
  });
}

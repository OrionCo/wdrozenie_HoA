import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, first, map, of, switchMap } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { RootFacade } from 'src/app/store/facades/root.facade';
import { Recipe } from 'src/models/api.model';
import { RecipeListActions } from '../actions/recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(
    private _actions$: Actions,
    private _recipeService: RecipeService,
    private _snackbar: SnackbarService,
    private _router: Router,
    private _rootFacade: RootFacade
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
          catchError((error: HttpErrorResponse) => {
            this._snackbar.open('Failed to fetch recipes.', false);
            return of(RecipeListActions.getAllRecipesFail({ error }));
          })
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
          catchError((error: HttpErrorResponse) => {
            this._snackbar.open('Failed to create recipe.', false);
            return of(RecipeListActions.addRecipeFail(error));
          })
        )
      )
    );
  });

  updateRecipe$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(RecipeListActions.updateRecipe),
      switchMap((action) => {
        return this._recipeService.updateRecipe(action.recipe).pipe(
          map((recipe: Recipe) =>
            RecipeListActions.updateRecipeSuccess({ recipe })
          ),
          catchError((error: HttpErrorResponse) => {
            this._snackbar.open('Failed to update recipe.', false);
            return of(RecipeListActions.updateRecipeFail(error));
          })
        );
      })
    );
  });

  deleteRecipe$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(RecipeListActions.deleteRecipe),
      switchMap((action) =>
        this._recipeService.deleteRecipe(action.recipeId).pipe(
          map(() =>
            RecipeListActions.deleteRecipeSuccess({ recipeId: action.recipeId })
          ),
          catchError((error: HttpErrorResponse) => {
            this._snackbar.open('Failed to delete recipe.', false);
            return of(RecipeListActions.deleteRecipeFail({ error }));
          })
        )
      )
    );
  });

  deleteRecipeSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(RecipeListActions.deleteRecipeSuccess),
        switchMap((action) =>
          this._rootFacade.routerIdParam$.pipe(
            map((id) => {
              this._snackbar.open('Successfully deleted recipe.');
              if (id == action.recipeId) {
                this._router.navigate(['/']);
              }
            }),
            first()
          )
        )
      );
    },
    { dispatch: false }
  );

  editedResourceSuccess$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(
          RecipeListActions.addRecipeSuccess,
          RecipeListActions.updateRecipeSuccess
        ),
        map((action) => {
          this._router.navigate(['/recipe', action.recipe._id]);
          if (action.type === RecipeListActions.addRecipeSuccess.type) {
            this._snackbar.open('Successfully created recipe.');
          } else {
            this._snackbar.open('Successfully updated recipe.');
          }
        })
      );
    },
    { dispatch: false }
  );
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RecipeListActions } from 'src/app/recipe-list/store/actions/recipe.actions';
import {
  selectRecipeList,
  getLoadingStatus,
} from 'src/app/recipe-list/store/selectors/recipe.selectors';
import { Recipe } from 'src/models/api.model';

@Injectable()
export class RecipeFacade {
  constructor(private _store: Store) {}

  getAllRecipes() {
    this._store.dispatch(RecipeListActions.getAllRecipes());
  }

  getSingleRecipe(recipeId: string) {
    this._store.dispatch(RecipeListActions.getSingleRecipe({ recipeId }));
  }

  addRecipe(recipe: Recipe) {
    this._store.dispatch(RecipeListActions.addRecipe({ recipe }));
  }

  updateRecipe(recipe: Recipe) {
    this._store.dispatch(RecipeListActions.updateRecipe({ recipe }));
  }

  deleteRecipe(recipeId: string) {
    this._store.dispatch(RecipeListActions.deleteRecipe({ recipeId }));
  }

  selectRecipes(): Observable<Recipe[]> {
    return this._store.select(selectRecipeList);
  }

  getLoadingStatus(): Observable<boolean> {
    return this._store.select(getLoadingStatus);
  }
}
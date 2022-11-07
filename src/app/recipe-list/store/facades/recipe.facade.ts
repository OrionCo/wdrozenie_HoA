import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RecipeListActions } from 'src/app/recipe-list/store/actions/recipe.actions';
import {
  selectRecipeList,
  selectLoadingStatus,
  selectRecipe,
  selectRecipesLoaded,
  selectFilteredRecipes,
} from 'src/app/recipe-list/store/selectors/recipe.selectors';
import { Recipe } from 'src/models/api.model';

@Injectable()
export class RecipeFacade {
  recipes$: Observable<Recipe[]> = this._store.select(selectRecipeList);
  loading$: Observable<boolean> = this._store.select(selectLoadingStatus);
  loaded$: Observable<boolean> = this._store.select(selectRecipesLoaded);
  recipe$: Observable<Recipe | undefined> = this._store.select(selectRecipe);
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

  filterRecipes(searchValue: string) {
    return this._store.select(selectFilteredRecipes(searchValue));
  }
}

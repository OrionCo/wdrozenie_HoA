import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from '../reducers/recipe.reducer';

// eslint-disable-next-line @ngrx/prefix-selectors-with-select
export const getRecipesState = createFeatureSelector<RecipeState>('recipes');

export const selectRecipeList = createSelector(
  getRecipesState,
  (state: RecipeState) => state.recipes
);

export const getLoadingStatus = createSelector(
  getRecipesState,
  (state: RecipeState) => state.loading
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from 'src/app/store/reducers/root.reducer';
import { Recipe } from 'src/models/api.model';
import { RecipeState } from '../reducers/recipe.reducer';

export const selectRecipesState = createFeatureSelector<RecipeState>('recipes');

export const selectRecipeList = createSelector(
  selectRecipesState,
  (state: RecipeState) => state.recipes
);

export const selectLoadingStatus = createSelector(
  selectRecipesState,
  (state: RecipeState) => state.loading
);

export const selectRecipesLoaded = createSelector(
  selectRecipesState,
  (state: RecipeState) => state.loaded
);

export const selectRecipe = createSelector(
  selectRecipeList,
  selectRouterState,
  (recipes, router): Recipe | undefined => {
    const recipeId = router.state.params['id'];
    return recipes.find((recipe) => recipe._id == recipeId);
  }
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from 'src/app/store/reducers/root.reducer';
import { Ingredient, Recipe } from 'src/models/api.model';
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

export const selectRecipeFromRoute = createSelector(
  selectRecipeList,
  selectRouterState,
  (recipes, router): Recipe | undefined => {
    const recipeId = router.state.params['id'];
    return recipes.find((recipe) => recipe._id == recipeId);
  }
);

export const selectFilteredRecipes = (searchValue: string) =>
  createSelector(selectRecipeList, (recipes) => {
    if (searchValue) {
      searchValue = searchValue.toLowerCase();
      return recipes.filter(
        (recipe: Recipe) =>
          recipe.ingredients.filter((ingredient: Ingredient) =>
            ingredient.name.includes(searchValue)
          ).length || recipe.name.includes(searchValue)
      );
    } else {
      return recipes;
    }
  });

export const selectRecipeById = (id: string) =>
  createSelector(selectRecipeList, (recipes: Recipe[]) => {
    return recipes.find((recipe: Recipe) => recipe._id === id);
  });

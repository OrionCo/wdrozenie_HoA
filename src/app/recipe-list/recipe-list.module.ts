import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list.component';
import { RECIPE_LIST_SMARTS } from './_smart-components';
import { RECIPE_LIST_DUMBS } from './_dumb-components';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './store/reducers/recipe.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './store/effects/recipe.effects';

@NgModule({
  declarations: [
    RecipeListComponent,
    ...RECIPE_LIST_SMARTS,
    ...RECIPE_LIST_DUMBS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('recipes', recipeReducer),
    EffectsModule.forFeature([RecipeEffects]),
  ],
  exports: [RecipeListComponent, ...RECIPE_LIST_SMARTS, ...RECIPE_LIST_DUMBS],
})
export class RecipeListModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from './recipe-list.component';
import { RECIPE_LIST_SMARTS } from './_smart-components';
import { RECIPE_LIST_DUMBS } from './_dumb-components';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    RecipeListComponent,
    ...RECIPE_LIST_SMARTS,
    ...RECIPE_LIST_DUMBS,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [RecipeListComponent, ...RECIPE_LIST_SMARTS, ...RECIPE_LIST_DUMBS],
})
export class RecipeListModule {}

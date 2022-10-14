import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from './_smart-components/create-recipe/create-recipe.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateRecipeComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

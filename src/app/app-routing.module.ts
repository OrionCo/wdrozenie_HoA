import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './details/_smart-components/recipe-form/recipe-form.component';
import { DetailsComponent } from './details/details.component';
import { ViewRecipeComponent } from './details/_dumb-components/view-recipe/view-recipe.component';
import { HomeComponent } from './details/_dumb-components/home/home.component';
import { RecipeGuard } from './services/recipe.guard';

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'create',
        component: RecipeFormComponent,
      },
      {
        path: 'recipe/:id',
        component: ViewRecipeComponent,
        pathMatch: 'prefix',
        canActivate: [RecipeGuard],
      },
      {
        path: 'recipe/edit/:id',
        component: RecipeFormComponent,
        pathMatch: 'prefix',
        canActivate: [RecipeGuard],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

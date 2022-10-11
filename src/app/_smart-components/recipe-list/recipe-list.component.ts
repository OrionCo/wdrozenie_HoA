import { Component, OnInit } from '@angular/core';
import { apiModel } from '../../../models/api.model';
import { filter, first, map, Observable } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes$?: Observable<apiModel.recipe[]>;
  recipes?: apiModel.recipe[] = [
    {
      _id: '1',
      name: 'recipe1',
      preparationTimeInMinutes: 2,
      description: 'desc',
      ingredients: [],
    },
    {
      _id: '2',
      name: 'recipe2',
      preparationTimeInMinutes: 2,
      description: 'desc',
      ingredients: [],
    },
    {
      _id: '3',
      name: 'recipe3',
      preparationTimeInMinutes: 2,
      description: 'desc',
      ingredients: [],
    },
  ];
  filteredRecipes?: apiModel.recipe[];
  selectedRecipe$?: Observable<apiModel.recipe>;

  constructor(private _recipeService: RecipeService) {}

  ngOnInit(): void {
    // this._getRecipes();
    this.filteredRecipes = this.recipes;
  }

  filterRecipes(value: string): void {
    // this.recipes = this.recipes!.pipe(
    //   map((recipes) => recipes.filter((recipe) => recipe.name == value))
    // );
    if (!value) {
      // this._getRecipes();
      this.filteredRecipes = this.recipes;
    } else {
      value = value.toLowerCase();
      this.filteredRecipes = this.recipes!.filter((recipe) =>
        recipe.name.includes(value)
      );
    }
  }

  private _getRecipes(): void {
    this.recipes$ = this._recipeService.getRecipes();
    this.recipes$?.pipe(first()).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
    });
  }

  fetchRecipe(recipeId: string): void {
    console.log('event invoked - recipeId: ', recipeId);
    this.selectedRecipe$ = this._recipeService.fetchRecipe(recipeId);
  }
}

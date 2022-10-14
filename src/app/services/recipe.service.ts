import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, first, Observable, tap } from 'rxjs';
import { recipe } from 'src/models/api.model';

@Injectable()
export class RecipeService {
  recipesSubject$: BehaviorSubject<recipe[]> = new BehaviorSubject<recipe[]>(
    []
  );
  recipes$: Observable<recipe[]> = this.recipesSubject$.asObservable();
  selectedRecipeSubject$: BehaviorSubject<recipe | null> =
    new BehaviorSubject<recipe | null>(null);
  selectedRecipe$: Observable<recipe | null> =
    this.selectedRecipeSubject$.asObservable();

  constructor(private _http: HttpClient) {}

  createRecipe(data: recipe): void {
    this._http
      .post<recipe>('recipe', data)
      .pipe(
        first(),
        finalize(() => this.getRecipes())
      )
      .subscribe();
  }

  getRecipes(): void {
    this._http
      .get<recipe[]>('recipe')
      .pipe(first())
      .subscribe({
        next: (recipes: recipe[]) => this.recipesSubject$.next(recipes),
      });
  }

  fetchRecipe(recipeId: string): void {
    this._http
      .get<recipe>(`recipe/${recipeId}`)
      .pipe(first())
      .subscribe({
        next: (recipe: recipe) => this.selectedRecipeSubject$.next(recipe),
      });
  }

  deleteRecipe(recipeId: string): void {
    this._http
      .delete<recipe>(`recipe/${recipeId}`)
      .pipe(
        first(),
        finalize(() => this.getRecipes())
      )
      .subscribe();
  }
}

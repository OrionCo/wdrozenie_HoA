import { Injectable } from '@angular/core';
import { apiModel } from '../../models/api.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, first, Observable, tap } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesSubject$: BehaviorSubject<apiModel.recipe[]> = new BehaviorSubject<
    apiModel.recipe[]
  >([]);
  recipes$: Observable<apiModel.recipe[]> = this.recipesSubject$.asObservable();
  selectedRecipeSubject$: BehaviorSubject<apiModel.recipe | null> =
    new BehaviorSubject<apiModel.recipe | null>(null);
  selectedRecipe$: Observable<apiModel.recipe | null> =
    this.selectedRecipeSubject$.asObservable();

  constructor(private _http: HttpClient) {}

  createRecipe(data: apiModel.recipe): void {
    this._http
      .post<apiModel.recipe>('recipe', data)
      .pipe(
        first(),
        finalize(() => this.getRecipes())
      )
      .subscribe();
  }

  getRecipes(): void {
    this._http
      .get<apiModel.recipe[]>('recipe')
      .pipe(first())
      .subscribe({
        next: (recipes: apiModel.recipe[]) =>
          this.recipesSubject$.next(recipes),
      });
  }

  fetchRecipe(recipeId: string): void {
    this._http
      .get<apiModel.recipe>(`recipe/${recipeId}`)
      .pipe(first())
      .subscribe({
        next: (recipe: apiModel.recipe) =>
          this.selectedRecipeSubject$.next(recipe),
      });
  }

  deleteRecipe(recipeId: string): void {
    this._http
      .delete<apiModel.recipe>(`recipe/${recipeId}`)
      .pipe(
        first(),
        finalize(() => this.getRecipes())
      )
      .subscribe();
  }
}

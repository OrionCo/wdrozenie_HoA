import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { Recipe } from 'src/models/api.model';

@Injectable()
export class RecipeService {
  recipesSubject$: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>(
    []
  );
  recipes$: Observable<Recipe[]> = this.recipesSubject$.asObservable();
  selectedRecipeSubject$: BehaviorSubject<Recipe | null> =
    new BehaviorSubject<Recipe | null>(null);
  selectedRecipe$: Observable<Recipe | null> =
    this.selectedRecipeSubject$.asObservable();

  constructor(private _http: HttpClient) {}

  createRecipe(data: Recipe): Observable<Recipe> {
    return this._http
      .post<Recipe>('recipe', data)
      .pipe(
        switchMap((recipe: Recipe) => this.getRecipes().pipe(map(() => recipe)))
      );
  }

  updateRecipe(data: Recipe): Observable<Recipe> {
    return this._http
      .put<Recipe>(`recipe/${data._id}`, data)
      .pipe(
        switchMap((recipe: Recipe) => this.getRecipes().pipe(map(() => recipe)))
      );
  }

  deleteRecipe(recipeId: string): Observable<Recipe> {
    return this._http.delete<Recipe>(`recipe/${recipeId}`);
  }

  getRecipes(): Observable<Recipe[]> {
    return this._http
      .get<Recipe[]>('recipe')
      .pipe(tap((recipes: Recipe[]) => this.recipesSubject$.next(recipes)));
  }

  fetchRecipe(recipeId: string): Observable<Recipe> {
    return this._http
      .get<Recipe>(`recipe/${recipeId}`)
      .pipe(tap((recipe: Recipe) => this.selectedRecipeSubject$.next(recipe)));
  }
}

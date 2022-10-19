import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, first, Observable, of, tap } from 'rxjs';
import { Recipe } from 'src/models/api.model';
import { SnackbarService } from './snackbar.service';

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

  constructor(private _http: HttpClient, private _snackBar: SnackbarService) {}

  createRecipe(data: Recipe): Observable<Recipe> {
    return this._http.post<Recipe>('recipe', data).pipe(first());
  }

  updateRecipe(data: Recipe, recipeId: string): Observable<Recipe> {
    return this._http.put<Recipe>(`recipe/${recipeId}`, data);
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

  deleteRecipe(recipeId: string): Observable<Recipe> {
    return this._http.delete<Recipe>(`recipe/${recipeId}`);
  }
}

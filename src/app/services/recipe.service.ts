import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { Recipe } from 'src/models/api.model';

@Injectable()
export class RecipeService {
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
    return this._http.get<Recipe[]>('recipe');
  }

  fetchRecipe(recipeId: string): Observable<Recipe> {
    return this._http.get<Recipe>(`recipe/${recipeId}`);
  }
}

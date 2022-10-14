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

  createRecipe(data: apiModel.recipe): Observable<apiModel.recipe> {
    return this._http.post<apiModel.recipe>('recipe', data).pipe(first());
  }

  updateRecipe(
    data: apiModel.recipe,
    recipeId: string
  ): Observable<apiModel.recipe> {
    return this._http.put<apiModel.recipe>(`recipe/${recipeId}`, data);
  }

  getRecipes(): Observable<apiModel.recipe[]> {
    return this._http
      .get<apiModel.recipe[]>('recipe')
      .pipe(
        tap((recipes: apiModel.recipe[]) => this.recipesSubject$.next(recipes))
      );
  }

  fetchRecipe(recipeId: string): Observable<apiModel.recipe> {
    return this._http
      .get<apiModel.recipe>(`recipe/${recipeId}`)
      .pipe(
        tap((recipe: apiModel.recipe) =>
          this.selectedRecipeSubject$.next(recipe)
        )
      );
  }

  deleteRecipe(recipeId: string): Observable<apiModel.recipe> {
    return this._http.delete<apiModel.recipe>(`recipe/${recipeId}`);
  }
}

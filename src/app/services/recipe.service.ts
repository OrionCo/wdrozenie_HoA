import { Injectable } from '@angular/core';
import { apiModel } from '../../models/api.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(private _http: HttpClient) {}

  getRecipes(): Observable<apiModel.recipe[]> {
    return this._http.get<apiModel.recipe[]>('recipe');
  }

  fetchRecipe(recipeId: string): Observable<apiModel.recipe> {
    return this._http.get<apiModel.recipe>(`recipe/${recipeId}`);
  }
}

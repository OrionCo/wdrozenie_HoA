import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Recipe } from 'src/models/api.model';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';

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

  constructor(
    private _http: HttpClient,
    private _snackBar: SnackbarService,
    private _router: Router
  ) {}

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
    return this._http.get<Recipe[]>('recipe').pipe(
      tap((recipes: Recipe[]) => this.recipesSubject$.next(recipes)),
      catchError((err) => {
        console.warn(err);
        this._snackBar.open('Failed to fetch recipes.', false);
        this._router.navigate(['/home']);
        return EMPTY;
      })
    );
  }

  fetchRecipe(recipeId: string): Observable<Recipe> {
    return this._http.get<Recipe>(`recipe/${recipeId}`).pipe(
      tap((recipe: Recipe) => this.selectedRecipeSubject$.next(recipe)),
      catchError((err) => {
        console.warn(err);
        this._snackBar.open('Failed to fetch recipe.', false);
        this._router.navigate(['/home']);
        return EMPTY;
      })
    );
  }
}

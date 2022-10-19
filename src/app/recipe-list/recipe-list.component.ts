import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/api.model';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  recipes$?: Observable<Recipe[]> = this._recipeService.recipes$;

  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private _snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this._recipeService
      .getRecipes()
      .pipe(first())
      .subscribe({
        error: (err) => {
          this._snackBar.open('Failed to fetch recipes.', false);
          console.warn(err);
        },
      });
  }

  filterRecipes(value: string): void {
    if (!value) {
      this.recipes$ = this._recipeService.recipes$;
    } else {
      value = value.toLowerCase();
      this.recipes$ = this._recipeService.recipes$!.pipe(
        map((recipes) =>
          recipes.filter((recipe) => recipe.name?.includes(value))
        )
      );
    }
  }

  fetchRecipe(recipeId: string): void {
    this._router.navigate(['/recipe/', recipeId]);
  }

  deleteRecipe(recipeId: string): void {
    this._recipeService
      .deleteRecipe(recipeId)
      .pipe(first())
      .subscribe({
        next: () => {
          this._snackBar.open('Successfully deleted recipe.');
          this._router.navigate(['/']);
        },
        error: (err) => {
          this._snackBar.open('Failed to delete recipe.', false);
          console.warn(err);
        },
      });
  }
}

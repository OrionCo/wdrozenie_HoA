import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { apiModel } from '../../models/api.model';
import { finalize, first, map, Observable, tap } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  recipes$?: Observable<apiModel.recipe[]> = this._recipeService.recipes$;

  constructor(private _recipeService: RecipeService, private _router: Router) {}

  ngOnInit(): void {
    this._recipeService.getRecipes().pipe(first()).subscribe();
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
      .pipe(
        first(),
        finalize(() => {
          this._recipeService.getRecipes()?.pipe(first()).subscribe();
        })
      )
      .subscribe();
  }
}

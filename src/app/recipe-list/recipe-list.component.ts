import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/api.model';
import { RecipeFacade } from './store/facades/recipe.facade';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]> = this._recipeFacade.recipes$;
  loading$: Observable<boolean> = this._recipeFacade.loading$;

  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private _recipeFacade: RecipeFacade
  ) {}

  ngOnInit(): void {
    this._recipeFacade.getAllRecipes();
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
    this._recipeFacade.deleteRecipe(recipeId);
  }
}

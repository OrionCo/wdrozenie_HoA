import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/api.model';
import { Store } from '@ngrx/store';
import { deleteRecipe, getRecipes } from './store/actions/recipe.actions';
import {
  getLoadingStatus,
  selectRecipeList,
} from './store/selectors/recipe.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;
  loading$!: Observable<boolean>;

  constructor(
    private _recipeService: RecipeService,
    private _router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getRecipes());
    this.recipes$ = this.store.select(selectRecipeList);
    this.loading$ = this.store.select(getLoadingStatus);
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
    this.store.dispatch(deleteRecipe({ recipeId }));
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { recipe } from 'src/models/api.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes$?: Observable<recipe[]>;
  filteredRecipes$?: Observable<recipe[]>;
  selectedRecipe$?: Observable<recipe | null>;
  destroy$!: Subject<boolean>;

  constructor(
    private _recipeService: RecipeService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._getRecipes();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  filterRecipes(value: string): void {
    if (!value) {
      this.filteredRecipes$ = this.recipes$;
    } else {
      value = value.toLowerCase();
      this.filteredRecipes$ = this.recipes$!.pipe(
        map((recipes) =>
          recipes.filter((recipe) => recipe.name?.includes(value))
        )
      );
    }
  }

  private _getRecipes(): void {
    this._recipeService.getRecipes();
    this.recipes$ = this._recipeService.recipes$;
    this.filteredRecipes$ = this._recipeService.recipes$;
    this._cdr.detectChanges();
  }

  fetchRecipe(recipeId: string): void {
    this._recipeService.fetchRecipe(recipeId);
    this.selectedRecipe$ = this._recipeService.selectedRecipe$;
  }

  deleteRecipe(recipeId: string): void {
    this._recipeService.deleteRecipe(recipeId);
  }
}

import { Directive, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, Observable, Subject } from 'rxjs';
import { Recipe } from 'src/models/api.model';
import { RecipeFacade } from '../recipe-list/store/facades/recipe.facade';
import { RecipeService } from '../services/recipe.service';
import { SnackbarService } from '../services/snackbar.service';

@Directive()
export abstract class AbstractRecipeComponent implements OnDestroy {
  protected _recipeService: RecipeService = inject(RecipeService);
  protected _route: ActivatedRoute = inject(ActivatedRoute);
  protected _snackBar: SnackbarService = inject(SnackbarService);
  protected _recipeFacade: RecipeFacade = inject(RecipeFacade);

  recipeId?: string;
  destroy$: Subject<boolean> = new Subject();
  recipeData$: Observable<Recipe | undefined> =
    this._recipeFacade.viewedRecipe$.pipe(first());
  recipeData?: Recipe | null;
  editMode: boolean = false;

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

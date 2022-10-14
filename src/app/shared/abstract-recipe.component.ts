import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Recipe } from 'src/models/api.model';
import { RecipeService } from '../services/recipe.service';

@Directive()
export abstract class AbstractRecipeComponent implements OnInit, OnDestroy {
  recipeId?: string;
  destroy$: Subject<boolean> = new Subject();
  recipeData$?: Observable<Recipe | null> = this._recipeService.selectedRecipe$;
  recipeData?: Recipe | null;
  editMode: boolean = false;

  constructor(
    protected _recipeService: RecipeService,
    protected _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          this.recipeId = params['id'];
          if (this.recipeId) {
            this.editMode = true;
            return this._recipeService.fetchRecipe(params['id']);
          } else {
            this.editMode = false;
            return of(null);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

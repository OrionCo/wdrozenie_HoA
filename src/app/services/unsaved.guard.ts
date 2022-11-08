import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { first, of, switchMap } from 'rxjs';
import { Recipe } from 'src/models/api.model';
import { RecipeFormComponent } from '../details/_smart-components/recipe-form/recipe-form.component';
import { RecipeFacade } from '../recipe-list/store/facades/recipe.facade';
import { DialogService } from './dialog.service';

@Injectable()
export class UnsavedGuard implements CanDeactivate<RecipeFormComponent> {
  private _dialog: DialogService = inject(DialogService);
  private _recipeFacade: RecipeFacade = inject(RecipeFacade);

  canDeactivate(component: RecipeFormComponent) {
    if (component.editMode && component.recipeData) {
      return this._recipeFacade.selectRecipe(component.recipeData._id).pipe(
        switchMap(() => {
          const formData: Recipe = {
            ...component.form.getRawValue(),
            _id: component.recipeData!._id,
          };

          if (
            JSON.stringify(formData) !== JSON.stringify(component.recipeData)
          ) {
            return this._dialog.confirm();
          }

          return of(true);
        }),
        first()
      );
    } else {
      return component.form.dirty || component.form.touched
        ? this._dialog.confirm()
        : of(true);
    }
  }
}

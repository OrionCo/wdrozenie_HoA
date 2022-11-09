import { inject, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { of } from 'rxjs';
import { RecipeFormComponent } from '../details/_smart-components/recipe-form/recipe-form.component';
import { DialogService } from './dialog.service';

@Injectable()
export class UnsavedGuard implements CanDeactivate<RecipeFormComponent> {
  private _dialog: DialogService = inject(DialogService);

  canDeactivate(component: RecipeFormComponent) {
    return component.form.dirty ? this._dialog.confirm() : of(true);
  }
}

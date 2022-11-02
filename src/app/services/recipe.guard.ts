import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { catchError, filter, first, Observable, of, switchMap } from 'rxjs';
import { RecipeFacade } from '../recipe-list/store/facades/recipe.facade';

@Injectable()
export class RecipeGuard implements CanActivate {
  constructor(private _recipeFacade: RecipeFacade) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  // check if recipes have loaded, only let the user go to route if they have

  checkStore(): Observable<boolean> {
    return this._recipeFacade.loaded$.pipe(
      filter((loaded: boolean) => loaded),
      first()
    );
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectRouteIdParam } from '../reducers/root.reducer';

@Injectable()
export class RootFacade {
  constructor(private _store: Store) {}

  routerIdParam$ = this._store.select(selectRouteIdParam);
}

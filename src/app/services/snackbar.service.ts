import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  open(message: string, success: boolean = true, action?: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['mat-toolbar', success ? 'mat-success' : 'mat-warn'],
    });
  }
}

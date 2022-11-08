import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class DialogService {
  constructor(private _dialog: MatDialog) {}

  confirm(): Observable<boolean> {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> =
      this._dialog.open<ConfirmationDialogComponent>(
        ConfirmationDialogComponent
      );

    return dialogRef.afterClosed();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject();
  result: boolean = false;
  constructor(private _dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  ngOnInit(): void {
    this._dialogRef
      .beforeClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this._dialogRef.close(this.result));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  return(result: boolean): void {
    this.result = result;
    this._dialogRef.close(result);
  }
}

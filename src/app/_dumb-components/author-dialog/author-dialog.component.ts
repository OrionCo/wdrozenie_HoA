import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { dialogModel } from '../../../models/dialog.model';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss'],
})
export class AuthorDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogModel.dialogData
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}

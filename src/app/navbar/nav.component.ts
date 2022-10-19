import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { dialogModel } from '../../models/dialog.model';
import { AuthorDialogComponent } from './_dumb-components/author-dialog/author-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  @Input() appTitle!: string;

  author: dialogModel.dialogData = {
    name: 'Wincenty',
    lastName: 'Korobacz',
    age: 22,
    slogan: 'I like cooking yummy code.',
  };

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(AuthorDialogComponent, {
      data: this.author,
      width: '500px',
    });
  }
}

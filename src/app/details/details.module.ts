import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DETAILS_DUMBS } from './_dumb-components';
import { DETAILS_SMARTS } from './_smart-components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DetailsComponent } from './details.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [...DETAILS_DUMBS, ...DETAILS_SMARTS, DetailsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterOutlet,
  ],
  exports: [...DETAILS_DUMBS, ...DETAILS_SMARTS],
})
export class DetailsModule {}

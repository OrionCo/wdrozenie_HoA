import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { DETAILS_DUMBS } from './_dumb-components';
import { DETAILS_SMARTS } from './_smart-components';
import { DETAILS_PIPES } from './pipes';
import { DetailsComponent } from './details.component';

@NgModule({
  declarations: [
    ...DETAILS_DUMBS,
    ...DETAILS_SMARTS,
    ...DETAILS_PIPES,
    DetailsComponent,
  ],
  imports: [CommonModule, FormsModule, RouterOutlet, SharedModule],
  exports: [...DETAILS_DUMBS, ...DETAILS_SMARTS],
})
export class DetailsModule {}

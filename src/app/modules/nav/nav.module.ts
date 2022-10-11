import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NAV_DUMBS } from './_dumb-components';
import { NAV_SMARTS } from './_smart-components';

@NgModule({
  declarations: [...NAV_DUMBS, ...NAV_SMARTS],
  imports: [CommonModule],
})
export class NavModule {}

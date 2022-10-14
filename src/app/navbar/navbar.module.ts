import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { NAVBAR_DUMBS } from './_dumb-components';
import { NAVBAR_SMARTS } from './_smart-components';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [NavComponent, ...NAVBAR_DUMBS, ...NAVBAR_SMARTS],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
  ],
  exports: [NavComponent, ...NAVBAR_DUMBS, ...NAVBAR_SMARTS],
})
export class NavbarModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { APP_SERVICES } from './services';
import { APP_INTERCEPTORS } from './interceptors';
import { NavComponent } from './_smart-components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorDialogComponent } from './_dumb-components/author-dialog/author-dialog.component';

@NgModule({
  declarations: [AppComponent, NavComponent, AuthorDialogComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [APP_SERVICES, APP_INTERCEPTORS],
  bootstrap: [AppComponent],
})
export class AppModule {}

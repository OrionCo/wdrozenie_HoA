import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { NavModule } from './modules/nav/nav.module';
import { APP_SERVICES } from './services';
import { APP_INTERCEPTORS } from './interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterOutlet, NavModule],
  providers: [APP_SERVICES, APP_INTERCEPTORS],
  bootstrap: [AppComponent],
})
export class AppModule {}

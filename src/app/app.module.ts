import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { APP_SERVICES } from './services';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { RecipeListModule } from './recipe-list/recipe-list.module';
import { DetailsModule } from './details/details.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavbarModule,
    RecipeListModule,
    DetailsModule,
    SharedModule,
  ],
  providers: [
    APP_SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

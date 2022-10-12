import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { APP_SERVICES } from './services';
import { APP_INTERCEPTORS } from './interceptors';
import { NavComponent } from './_smart-components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthorDialogComponent } from './_dumb-components/author-dialog/author-dialog.component';
import { RecipeListComponent } from './_smart-components/recipe-list/recipe-list.component';
import { RecipeTileComponent } from './_dumb-components/recipe-tile/recipe-tile.component';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { CreateRecipeComponent } from './_smart-components/create-recipe/create-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthorDialogComponent,
    RecipeListComponent,
    RecipeTileComponent,
    CreateRecipeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    APP_SERVICES,
    APP_INTERCEPTORS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

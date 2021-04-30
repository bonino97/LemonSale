import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from 'src/app/app-routing.module';

import { AuthModule } from 'src/app/auth/auth.module';
import { NavbarModule } from 'src/app/shared/modules/navbar/navbar.module';
import { GlobalFeedModule } from 'src/app/global-feed/global-feed.module';
import { YourFeedModule } from 'src/app/your-feed/your-feed.module';
import { TagFeedModule } from 'src/app/tag-feed/tag-feed.module';
import { ArticleModule } from 'src/app/article/article.module';

import { AppComponent } from 'src/app/app.component';

import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { AuthInterceptorService } from 'src/app/shared/services/auth-interceptor.service';
import { CreateArticleModule } from 'src/app/create-article/create-article.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    NavbarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
  ],
  providers: [
    PersistenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

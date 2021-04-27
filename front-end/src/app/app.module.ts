import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { NavbarModule } from 'src/app/shared/modules/navbar/navbar.module';
import { GlobalFeedModule } from 'src/app/global-feed/global-feed.module';

import { PersistenceService } from 'src/app/shared/services/persistence.service';
import { AuthInterceptorService } from 'src/app/shared/services/auth-interceptor.service';

import { AppComponent } from 'src/app/app.component';

import { environment } from 'src/environments/environment';

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

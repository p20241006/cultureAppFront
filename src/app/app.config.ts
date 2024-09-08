import {
  ApplicationConfig,
  importProvidersFrom,
  makeEnvironmentProviders,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {AuthService} from "./auth/auth.service";
import {InMemoryAuthService} from "./auth/in.memory-auth.service";
import {AuthHttpInterceptor} from "./auth/auth.http.interceptor";
import {environment} from "../environments/environment";
import {AuthMode} from "./auth/auth.enum";
import {FirebaseAuthService} from "./auth/firebase-auth.service";
import {authFactory} from "./auth/auth.factory";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([AuthHttpInterceptor])),
    provideFirebaseApp(() => initializeApp({
      "projectId":"prj20241006",
      "appId":"1:841751536019:web:95523c327eff84ea80c866",
      "storageBucket":"prj20241006.appspot.com",
      "apiKey":"AIzaSyApGpahTBVJbYjmZYp_eKejtp8oZikocWo",
      "authDomain":"prj20241006.firebaseapp.com",
      "messagingSenderId":"841751536019",
      "measurementId":"G-1FW7X8C4Z3"})),
    provideAuth(() => getAuth()),
    {
      provide: AuthService,
      useFactory: authFactory
    }
  ]
};

function provideFirebase() {
  if (environment.authMode !== AuthMode.Firebase) {
    return []
  }
  return provideFirebaseApp(() => initializeApp({
    "projectId":"prj20241006",
    "appId":"1:841751536019:web:95523c327eff84ea80c866",
    "storageBucket":"prj20241006.appspot.com",
    "apiKey":"AIzaSyApGpahTBVJbYjmZYp_eKejtp8oZikocWo",
    "authDomain":"prj20241006.firebaseapp.com",
    "messagingSenderId":"841751536019",
    "measurementId":"G-1FW7X8C4Z3"})),
    provideAuth(() => getAuth())
}

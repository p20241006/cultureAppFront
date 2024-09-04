import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(), provideFirebaseApp(() => initializeApp({"projectId":"prj20241006","appId":"1:841751536019:web:95523c327eff84ea80c866","storageBucket":"prj20241006.appspot.com","apiKey":"AIzaSyApGpahTBVJbYjmZYp_eKejtp8oZikocWo","authDomain":"prj20241006.firebaseapp.com","messagingSenderId":"841751536019","measurementId":"G-1FW7X8C4Z3"})), provideAuth(() => getAuth())
  ]
};

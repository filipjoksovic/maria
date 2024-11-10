import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import {provideCodeEditor} from "@ngstack/code-editor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideCodeEditor({
      baseUrl: 'http://localhost:4200/assets/monaco',
      // use local Typings Worker
      typingsWorkerUrl: 'http://localhost:4200/assets/workers/typings-worker.js'
    })]
};

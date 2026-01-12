import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot()),
    ...appConfig.providers
  ]
}).then(appRef => {
  // const translate = appRef.injector.get(TranslateService);
  // translate.use('de');
  console.log('Application bootstrapped with TranslateService set to German.');
});

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('contactData');
});

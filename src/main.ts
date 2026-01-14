import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot()),
    ...appConfig.providers
  ]
});

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('contactData');
});

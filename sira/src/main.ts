import { TranslateService } from '@ngx-translate/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .then((appRef) => {
    const translate = appRef.injector.get(TranslateService);
    translate.setDefaultLang('fr');
    translate.use('fr');
  })
  .catch((err) => console.error(err));
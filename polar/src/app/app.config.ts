import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideHttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import {provideTranslateHttpLoader, TranslateHttpLoader} from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),

    ...provideTranslateHttpLoader({
      prefix: '/i18n/',
      suffix: '.json'
    }),

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslateHttpLoader
        },
        fallbackLang: 'es'
      })
    )
  ]
};

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalBroadcastService,
  MsalService,
  MsalGuard,
  MsalInterceptor,
} from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
} from '@azure/msal-browser';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
function msalInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '3d65ea5a-4c9d-404a-bef1-c9dfc13ac16b', // 👈 Replace this
      authority: 'https://login.microsoftonline.com/b50f048f-914d-406f-af34-ebd0524508ab', // 👈 Replace this
      redirectUri: 'http://localhost:4200',
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  });
}

// 🔧 Factory for Interceptor Configuration
function msalInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['user.read']],
      ['https://todobackend-bfghgbd9f2cqhvat.canadacentral-01.azurewebsites.net/todos', ['api://99511933-a7a3-44b1-a6e5-0b2ee669bb7b/access_as_user']]
    ])
  };
}

// 🔧 Factory for Guard Configuration
function msalGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read','api://99511933-a7a3-44b1-a6e5-0b2ee669bb7b/access_as_user'],
    }
  };
}
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptorsFromDi()), provideRouter(routes), {
    provide: MSAL_INSTANCE,
    useFactory: msalInstanceFactory
  }, {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: msalInterceptorConfigFactory,
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: msalGuardConfigFactory,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};

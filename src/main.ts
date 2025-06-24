import { enableProdMode, importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { environment } from './environments/environment';
import { provideRouter } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
}).catch((err: unknown) => console.error(err));

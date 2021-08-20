import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

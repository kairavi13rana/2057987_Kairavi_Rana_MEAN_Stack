import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SipliPortfolioComponent } from './sipli-portfolio/sipli-portfolio.component';

@NgModule({
  declarations: [
    AppComponent,
    SipliPortfolioComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalcModule } from './calc/calc.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    CalcModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

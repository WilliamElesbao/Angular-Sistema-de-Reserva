import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IlhaCentralComponent } from './ilha-central/ilha-central.component';
import { IlhaJanelaComponent } from './ilha-janela/ilha-janela.component';

@NgModule({
  declarations: [
    AppComponent,
    IlhaCentralComponent,
    IlhaJanelaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

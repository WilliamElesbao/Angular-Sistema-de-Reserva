import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IlhaCentralComponent } from './components/ilha-central/ilha-central.component';
import { IlhaJanelaComponent } from './components/ilha-janela/ilha-janela.component';
import { ModalComponent } from './components/modal/modal.component';
import { IndexComponent } from './pages/index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { LocalStorageService } from './services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { AllReservationComponent } from './components/all-reservation/all-reservation.component';
import { AvailableTablesComponent } from './components/available-tables/available-tables.component';


@NgModule({
  declarations: [
    AppComponent,
    IlhaCentralComponent,
    IlhaJanelaComponent,
    ModalComponent,
    IndexComponent,
    HomeComponent,
    HeaderNavComponent,
    AllReservationComponent,
    AvailableTablesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [LocalStorageService,ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

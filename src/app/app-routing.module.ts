import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AllReservationComponent } from './components/all-reservation/all-reservation.component'
import { AvailableTablesComponent } from './components/available-tables/available-tables.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path:'available-tables',
    component: AvailableTablesComponent,
  },
  {
    path: 'all-reservation',
    component: AllReservationComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

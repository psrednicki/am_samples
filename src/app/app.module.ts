import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import { SimplePinComponent } from './dashboard/simple-pin/simple-pin.component';
import {AmModule, LoadMapService} from "@acaisoft/angular-azure-maps";

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'heroes',
    component: DashboardComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SimplePinComponent
  ],
  imports: [
    BrowserModule,
    AmModule,

    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    )
  ],
  providers: [LoadMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }

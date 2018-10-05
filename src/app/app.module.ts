import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import { SimplePinComponent } from './dashboard/simple-pin/simple-pin.component';
import {AmModule, LoadMapService} from "@acaisoft/angular-azure-maps";
import { LazyLoadComponent } from './dashboard/lazy-load/lazy-load.component';
import { CustomSpriteComponent } from './dashboard/custom-sprite/custom-sprite.component';
import { InfoComponent } from './dashboard/info/info.component';
import { CurrentPositionComponent } from './dashboard/current-position/current-position.component';
import { AnimationComponent } from './dashboard/animation/animation.component';
import { DifferComponent } from './dashboard/differ/differ.component';

const appRoutes: Routes = [
  {
    path: 'simplepin',
    component: SimplePinComponent,
    data: { title: 'Simple Pin' }
  },
  {
    path: 'lazyload',
    component: LazyLoadComponent,
    data: { title: 'Lazy Load' }
  },
  {
    path: 'customsprite',
    component: CustomSpriteComponent,
    data: { title: 'Custom Sprite' }
  },
  {
    path: 'currentposition',
    component: CurrentPositionComponent,
    data: { title: 'Current Position' }
  },
  {
    path: 'animation',
    component: AnimationComponent,
    data: { title: 'Animation' }
  },
  {
    path: '',
    component: InfoComponent,
    data: { title: 'Info' }
  },
  {
    path: 'diff',
    component: DifferComponent,
    data: { title: 'Differ' }
  },
];



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SimplePinComponent,
    LazyLoadComponent,
    CustomSpriteComponent,
    InfoComponent,
    CurrentPositionComponent,
    AnimationComponent,
    DifferComponent
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

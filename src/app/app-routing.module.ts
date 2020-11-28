import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {RegularGameComponent} from './regular-game/regular-game.component';
import {AdminGameComponent} from './admin/game/admin-game.component';
import {HejComponent} from './hej/hej.component';

const adminRoute: Route = {
  path: 'admin',
  component: AdminComponent
};
const adminGameRoute: Route = {
  path: 'admin/game/:gameName',
  component: AdminGameComponent
};
const gameNameRoute: Route = {
  path: 'game/:gameName',
  component: RegularGameComponent
};
const allCatch: Route = {
  path: '**',
  component: HejComponent
};
const routes: Routes = [
  adminRoute,
  adminGameRoute,
  gameNameRoute,
  allCatch,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

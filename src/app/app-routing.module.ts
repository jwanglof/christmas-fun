import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {GameEngineComponent} from './game-engine/game-engine.component';
import {AdminGameComponent} from './admin/game/admin-game.component';
import {WelcomeComponent} from './welcome/welcome.component';

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
  component: GameEngineComponent
};
const allCatch: Route = {
  path: '**',
  component: WelcomeComponent
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

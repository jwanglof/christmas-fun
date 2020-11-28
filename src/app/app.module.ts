import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HejComponent } from './hej/hej.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlayerComponent } from './user/play-field/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiceComponent } from './dice/dice.component';
import { AdminComponent } from './admin/admin.component';
import { RegularGameComponent } from './regular-game/regular-game.component';
import { AdminGameComponent } from './admin/game/admin-game.component';
import { PlayerFormComponent } from './user/player-form/player-form.component';
import { WaitingOnPlayerComponent } from './user/waiting-on-player/waiting-on-player.component';
import { StartGameButtonComponent } from './start-game-button/start-game-button.component';
import { EndGameTextComponent } from './end-game-text/end-game-text.component';
import { GiftsComponent } from './gifts/gifts.component';
import { GiftComponent } from './gifts/gift/gift.component';
import { PlayFieldGiftComponent } from './user/play-field/play-field-gift/play-field-gift.component';

@NgModule({
  declarations: [
    AppComponent,
    HejComponent,
    UserComponent,
    PlayerComponent,
    DiceComponent,
    AdminComponent,
    RegularGameComponent,
    AdminGameComponent,
    PlayerFormComponent,
    WaitingOnPlayerComponent,
    StartGameButtonComponent,
    EndGameTextComponent,
    GiftsComponent,
    GiftComponent,
    PlayFieldGiftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

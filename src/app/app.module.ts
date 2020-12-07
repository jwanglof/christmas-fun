import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './user/user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlayerComponent } from './user/play-field/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiceComponent } from './dice/dice.component';
import { AdminComponent } from './admin/admin.component';
import { GameEngineComponent } from './game-engine/game-engine.component';
import { AdminGameComponent } from './admin/game/admin-game.component';
import { PlayerFormComponent } from './user/player-form/player-form.component';
import { StartGameButtonComponent } from './player/first-player/start-game-button/start-game-button.component';
import { EndGameTextComponent } from './texts/end-game-text/end-game-text.component';
import { PoolGiftsComponent } from './pool-gifts/pool-gifts.component';
import { PoolGiftComponent } from './pool-gifts/pool-gift/pool-gift.component';
import { PlayerGiftComponent } from './user/play-field/player-gift/player-gift.component';
import { UploadGiftFormComponent } from './user/play-field/upload-gift-form/upload-gift-form.component';
import { RulesComponent } from './rules/rules.component';
import {RulesModalComponent} from './rules/rules-modal.component';
import { GoToStartedGameModalComponent } from './welcome/go-to-started-game-modal/go-to-started-game-modal.component';
import { GiftImageComponent } from './gift-image/gift-image.component';
import { ExtendedTextComponent } from './texts/extended-text/extended-text.component';
import { FirstPlayerComponent } from './player/first-player/first-player.component';
import { StartExtendedGameButtonComponent } from './player/first-player/start-extended-game-button/start-extended-game-button.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UserComponent,
    PlayerComponent,
    DiceComponent,
    AdminComponent,
    GameEngineComponent,
    AdminGameComponent,
    PlayerFormComponent,
    StartGameButtonComponent,
    EndGameTextComponent,
    PoolGiftsComponent,
    PoolGiftComponent,
    PlayerGiftComponent,
    UploadGiftFormComponent,
    RulesComponent,
    RulesModalComponent,
    GoToStartedGameModalComponent,
    GiftImageComponent,
    ExtendedTextComponent,
    FirstPlayerComponent,
    StartExtendedGameButtonComponent
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

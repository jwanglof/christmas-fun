import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './hej/welcome.component';
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
import { StartGameButtonComponent } from './start-game-button/start-game-button.component';
import { EndGameTextComponent } from './end-game-text/end-game-text.component';
import { PoolGiftsComponent } from './pool-gifts/pool-gifts.component';
import { PoolGiftComponent } from './pool-gifts/pool-gift/pool-gift.component';
import { PlayFieldGiftComponent } from './user/play-field/play-field-gift/play-field-gift.component';
import { UploadGiftFormComponent } from './user/play-field/upload-gift-form/upload-gift-form.component';
import { RulesComponent } from './rules/rules.component';
import {RulesModalComponent} from './rules/rules-modal.component';
import { GoToStartedGameModalComponent } from './hej/go-to-started-game-modal/go-to-started-game-modal.component';

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
    PlayFieldGiftComponent,
    UploadGiftFormComponent,
    RulesComponent,
    RulesModalComponent,
    GoToStartedGameModalComponent
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

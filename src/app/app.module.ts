import { BrowserModule,HammerModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketioService } from './socketio.service';
import { HomeComponent } from './home/home.component';
import { CreateroomComponent } from './createroom/createroom.component';
import {FormsModule} from '@angular/forms';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { JoinroomComponent } from './joinroom/joinroom.component'
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'swipe': { direction: Hammer.DIRECTION_ALL },
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateroomComponent,
    ChatroomComponent,
    JoinroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HammerModule
  ],
  providers: [SocketioService,{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig,
  },{provide: LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

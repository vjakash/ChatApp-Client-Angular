import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateroomComponent } from './createroom/createroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { JoinroomComponent } from './joinroom/joinroom.component';


const routes: Routes = [{
  path:'',
  component:HomeComponent
},{
  path:'createroom',
  component:CreateroomComponent
},{
  path:'chatroom/:roomname',
  component:ChatroomComponent
},{
  path:'joinroom',
  component:JoinroomComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

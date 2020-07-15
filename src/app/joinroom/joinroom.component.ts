import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joinroom',
  templateUrl: './joinroom.component.html',
  styleUrls: ['./joinroom.component.css']
})
export class JoinroomComponent implements OnInit {
roomName='';
warning=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  join() {
    if (this.roomName != '' ) {
      this.roomName=this.roomName.toLowerCase();
      this.router.navigate(['/chatroom/'+this.roomName]);
      // this.socketService.createRoom(this.roomName,this.userName);
    }else{
      this.warning=true;
    }
  }
}

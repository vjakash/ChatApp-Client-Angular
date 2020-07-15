import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../socketio.service';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment'
@Component({
  selector: 'app-createroom',
  templateUrl: './createroom.component.html',
  styleUrls: ['./createroom.component.css'],
})
export class CreateroomComponent implements OnInit {
  roomName = '';
  copied=false;
  warning=false;
  url=environment.url;
  constructor(private socketService: SocketioService,private router:Router) {
    let ran=Math.random();
    this.roomName=`${String(Math.random()).substring(3,6)}-${String(Math.random()).substring(3,6)}-${String(Math.random()).substring(3,6)}`
  }

  ngOnInit(): void {}
  join() {
    if (this.roomName != '' ) {
      this.roomName=this.roomName.toLowerCase();
      this.router.navigate(['/chatroom/'+this.roomName]);
      // this.socketService.createRoom(this.roomName,this.userName);
    }else{
      this.warning=true;
    }
  }
  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', item);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.copied=true;
    setTimeout(()=>{
      this.copied=false;
    },3000)
  }
}

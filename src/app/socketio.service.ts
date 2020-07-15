import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;  
  constructor() {   } 
   setupSocketConnection() {
    //  this.socket = io(environment.SOCKET_ENDPOINT);
  }
  createRoom(roomName,userName){
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('create',{roomName,userName});
    return this.socket;
  }
  sendMessage(message){
    this.socket.emit('sendMessage',message);
  }
}

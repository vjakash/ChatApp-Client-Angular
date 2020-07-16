import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SocketioService } from '../socketio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css'],
})
export class ChatroomComponent implements OnInit, AfterViewInit, OnDestroy {
  userName = '';
  roomName = '';
  message = '';
  socket;
  activeUsers = [];
  allMessages = [];
  // activeUsers = ['vijay'];
  // allMessages = [{
  //   type: 'message',
  //   userName: 'vijay',
  //   message: 'hey there',
  //   myMessage:true
  // },{
  //   type: 'message',
  //   userName: 'akash',
  //   message: 'wassup bro?',
  // }];
  infos = [];
  displayInfo = true;
  slideRight = false;
  firstTime = true;
  container: HTMLElement;
  constructor(
    private socketService: SocketioService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.userName = prompt('Enter Your Name');
    while (
      this.userName === '' ||
      this.userName === undefined ||
      this.userName === null
    ) {
      this.userName = prompt('Please Enter Your Name');
    }
    // console.log(this.userName);
    this.roomName = this.activeRoute.snapshot.params.roomname;
  }
  ngOnInit(): void {
    this.socket = this.socketService.createRoom(this.roomName, this.userName);

    this.socket.on('receiveMessage', (data) => {
      // console.log(data);
      if (data.type == 'info') {
        this.infos.push(data);
      } else {
        this.infos = this.infos.filter(
          (item) => item.userName != data.userName
        );
        // console.log(this.infos);
        data.time = new Date();
        this.allMessages.push(data);
      }
      // this.container = document.getElementById('messageArea');
      // console.log(
      //   'above',
      //   this.container.scrollTop,
      //   this.container.scrollHeight
      // );
      // this.container.scrollTop = this.container.scrollHeight;
      // console.log(
      //   'below',
      //   this.container.scrollTop,
      //   this.container.scrollHeight
      // );
    });
    this.socket.on('joined', (data) => {
      this.activeUsers = data;
    });
  }
  sendInfo(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.sendMsg();
    } else {
      if (this.message !== '') {
        let obj = {
          type: 'info',
          userName: this.userName,
          message: ' is typing......',
        };
        this.socketService.sendMessage(obj);
      }
    }
  }
  count = 0;
  sendMsg() {
    if (this.message !== '') {
      let obj = {
        type: 'message',
        userName: this.userName,
        message: this.message,
        time: new Date(),
      };
      this.socketService.sendMessage(obj);
      obj['myMessage'] = true;
      this.allMessages.push(obj);
      this.message = '';
      this.container = document.getElementById('messageArea');
      this.count = this.container.scrollHeight;
      this.container.scrollTop = this.count;
      console.log(this.container.scrollTop, this.container.scrollHeight);
    }
  }
  leaveRoom() {
    let cnfm = confirm('Do you really want to leave the room?');
    if (cnfm) {
      this.socket.emit('leave');
      this.router.navigate(['/']);
    }
  }
  ngAfterViewInit() {
    this.container = document.getElementById('messageArea');
    console.log('above', this.container.scrollTop, this.container.scrollHeight);
    this.container.scrollTop = this.container.scrollHeight;
    console.log('below', this.container.scrollTop, this.container.scrollHeight);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.socket.emit('leave');
  }
  onSwipe(evt) {
    // console.log('x','y');
    const x =
      Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left') : '';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';
    console.log(x, y);
    if (x === 'right') {
      this.slideRight = true;
    }
    if (x === 'left') {
      this.slideRight = false;
    }
  }
  openSideBar() {
    this.slideRight = true;
  }
}

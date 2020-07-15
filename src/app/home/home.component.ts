import { Component, OnInit } from '@angular/core';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private socketService: SocketioService) {} 
   ngOnInit() {
    // this.socketService.setupSocketConnection();
  }


}

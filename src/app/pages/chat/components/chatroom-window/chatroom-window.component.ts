import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {

  public dummyData = [{
    message: 'Ola Primeira mensagem ',
    createAt: new Date(),
    sender: {
      firstName: 'Steve',
      lastName: 'Smith',
      photoUrl: 'http://via.placeholder.com/150x150'
    }
  },
  {
    message: 'Ola Segunda mensagem ',
    createAt: new Date(),
    sender: {
      firstName: 'Bob',
      lastName: 'Tevez',
      photoUrl: 'http://via.placeholder.com/150x150'
    }
  },
  {
    message: 'Ola terceira mensagem ',
    createAt: new Date(),
    sender: {
      firstName: 'Alan',
      lastName: 'Porst',
      photoUrl: 'http://via.placeholder.com/150x150'
    }
  }];

  constructor() { }

  ngOnInit() {
  }

}

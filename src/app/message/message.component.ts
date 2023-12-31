import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../service/message/message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: string[] = [];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.get().subscribe(messages => this.messages = messages);
  }

  clearMessage() {
    this.messageService.clear().subscribe(messages => this.messages = messages);
  }
}

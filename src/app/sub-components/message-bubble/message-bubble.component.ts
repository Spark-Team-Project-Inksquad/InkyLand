import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss']
})
export class MessageBubbleComponent implements OnInit {

  // NOTE two potential states. Sent bubble and recieved bubble
  @Input() message_type:string;
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}

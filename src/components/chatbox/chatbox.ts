import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the ChatboxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chatbox',
  templateUrl: 'chatbox.html'
})
export class ChatboxComponent {
  @Output() messageCreate = new EventEmitter<any>();
  
  constructor() {
    console.log('Hello ChatboxComponent Component');
  }

  
  onMessageAdded(messageText){
    this.messageCreate.emit(messageText);
  }

}

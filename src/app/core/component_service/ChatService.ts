import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatVisibilitySubject = new BehaviorSubject<boolean>(false); // ✅ Pakai BehaviorSubject!

  chatVisibility$ = this.chatVisibilitySubject.asObservable();

  toggleChatVisibility(isVisible: boolean) {
    console.log('toggleChatVisibility called with:', isVisible); // Optional: debug
    this.chatVisibilitySubject.next(isVisible);
  }
}

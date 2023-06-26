import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageStorage: string[] = [];

  constructor() {
  }

  add(message: string): Observable<string> {
    this.messageStorage.push(message);
    return of(message);
  }

  clear(): Observable<string[]> {
    this.messageStorage = [];
    return of(this.messageStorage)
  }

  get(): Observable<string[]> {
    return of(this.messageStorage);
  }

}

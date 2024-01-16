import {Injectable, inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "./user";
import {toSignal} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Inject the HttpClient service
  http = inject(HttpClient);
  userUrl = 'https://jsonplaceholder.typicode.com/users';

  // Retrieve the users from the API using RxJS
  private users$ = this.http.get<User[]>(this.userUrl);

  // Expose the state as a signal
  users = toSignal<User[], User[]>(this.users$, {initialValue: []});
  selectedUserId = signal(0);

  // Set the selected user
  userSelected(id: number): void {
    this.selectedUserId.set(id);
  }
}

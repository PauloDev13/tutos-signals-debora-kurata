import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Inject the HttpClient service
  http = inject(HttpClient);
  userUrl = 'https://jsonplaceholder.typicode.com/users';

  // Retrieve the users from the API using RxJS

  // Expose the state as a signal

  // Set the selected user
}

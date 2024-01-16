import {Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap} from 'rxjs';
import { ToDo } from './todo';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Inject the HttpClient service
  http = inject(HttpClient);
  userService = inject(UserService);
  todoUrl = 'https://jsonplaceholder.typicode.com/todos?userId=';

  // When the selected user changes, get the user's tasks
  getTasks = signal<ToDo[]>([]);
  private getTasks$ = toObservable(this.userService.selectedUserId).pipe(
    switchMap(userId => this.http.get<ToDo[]>(`${this.todoUrl}${userId}`)),
    tap(tasks => this.getTasks.set(tasks))
  );

  readOnlyGetTasks = toSignal<ToDo[], ToDo[]>(this.getTasks$, { initialValue: []});

  // Mark the task completed
  markTaskCompleted(task: ToDo) {
    this.getTasks.update(tasks => tasks.map(t => t.id === task.id
    ? {...task, completed: true }
    : t))

    // this.getTasks.mutate(() => task.completed = true);
  }
}

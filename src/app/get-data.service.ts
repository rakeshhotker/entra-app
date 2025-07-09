import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://todobackend-bfghgbd9f2cqhvat.canadacentral-01.azurewebsites.net/todos'; // 🔐 Protected by Entra ID

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }
}

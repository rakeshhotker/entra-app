import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../Models';
import { TodoService } from '../get-data.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Your Todo List</h2>

    <button (click)="logout()">Logout</button>

    <form (ngSubmit)="addTodo()">
      <input type="text" [(ngModel)]="newTodoTitle" name="title" required />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li *ngFor="let todo of todos">
        <input type="checkbox" [checked]="todo.isCompleted" disabled />
        {{ todo.title }}
      </li>
    </ul>
  `
})
export class HomeComponent {
  todos: Todo[] = [];
  newTodoTitle = '';

  constructor(private todoService: TodoService,private auth:MsalService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => this.todos = data,
      error: (err) => console.error('Error loading todos', err)
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    const newTodo: Todo = {
      id: 0, // Backend should assign ID
      title: this.newTodoTitle.trim(),
      isCompleted: false,
    };

    this.todoService.addTodo(newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.newTodoTitle = '';
      },
      error: (err) => console.error('Error adding todo', err)
    });
  }
  logout(): void {
    this.auth.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200' // 👈 or your custom homepage
    });
  }
  
}

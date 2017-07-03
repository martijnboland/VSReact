import { observable, action, computed } from 'mobx';
import { TodoItem } from "../model/TodoItem";

export class TodoStore {

  @observable todos: TodoItem[] = [];

  @observable isLoading: boolean = false;

  @computed get activeTodoCount(): number {
		return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		)
	}

	@computed get completedCount(): number {
		return this.todos.length - this.activeTodoCount;
	}

  @action loadTodos(): void {
    this.todos = [];
  }

  @action addTodo(todo: string): void {
    const newTodo: TodoItem = { 
      id: (this.todos.length === 0) ? 0 : this.todos[this.todos.length - 1].id + 1,
      completed: false,
      text: todo
    }
    this.todos.push(newTodo);
  }

  @action editTodo(id: number, text: string): void {
    let todo = this.todos.find(t => t.id === id);
    todo.text = text;
  }

  @action deleteTodo(id: number): void {
    let todo = this.todos.find(t => t.id === id);
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  @action markCompleted(id: number): void {
    let todo = this.todos.find(t => t.id === id);
    todo.completed = ! todo.completed;
  }

  @action markAllCompleted(): void {
    this.todos.forEach(t => t.completed = true)
  }

  @action clearCompleted(): void {
    this.todos = this.todos.filter(t => ! t.completed);
  }
}
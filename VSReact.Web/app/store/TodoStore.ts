import { observable, action, computed } from 'mobx';
import { TodoItem } from '../model/TodoItem';
import { TodosApi } from '../apiclient';

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

  @action loadTodos(): Promise<any> {
    this.todos = [];
    return TodosApi.getAll()
      .then(action((data: Array<any> )=> {
        data.forEach(todo => this.todos.push(new TodoItem(todo)));
      }));
  }

  @action addTodo(todo: string): Promise<any> {
    const newTodo = {
      completed: false,
      title: todo
    };
    return TodosApi.add(newTodo)
      .then(action((data: any) => {
        this.todos.push(new TodoItem(data));
      }));
  }

  @action editTodo(id: number, title: string): Promise<any> {
    return TodosApi.patch(id, { title: title })
      .then(action(() => {
        let todo = this.todos.find(t => t.id === id);
        todo.title = title;
      }));
  }

  @action deleteTodo(id: number): Promise<any> {
    return TodosApi.remove(id)
      .then(action(() => {
        let todo = this.todos.find(t => t.id === id);
        const index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      }));
  }

  @action toggleCompleted(id: number): Promise<any> {
    let todo = this.todos.find(t => t.id === id);
    const completed = ! todo.completed;
    
    return TodosApi.patch(id, { completed: completed })
      .then(action(() => {
        todo.completed = completed;
      }));
  }

  @action markAllCompleted(): Promise<any> {
    const markPromises: Promise<any>[] = [];
    this.todos.forEach(todo => {
      todo.completed = true;
      markPromises.push(TodosApi.patch(todo.id, { completed: todo.completed }))
    })
    return Promise.all(markPromises);
  }

  @action clearCompleted(): Promise<any> {
    const completedTodos = this.todos.filter(t => t.completed);
    const removePromises: Promise<any>[] = [];
    completedTodos.forEach(todo => {
      removePromises.push(TodosApi.remove(todo.id));
    });
    return Promise.all(completedTodos)
      .then(action(() => {
        this.todos = this.todos.filter(t => ! t.completed);
      }));
  }
}
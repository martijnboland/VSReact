import { observable } from 'mobx';

export class TodoItem {
  id?: number;
  
  @observable 
  title: string;
  
  @observable
  completed: boolean;

  public constructor(init?:Partial<TodoItem>) {
    Object.assign(this, init);
  }

  public toJs(): any {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed
    }
  }
};
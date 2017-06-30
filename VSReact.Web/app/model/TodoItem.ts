import { observable } from 'mobx';

export class TodoItem {
  id?: number;
  
  @observable 
  text: string;
  
  @observable
  completed: boolean;
};
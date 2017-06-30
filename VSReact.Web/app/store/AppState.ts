import { observable, action, useStrict } from 'mobx';

useStrict(true);

export class AppState {

  constructor() {
    this.currentTodoFilter = TodoFilter.Active;
  }

  @observable public currentTodoFilter: TodoFilter;

  @action
  setTodoFilter(filter: TodoFilter) {
    this.currentTodoFilter = filter;
  }

}

export enum TodoFilter {
  All,
  Active,
  Completed
}
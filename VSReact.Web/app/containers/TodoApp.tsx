import * as React from 'react';
import { observer, inject } from 'mobx-react'
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import { TodoItem } from "../model/TodoItem";
import { TodoStore } from "../store/TodoStore";
import { AppState } from "../store/AppState";

interface TodoAppProps {
  appState: AppState,
  todoStore: TodoStore
}

@observer
export default class TodoApp extends React.Component<TodoAppProps, {}> {

  componentDidMount() {
    if (this.props.todoStore.loadTodos) {
      this.props.todoStore.loadTodos();
    }
  }

  render() {
    const { appState, todoStore } = this.props;

    return (
      <div>
        <Header todoStore={todoStore} />
        <MainSection appState={appState} todoStore={todoStore} />
      </div>
    );
  }
}
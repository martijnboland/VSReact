import * as React from 'react';
import { observer } from 'mobx-react'
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import { TodoStore } from '../store/TodoStore';
import { AppState } from '../store/AppState';

interface ITodoAppProps {
  appState: AppState,
  todoStore: TodoStore
}

@observer
export default class TodoApp extends React.Component<ITodoAppProps, {}> {

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
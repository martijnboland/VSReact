import * as React from 'react';
import { Provider } from 'mobx-react';
import TodoApp from './TodoApp';
import DevTools from 'mobx-react-devtools'
import { AppState } from '../store/AppState';
import { TodoStore } from '../store/TodoStore';

interface IRootProps {
  appState: AppState,
  todoStore: TodoStore
}

export default class Root extends React.Component<IRootProps, void> {
  render() {
    const { appState, todoStore } = this.props;
    return (
      <Provider appState={appState} todoStore={todoStore}>
        <div>
          <TodoApp appState={appState} todoStore={todoStore} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
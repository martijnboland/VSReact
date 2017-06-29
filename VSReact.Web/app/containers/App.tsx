import * as React from 'react';
import { Provider } from 'react-redux';
import TodoApp from './TodoApp';
import DevTools from './DevTools';
import { Store } from "redux";

interface RootProps {
    store: Store<any>;
}

export default class Root extends React.Component<RootProps, void> {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <TodoApp />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
import 'todomvc-app-css/index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { AppState } from './store/AppState';
import { TodoStore } from './store/TodoStore';

const appState = new AppState();
const todoStore = new TodoStore();

const renderApp = () => {
  const App = require('./containers/App').default;

  ReactDOM.render(
    <AppContainer>
      <App appState={appState} todoStore={todoStore} />
    </AppContainer>,
    document.getElementById('root')
  );
};

if (module.hot) {
  const reRenderApp = () => {
    renderApp();
  };

  module.hot.accept('./containers/App', () => {
    setImmediate(() => {
      reRenderApp();
    });
  });
}

renderApp();

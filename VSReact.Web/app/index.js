import 'todomvc-app-css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';

const store = configureStore();

const renderApp = () => {
  const App = require('./containers/App').default;

  render(
    <AppContainer>
      <App store={store} />
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

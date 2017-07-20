// react
import React from 'react';
import { render } from 'react-dom';
// components
import App from './components/App/App';
// utils
import { AppContainer } from 'react-hot-loader';

const mountNode  = document.getElementById('root') as HTMLElement;

const doRender = (Application: any, root: HTMLElement) => {
  const fullApp = (
    <AppContainer>
      <Application/>
    </AppContainer>
  );
  render(fullApp, root);
};

doRender(App, mountNode);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    const nextApp = require('./components/App/App').default;
    doRender(nextApp, mountNode);
  });
}

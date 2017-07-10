// react
import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
// components
import { Hello } from './components/App/App';
// utils
import { AppContainer } from 'react-hot-loader';

const App = (
  <AppContainer>
    <Hello compiler="Typescript" framework="React"/>
  </AppContainer>
);

const Render = (Application: ReactElement<{}>) => {
  ReactDOM.render(
    Application,
    document.getElementById('root') as HTMLElement
  );
};

Render(App);

if (module.hot) {
  module.hot.accept('./components/App/App', () => Render(App));
}
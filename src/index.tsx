// react
import React from 'react';
import ReactDOM from 'react-dom';
// components
import { Hello } from './components/App/App';

ReactDOM.render(
  <Hello compiler="Typescript" framework="React" />,
  document.getElementById('root') as HTMLElement
);

// react
import React, { ReactElement } from 'react';
// components
import Greeter from '../Greeter/Greeter';

const App = (): ReactElement<{}> => <Greeter compiler="TS" framework="React"/>;

export default App;

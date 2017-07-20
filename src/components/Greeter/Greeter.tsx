// react
import React from 'react';

export interface GreeterProps {
  compiler: string;
  framework: string;
}

const Greeter = (props: GreeterProps) => {
  return (<h1>Hello from {props.compiler} and {props.framework}!</h1>);
};

export default Greeter;

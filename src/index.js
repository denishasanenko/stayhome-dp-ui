import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'typeface-roboto';
import * as serviceWorker from './serviceWorker';
import bugsnag from '@bugsnag/js'
import bugsnagReact from '@bugsnag/plugin-react'

const bugsnagClient = bugsnag('dd223483153168e5915e18e663a0737a');
bugsnagClient.use(bugsnagReact, React);
const ErrorBoundary = bugsnagClient.getPlugin('react');

ReactDOM.render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/* eslint import/extensions: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import games from '../games.json';

// create
const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);

console.log('games1', games);

ReactDOM.render(<App games={games} />, document.querySelector('#root'));

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

const API_URL = 'https://cors.io/?http://pokeapi.co/api/v2/pokemon?limit=151';

ReactDOM.render(<App apiUrl={API_URL} />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
//import ListApp from './ListApp';
//import RecipeApp from './RecipeApp';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<RecipeApp />, document.querySelector('#recipes'))


//ReactDOM.render(<ListApp />, document.getElementById('root'));


ReactDOM.render(<App />, document.querySelector('#root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

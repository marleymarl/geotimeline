import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
=======
// import App from './App';
>>>>>>> Added props to upFrontButtonForm component for header and description. This will help explain to users what action needs to be taken on the page and what to expect when using this application.
import MainRouter from './modules/MainRouter';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<MainRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

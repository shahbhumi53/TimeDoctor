import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './layouts/App';
import { Provider } from 'react-redux'
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();

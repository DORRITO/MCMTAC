import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store/configureStore';
import 'semantic-ui-css/semantic.min.css';

// import getName from './redux/actions/nameAction';
// store.dispatch(getName({ name: 'Gm', auth: true }))

const store = configureStore();

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
registerServiceWorker();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './redux/store/configureStore';
// import getName from './redux/actions/nameAction';
// import nameSelector from './redux/selectors/nameSelector';

const store = configureStore();

// store.subscribe(() => {
//     const state = store.getState();
//     console.log(store.getState())
// });

// store.dispatch(getName({ name: 'Rychar', auth: true }))
// const state = store.getState()

// const selectName = nameSelector(state.user, state.authed)
// console.log(selectName);

const app = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
registerServiceWorker();
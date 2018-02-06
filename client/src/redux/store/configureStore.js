import { createStore } from 'redux';
import nameReducer from './../reducers/nameReducer';

export default () => {
    const store = createStore(nameReducer);

    return store;
}
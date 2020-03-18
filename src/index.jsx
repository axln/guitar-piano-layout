import React from 'react';
import { render } from 'react-dom';
//import { h, render } from "preact";
import { Provider } from 'unistore/preact';
import { store } from './store';
import { App } from './container/App';

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

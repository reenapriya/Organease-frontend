import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ConfigureStore from './redux/Store/ConfigureStore';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

const store = ConfigureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </Provider>
);

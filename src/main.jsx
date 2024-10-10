// src/main.jsx or src/index.jsx (depending on your file structure)

import React from 'react';
import ReactDOM from 'react-dom/client'; // Update the import
import App from './App';
import { Provider } from 'react-redux';
import store from './store'; // Ensure your store is imported

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

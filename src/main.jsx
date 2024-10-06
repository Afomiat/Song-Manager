// src/index.js or src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import songReducer from './store/slices/songSlice';
import songSaga from './store/sagas/songSaga';
import App from './App';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
    reducer: {
        songs: songReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga
sagaMiddleware.run(songSaga);

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App within the Provider
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

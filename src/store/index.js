// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songReducer from './slices/songSlice'; // Import your song slice
import rootSaga from './sagas'; // Import your root saga

const sagaMiddleware = createSagaMiddleware(); // Create saga middleware

const store = configureStore({
    reducer: {
        songs: songReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware), // Add saga middleware
});

sagaMiddleware.run(rootSaga); // Run the root saga

export default store;

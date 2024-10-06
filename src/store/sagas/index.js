// src/store/sagas/index.js
import { all } from 'redux-saga/effects';
import songSaga from './store/sagas/songSaga'; // Import your song saga

export default function* rootSaga() {
    yield all([
        songSaga(), // Add your sagas here
    ]);
}

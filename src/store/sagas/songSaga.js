// src/store/sagas/songSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } from '../slices/songSlice';
import { fetchSongsApi } from '../../api/songApi'; // Adjusted import path

function* fetchSongs() {
    try {
        yield put(fetchSongsRequest()); // Dispatch request action
        const songs = yield call(fetchSongsApi); // Call your API function
        yield put(fetchSongsSuccess(songs)); // Dispatch success action
    } catch (error) {
        yield put(fetchSongsFailure(error.message)); // Dispatch failure action
    }
}

function* songSaga() {
    yield takeEvery('songs/fetchSongs', fetchSongs); // Listen for the fetchSongs action
}

export default songSaga;

// src/sagas/songSaga.js

import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchSongsApi, addSongApi, updateSongApi, deleteSongApi } from '../../api/songApi';
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure, addSong, updateSong, deleteSong } from '../slices/songSlice';

function* fetchSongs() {
    try {
        const songs = yield call(fetchSongsApi);
        console.log('Fetched songs:', songs);
        yield put(fetchSongsSuccess(songs));
    } catch (error) {
        console.error('Fetch songs error:', error);
        yield put(fetchSongsFailure(error.message));
    }
}

function* createSong(action) {
    try {
        const song = yield call(addSongApi, action.payload);
        yield put(addSong(song));
    } catch (error) {
        console.error(error);
    }
}

function* editSong(action) {
    try {
        const song = yield call(updateSongApi, action.payload);
        yield put(updateSong(song));
    } catch (error) {
        console.error(error);
    }
}

function* removeSong(action) {
    try {
        yield call(deleteSongApi, action.payload);
        yield put(deleteSong(action.payload));
    } catch (error) {
        console.error(error);
    }
}

function* songSaga() {
    yield takeEvery('songs/fetchSongsRequest', fetchSongs);
    yield takeEvery('songs/addSong', createSong);
    yield takeEvery('songs/updateSong', editSong);
    yield takeEvery('songs/deleteSong', removeSong);
}

export default songSaga;

import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchSongsApi, updateSongApi, deleteSongApi,addSongApi } from '../../api/songApi';
import { fetchSongsSuccess, fetchSongsFailure, updateSong, deleteSong,addSong } from '../slices/songSlice';

function* fetchSongs() {
    try {
        const songs = yield call(fetchSongsApi);
        const formattedSongs = songs.slice(0, 5);
        yield put(fetchSongsSuccess(formattedSongs));
    } catch (error) {
        yield put(fetchSongsFailure(error.message));
    }
}
function* addSongSaga(action) {
    try {
        const song = yield call(addSongApi, action.payload);
        console.log("hdhd", song);

    } catch (error) {
        console.error(error);
    }
}
function* editSong(action) {
    try {
        const song = yield call(updateSongApi, action.payload);
        // yield put(updateSong(song));
    } catch (error) {
        console.error(error);
    }
}

function* removeSong(action) {
    try {
        yield call(deleteSongApi, action.payload);
    } catch (error) {
        console.error(error);
    }
}

function* songSaga() {
    yield takeEvery('songs/fetchSongsRequest', fetchSongs);
    yield takeEvery('songs/updateSong', editSong);
    yield takeEvery('songs/deleteSong', removeSong);
    yield takeEvery('songs/addSong', addSongSaga); 
}

export default songSaga;

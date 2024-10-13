import { createSlice } from '@reduxjs/toolkit';

export const songSlice = createSlice({
    name: 'songs',
    initialState: {
        songs: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchSongsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSongsSuccess: (state, action) => {
            state.loading = false;
            state.songs = action.payload;
        },
        fetchSongsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addSong: (state, action) => {
            state.songs.push(action.payload);
        },
        updateSong: (state, action) => {
            const index = state.songs.findIndex(song => song.id === action.payload.id);
            if (index !== -1) {
                state.songs[index] = action.payload;
            }
        },
        deleteSong: (state, action) => {
            state.songs = state.songs.filter(song => song.id !== action.payload);
        },
    },
});

export const {
    fetchSongsRequest,
    fetchSongsSuccess,
    fetchSongsFailure,
    updateSong,
    deleteSong,
    addSong,

} = songSlice.actions;

export default songSlice.reducer;

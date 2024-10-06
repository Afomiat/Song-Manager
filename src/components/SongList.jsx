// src/components/SongList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsApi } from '../api/songApi';
import { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } from '../store/slices/songSlice';

const SongList = () => {
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector((state) => state.songs);

    useEffect(() => {
        const fetchSongs = async () => {
            dispatch(fetchSongsRequest()); // Dispatch request action
            try {
                const data = await fetchSongsApi(); // Fetch songs from API
                dispatch(fetchSongsSuccess(data)); // Dispatch success action with fetched data
            } catch (error) {
                dispatch(fetchSongsFailure(error.message)); // Dispatch failure action with error message
            }
        };

        fetchSongs();
    }, [dispatch]);

    if (loading) return <p>Loading songs...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul>
            {songs.map((song) => (
                <li key={song.id}>{song.title}</li> // Adjust based on the data structure
            ))}
        </ul>
    );
};

export default SongList;

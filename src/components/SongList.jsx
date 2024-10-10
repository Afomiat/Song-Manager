import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchSongsRequest,
    addSong,
    updateSong,
    deleteSong,
} from '../store/slices/songSlice'; 

const SongList = () => {
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector(state => state.songs);
    const [newSong, setNewSong] = useState({ title: '' });
    const [editingSong, setEditingSong] = useState(null);

    // Fetch songs when the component mounts
    useEffect(() => {
        dispatch(fetchSongsRequest());
    }, [dispatch]);

    // Add a new song
    const handleAddSong = () => {
        if (!newSong.title.trim()) return;  // Avoid adding empty or whitespace-only titles
        dispatch(addSong({ title: newSong.title.trim() }));
        setNewSong({ title: '' });  // Clear the input after adding
    };

    // Update an existing song
    const handleUpdateSong = () => {
        if (!editingSong || !editingSong.title.trim()) return;  // Prevent empty updates
        dispatch(updateSong(editingSong));
        setEditingSong(null);  // Reset the editing state
    };

    // Delete a song by id
    const handleDeleteSong = (id) => {
        dispatch(deleteSong(id));
    };

    return (
        <div>
            <input
                type="text"
                value={newSong.title}
                onChange={(e) => setNewSong({ title: e.target.value })}
                placeholder="Add a new song"
            />
            <button onClick={handleAddSong}>Add Song</button>
            <h2>Song List</h2>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {songs.map(song => (
                    <li key={song.id}>
                        {editingSong?.id === song.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingSong.title}
                                    onChange={(e) =>
                                        setEditingSong({
                                            ...editingSong,
                                            title: e.target.value,
                                        })
                                    }
                                />
                                <button onClick={handleUpdateSong}>Update</button>
                                <button onClick={() => setEditingSong(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {song.title}
                                <button onClick={() => setEditingSong(song)}>Edit</button>
                                <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SongList;

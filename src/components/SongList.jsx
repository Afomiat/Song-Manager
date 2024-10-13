import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest, updateSong, deleteSong, addSong } from '../store/slices/songSlice'; 
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for unique IDs

const SongList = () => {
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector(state => state.songs);
    const [editingSong, setEditingSong] = useState(null);
    const [newSongTitle, setNewSongTitle] = useState('');

    useEffect(() => {
        dispatch(fetchSongsRequest());
    }, [dispatch]);

    const handleUpdateSong = () => {
        if (!editingSong || !editingSong.title.trim()) return;  
        dispatch(updateSong(editingSong));
        setEditingSong(null);  
    };

    const handleDeleteSong = (id) => {
        dispatch(deleteSong(id));
    };

    const handleAddSong = () => {
        if (!newSongTitle.trim()) return;  
        const newSong = { id: uuidv4(), title: newSongTitle }; // Use a unique ID
        dispatch(addSong(newSong));
        setNewSongTitle(''); // Clear input after adding
    };
    
    return (
        <div>
            <h2>Song List</h2>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <input 
                type="text" 
                value={newSongTitle} 
                onChange={(e) => setNewSongTitle(e.target.value)} 
                placeholder="New song title" 
            />
            <button onClick={handleAddSong}>Add Song</button>

            <ul>
                {songs.map(song => (
                    <li key={song.id}>
                        {editingSong?.id === song.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingSong.title || ''}
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

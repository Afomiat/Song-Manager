import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest, updateSong, deleteSong, addSong } from '../store/slices/songSlice'; 

const SongList = () => {
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector(state => state.songs);
    const [editingSong, setEditingSong] = useState(null);
    const [newSongTitle, setNewSongTitle] = useState('');
    const [newSongArtist, setNewSongArtist] = useState('');

    useEffect(() => {
        dispatch(fetchSongsRequest());
    }, [dispatch]);

    const handleUpdateSong = async () => {
        if (!editingSong || !editingSong.title.trim() || !editingSong.artist.trim()) return;
        try {
            await dispatch(updateSong(editingSong));
            setEditingSong(null); // Clear editing state after update
        } catch (error) {
            console.error('Failed to update song:', error);
        }
    };

    const handleDeleteSong = (id) => {
        dispatch(deleteSong(id));
    };

    const handleAddSong = async () => {
        if (!newSongTitle.trim() || !newSongArtist.trim()) return;  
        const newSong = { 
            title: newSongTitle, 
            artist: newSongArtist  
        };
        try {
            await dispatch(addSong(newSong));
            setNewSongTitle(''); // Clear title input after adding
            setNewSongArtist(''); // Clear artist input after adding
            setEditingSong(null); // Ensure no song is in editing mode
        } catch (error) {
            console.error('Failed to add song:', error);
        }
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
            <input 
                type="text" 
                value={newSongArtist} 
                onChange={(e) => setNewSongArtist(e.target.value)} 
                placeholder="New song artist" 
            />
            <button onClick={handleAddSong}>Add Song</button>

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
                                <input
                                    type="text"
                                    value={editingSong.artist} 
                                    onChange={(e) =>
                                        setEditingSong({
                                            ...editingSong,
                                            artist: e.target.value,
                                        })
                                    }
                                />
                                <button onClick={handleUpdateSong}>Update</button>
                                <button onClick={() => setEditingSong(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {song.title} by {song.artist}
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

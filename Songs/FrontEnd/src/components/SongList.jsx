// src/components/SongList.js
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
  const { songs, loading, error } = useSelector((state) => state.songs);

  const [newSong, setNewSong] = useState({ title: '', artist: '' });
  const [editMode, setEditMode] = useState(null);
  const [updatedSong, setUpdatedSong] = useState({ id: '', title: '', artist: '' });

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSong = () => {
    if (newSong.title && newSong.artist) {
      dispatch(addSong(newSong));
      setNewSong({ title: '', artist: '' });
    }
  };

  const handleEditSong = (song) => {
    setEditMode(song.id);
    setUpdatedSong({ id: song.id, title: song.title, artist: song.artist });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSong((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSong = () => {
    if (updatedSong.title && updatedSong.artist) {
      dispatch(updateSong(updatedSong));
      setEditMode(null); 
      setUpdatedSong({ id: '', title: '', artist: '' }); 
    }
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSong(id));
  };

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p>Error fetching songs: {error}</p>;

  return (
    <div>
      <h2>Song List</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {editMode === song.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={updatedSong.title}
                  onChange={handleUpdateChange}
                />
                <input
                  type="text"
                  name="artist"
                  value={updatedSong.artist}
                  onChange={handleUpdateChange}
                />
                <button onClick={handleUpdateSong}>Save</button>
              </>
            ) : (
              <>
                {song.title} by {song.artist}
                <button onClick={() => handleEditSong(song)}>Edit</button>
                <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Add New Song</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newSong.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={newSong.artist}
        onChange={handleInputChange}
      />
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
};

export default SongList;

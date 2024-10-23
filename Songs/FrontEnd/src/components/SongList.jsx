import './SongsList.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faMusic } from '@fortawesome/free-solid-svg-icons';
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
      <div className="add-new">
        <h3>
          <FontAwesomeIcon icon={faMusic} /> <span className="name-add">Add New Song</span>
        </h3>
        <div className="input-container">
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
          <button onClick={handleAddSong}>
            <FontAwesomeIcon icon={faPlus} /> Add Song
          </button>
        </div>
      </div>

      <h2 className="song-head">List of your songs ..</h2>

      <ul>
        {songs
          .slice() // Create a shallow copy to avoid mutating the original array
          .reverse() // Reverse the order of the array to show the most recent song first
          .map((song) => (
            <li key={song.id}>
              <div className="song-container">
                <div className="icon-title">
                  <FontAwesomeIcon icon={faMusic} className="song-icon" />
                  {editMode === song.id ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        name="title"
                        value={updatedSong.title}
                        onChange={handleUpdateChange}
                        placeholder="Title"
                        className="edit-input"
                      />
                      <input
                        type="text"
                        name="artist"
                        value={updatedSong.artist}
                        onChange={handleUpdateChange}
                        placeholder="Artist"
                        className="edit-input"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="song-title">{song.title}</div>
                      <div className="song-artist">by {song.artist}</div>
                    </div>
                  )}
                </div>
                <div className="button-container">
                  {editMode === song.id ? (
                    <button onClick={handleUpdateSong}>Save</button>
                  ) : (
                    <>
                      <button className="edit" onClick={() => handleEditSong(song)}>
                        <FontAwesomeIcon icon={faEdit} /> <span>Edit</span>
                      </button>
                      <button className="delete" onClick={() => handleDeleteSong(song.id)}>
                        <FontAwesomeIcon icon={faTrash} /> <span>Delete</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SongList;

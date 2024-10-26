// src/App.jsx
import './App.css';
import React from 'react';
import SongList from './components/SongList';

const App = () => {
    return (
        <div className='name'>
            <span className='name-song'>Song</span><span className='name-managment'> Management</span>
            <SongList />
        </div>
    );
};

export default App;

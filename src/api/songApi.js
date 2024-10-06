// src/api/songApi.js
export const fetchSongsApi = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your actual API endpoint
    if (!response.ok) {
        throw new Error('Failed to fetch songs');
    }
    return response.json();
};

export const addSongApi = async (song) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
    });
    if (!response.ok) {
        throw new Error('Failed to add song');
    }
    return response.json();
};

export const updateSongApi = async (song) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${song.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(song),
    });
    if (!response.ok) {
        throw new Error('Failed to update song');
    }
    return response.json();
};

export const deleteSongApi = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete song');
    }
};
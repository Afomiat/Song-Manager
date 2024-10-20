export const fetchSongsApi = async () => {
    const response = await fetch('http://localhost:8080/songs');
    if (!response.ok) {
        const errorData = await response.text(); // Get the response body as text
        console.error('Fetch error:', errorData); // Log the error
        throw new Error(`Failed to fetch songs: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
};

// Similar error logging can be added to addSongApi, updateSongApi, and deleteSongApi


export const addSongApi = async (song) => {
    const response = await fetch('http://localhost:8080/songs', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song),
    });
    if (!response.ok) {
        throw new Error('Failed to add song');
    }
    return response.json();
};


export const updateSongApi = async (song) => {
    const response = await fetch(`http://localhost:8080/songs/${song.id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song),
    });
    if (!response.ok) {
        throw new Error('Failed to update song');
    }
    return response.json();
};


export const deleteSongApi = async (id) => {
    const response = await fetch(`http://localhost:8080/songs/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete song');
    }
};

const BASE_URL = 'http://localhost:8080/songs';

export const fetchSongsApi = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        const errorData = await response.text();
        console.error('Fetch error:', errorData);
        throw new Error(`Failed to fetch songs: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
};

export const addSongApi = async (song) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song),
    });
    if (!response.ok) {
        const errorData = await response.text();
        console.error('Add song error:', errorData);
        throw new Error('Failed to add song');
    }
    return response.json();
};

export const updateSongApi = async (song) => {
    const response = await fetch(`${BASE_URL}/${song.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song),
    });
    if (!response.ok) {
        const errorData = await response.text();
        console.error('Update song error:', errorData);
        throw new Error('Failed to update song');
    }
    return response.json();
};

export const deleteSongApi = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.text();
        console.error('Delete song error:', errorData);
        throw new Error('Failed to delete song');
    }
};

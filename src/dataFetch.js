const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);

    if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
    }

    const data = await response.json();
    return data.results;
};

export const fetchMovieById = async (id) => {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);

    if (!response.ok) {
        throw new Error('Failed to fetch movie by ID');
    }

    return await response.json();
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error('Failed to search movies');
    }

    const data = await response.json();
    return data.results;
};


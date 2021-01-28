import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});
// API.defaults.withCredentials = true;


export const fetchMovies = () => API.get('/movies');
export const searchMovies = (search) => API.post('/movies/search', {search});
export const genreSearchMovies = (genre,search) => API.post('/movies/genreSearch', {genre, search});
export const genreOnlyMovies = (genre) => API.post('/movies/genre', {genre});
export const addMovie = (newMovie) => API.post('/movies',newMovie);
export const updateMovie = (id, updatedMovie) => API.patch(`/movies/${id}`, updatedMovie);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
export const likeMovie = (id) => API.patch(`/movies/${id}/likeMovie`);


export const signin = (formData) => API.post('/users/signin',formData);
export const signup = (formData) => API.post('/users/signup',formData);
export const recommend = (id) => API.post('/movies/recommend',id);
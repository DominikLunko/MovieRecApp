import {FETCH_ALL, LIKE, UPDATE, ADD, DELETE} from '../constants/actionTypes';
import * as api from '../api';

export const getMovies = () => async (dispatch) =>{

    try {
        const { data } = await api.fetchMovies();
        dispatch({type:FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error.message);
    }
    
}
export const searchMovies = (search) => async (dispatch) =>{
    console.log('asd');
    try {
        
        const { data } = await api.searchMovies(search);

        dispatch({type:FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error.message);
    }
    
}
export const genreOnlyMovies = (genre) => async (dispatch) =>{
    console.log('asd');
    try {
        
        const { data } = await api.genreOnlyMovies(genre);

        dispatch({type:FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error.message);
    }
    
}

export const genreSearchMovies = (genre, search) => async (dispatch) =>{
    console.log('asd');
    try {
        
        const { data } = await api.genreSearchMovies(genre, search);

        dispatch({type:FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error.message);
    }
    
}



export const addMovie = (movie) => async (dispatch) => {
    try {
        const { data } = await api.addMovie(movie);

        dispatch({ type: ADD, payload: data});

    } catch (error) {
        console.log(error);
    }
}

export const updateMovie = (id, movie ) => async (dispatch) => {
    try {
        const { data } = await api.updateMovie(id, movie);

        dispatch({type:UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}


export const deleteMovie = (id) => async (dispatch) => {
    try {
        await api.deleteMovie(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likeMovie = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeMovie(id);

        dispatch({type: LIKE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const recommend = (id) => async (dispatch) => {
    try {
        
        const { data } = await api.recommend({ id });

        dispatch({type:FETCH_ALL, payload: data});

    } catch (error) {
        console.log(error.message);
    }
}


import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, updateMovie } from '../../actions/movies';





const Form = ({currentId, setCurrentId }) =>{
   const [movieData, setMovieData] =useState({ title: '', movieYear: '', director: '', genre: '', runtime: '', actors: '', selectedFile: ''});
   const movie = useSelector((state)=> currentId ? state.movies.find((m) => m._id === currentId) : null );
   const classes = useStyles();
   const dispatch = useDispatch();
   const user = JSON.parse(localStorage.getItem('profile'));

   useEffect(() => {
      if(movie) setMovieData(movie);
   }, [movie])


    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId){
           dispatch(updateMovie(currentId, movieData));
        } else{
            dispatch(addMovie(movieData));
        }
        clear();

    }

    const clear = () => {
      setCurrentId(null);
      setMovieData({ title: '', movieYear: '', director: '', genre: '', runtime: '', actors: '', selectedFile: ''});
    };

    if(!user){
       return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
               Please Sign in to like movies and get recommanded movies.
            </Typography>
          </Paper>
       )
    }
    
    if(user?.result?.role === 'admin') {
      return(
         <Paper className={classes.paper}>
             <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
             <Typography variant="h6" className={classes.typog}>{currentId ? 'Editing' : 'Add'} a Movie</Typography>
             <TextField
                 name="title" 
                 variant ="outlined" 
                 label="Title" 
                 fullWidth 
                 value={movieData.title}
                 onChange={(e) => setMovieData({ ...movieData, title: e.target.value})}
              />
              <TextField
                 name="movieYear" 
                 variant ="outlined" 
                 label="Movie year" 
                 fullWidth 
                 value={movieData.movieYear}
                 onChange={(e) => setMovieData({ ...movieData, movieYear: e.target.value})}
              />
              <TextField
                 name="director" 
                 variant ="outlined" 
                 label="Director" 
                 fullWidth 
                 value={movieData.director}
                 onChange={(e) => setMovieData({ ...movieData, director: e.target.value})}
              />
              <TextField
                 name="genre" 
                 variant ="outlined" 
                 label="Genre" 
                 fullWidth 
                 value={movieData.genre}
                 onChange={(e) => setMovieData({ ...movieData, genre: e.target.value})}
              />
              <TextField
                 name="runtime" 
                 variant ="outlined" 
                 label="Runtime" 
                 fullWidth 
                 value={movieData.runtime}
                 onChange={(e) => setMovieData({ ...movieData, runtime: e.target.value})}
              />
              <TextField
                 name="actors" 
                 variant ="outlined" 
                 label="Actors" 
                 fullWidth 
                 value={movieData.actors}
                 onChange={(e) => setMovieData({ ...movieData, actors: e.target.value.split(',')})}
              />
              <div className={classes.fileInput}>
                 <FileBase type="file" multiple={false} onDone = {({base64}) => setMovieData({ ...movieData, selectedFile: base64})} />
              </div>
              <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
              <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
             </form>
         </Paper>
     );
    } else{
      return (
         <Paper className={classes.paper}>
         <Typography variant="h6" align="center">
            Feel free to like a movie, so we can make recommendation :)
         </Typography>
         </Paper>
      );
    }
       
    
    
}
export default Form;
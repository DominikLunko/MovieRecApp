import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core'


import Movie from './Movie/Movie';
import useStyles from './styles';


const Movies = ({ setCurrentId }) =>{
    const movies = useSelector((state) => state.movies);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    

    return(
        !movies?.length ? <CircularProgress /> :  (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {movies.map((movie) =>(
                    <Grid key={movie._id} item xs={12} sm={6}>
                        <Movie movie={movie} setCurrentId={setCurrentId} />
                    </Grid>
                ))}

            </Grid>
        ) 
        
    );
}
export default Movies;
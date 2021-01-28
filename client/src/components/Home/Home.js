import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useStyles from './styles';

import { getMovies, searchMovies, genreSearchMovies, genreOnlyMovies } from '../../actions/movies';
import Movies from '../Movies/Movies';
import Form from '../Form/Form';

const Home = ({isRec}) => {

    const [currentId, setCurrentId]=useState(null);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');
    const classes = useStyles();
    const dispatch = useDispatch();
    
    
  
    useEffect(() => {
     
      if(search.length === 0 && genre.length === 0){
        dispatch(getMovies());
      }else if(!(search.length === 0) && genre.length === 0){
        
        dispatch(searchMovies(search));
      }
      else if(search.length === 0 && !(genre.length === 0)){
        
        dispatch(genreOnlyMovies(genre));
      }
      else{
        dispatch(genreSearchMovies(genre, search));
        
      }
    },[dispatch,search,genre]);

 
    
    const clear = () => {
      setGenre('');
      setSearch('');
      
    }

    return (
        
        <Grow in>
              <Container>
                {!isRec &&(
                <div >
                    <TextField className={classes.myDiv} value = {search} type="text" name="search" placeholder="Search by title..." onChange={(e) => setSearch(e.target.value)} />
                    <TextField className={classes.myDiv} value={genre} type="text" name="searchGenre" placeholder="Search by genre..." onChange={(e) => setGenre(e.target.value)} />
                    <Button variant="contained" color="secondary" size="small" onClick={clear} >Clear</Button>
                </div>
                )}
                <Grid className={classes.mainContainer} container  justify="space-between" alignItems="stretch" spacing={3}>
                  <Grid item xs={12} sm={7}>
                    <Movies setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={12} sm={4} >
                   <Form currentId={currentId} setCurrentId={setCurrentId}/>
                  </Grid>
                </Grid>
              </Container>
            </Grow>
    );
};

export default Home

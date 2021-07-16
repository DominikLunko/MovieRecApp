import React, { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useStyles from "./styles";

import {
  getMovies,
  searchMovies,
  genreSearchMovies,
  genreOnlyMovies,
} from "../../actions/movies";
import Movies from "../Movies/Movies";
import Form from "../Form/Form";
import { likeMovie } from "../../actions/movies";

const Home = ({ isRec }) => {
  const [currentId, setCurrentId] = useState(null);
  //const movies = useSelector((state) => state.movies);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  //const movies = useSelector((state) => state.movies);
  //const movie = movies[0];

  useEffect(() => {
    if (search.length === 0 && genre.length === 0) {
      dispatch(getMovies());
    } else if (!(search.length === 0) && genre.length === 0) {
      dispatch(searchMovies(search));
    } else if (search.length === 0 && !(genre.length === 0)) {
      dispatch(genreOnlyMovies(genre));
    } else {
      dispatch(genreSearchMovies(genre, search));
    }
  }, [dispatch, search, genre]);

  const clear = () => {
    setGenre("");
    setSearch("");
  };

  return (
    <Grow in>
      <Container>
        {!isRec && (
          <div>
            <TextField
              className={classes.myDiv}
              value={search}
              type="text"
              name="search"
              placeholder="Search by title..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <TextField
              className={classes.myDiv}
              value={genre}
              type="text"
              name="searchGenre"
              placeholder="Search by genre..."
              onChange={(e) => setGenre(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
            >
              Clear
            </Button>
            {/* <Button
              size="small"
              color="primary"
              onClick={() => dispatch(likeMovie(movie._id))}
            >
              KLIKNI TU!
            </Button> */}
          </div>
        )}
        <Grid
          className={classes.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Movies setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;

import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, TextField} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deleteMovie, likeMovie } from '../../../actions/movies';

const Movie = ( { movie, setCurrentId } ) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));


    const Likes = () => {
        if(movie.likes.length > 0) {
            return movie.likes.find((like) => like ===(user?.result?._id))
            ? (
                <><ThumbUpAltIcon fontSize = "small"/>&nbsp;{movie.likes.length == 1 ? `You liked movie`: movie.likes.length > 2 ? `You and ${movie.likes.length -1} others likes` : `You and ${movie.likes.length -1} others likes` }</>
            ) : (
                <><ThumbUpAltOutlined fontSize="small"/>&nbsp;{movie.likes.length} {movie.likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return(
        
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={movie.selectedFile} title={movie.title}/>
            <div className={classes.overlay}>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body1">{movie.movieYear}</Typography>
                <Typography variant="body2">{moment(movie.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?._id === movie?.creator) &&(
            <div className={classes.overlay2}>
                <Button style ={{color: 'white'}} size="small" onClick={() => setCurrentId(movie._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">Actors: {movie.actors.map((actor) => `${actor},`)}</Typography>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">Director: {movie.director}</Typography>
            </div>
            <div>
                <Typography className={classes.details} variant="body2" color="textSecondary">Genre: {movie.genre}</Typography>
                <Typography className={classes.details} variant="body2" color="textSecondary">RunTime: {movie.runtime}</Typography>
                <CardActions className={classes.cardActions}> 
                    <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeMovie(movie._id))}>
                        <Likes />
                    </Button>
                    {(user?.result?._id === movie?.creator) &&(
                        <Button size="small" color="primary" onClick={() => dispatch(deleteMovie(movie._id))}>
                            <DeleteIcon fontSize="small"/>
                            Delete
                        </Button>
                    )}
                </CardActions>

            </div>
        </Card>
    );
}
export default Movie;
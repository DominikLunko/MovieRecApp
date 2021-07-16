import React, { useState, useEffect } from 'react';
import { AppBar, Avatar, Button, Typography, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { useHistory, useLocation } from 'react-router-dom';

import logo from '../../images/loveMovies.png';
import { LOGOUT } from '../../constants/actionTypes';
import { recommend, getMovies, isReccomend} from '../../actions/movies';

const Navbar = ({isRec, setIsRec}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isAuthPage, setIsAuthPage] = useState(false);
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation(); 
    const userTok = useSelector((state) => state.auth.authData?.token);
    

    useEffect(() => {
        const token = user?.token;
        console.log(userTok);
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        
    },[location]);


    const refreshPage = () =>{
        setIsRec(false);
        if(!isAuthPage){
            dispatch(getMovies());
        }else{
            history.push('/');
            setIsAuthPage(false);
        }
        
        
      }
    const authPage = () =>{
        setIsAuthPage(true);
        
    }
    const logout = () =>{
        dispatch({type: LOGOUT});
        setIsRec(false);
        dispatch(getMovies());
        history.push('/');
        setIsAuthPage(true);
        setUser(null);
    }


    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            {/* <Typography  variant="h2" align="center">Movies</Typography> */}
            <img className={classes.image} src={logo} alt="movies" height="105"  component={Link} to="/" onClick={() => {
                dispatch(getMovies())
                setIsRec(false)}}/>
            {user?.result && (
                <Button 
                variant="contained"  
                className={classes.purple} 
                onClick={() => {dispatch(recommend(user.result._id))
                setIsRec(true)
                }}
                disabled={isRec}
                >Recommend movies</Button>
            )}
           
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" onClick={logout} className={classes.logout} color="secondary">Logout</Button>
                </div>
            ) : (
                <Button component={ Link } to="/auth" onClick={authPage} variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
        
        </AppBar>
    )
    
}

export default Navbar;

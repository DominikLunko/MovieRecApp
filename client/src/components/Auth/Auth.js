import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Input } from '@material-ui/core';
import useStyles from './styles';
import LockOutlined from '@material-ui/icons/LockOutlined';
import MyInput from './Input';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';
import { useHistory } from "react-router-dom";


const initialState = {firstName: '', lastName:'', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] =useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const[formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(formData, history))
            
        } else {
            dispatch(signin(formData, history))
        }
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };
    const refrest = () =>{
        window.location.reload(false);
    }
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">{ isSignUp ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                        <>
                            <MyInput name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                            <MyInput name="lastName" label="Last Name" handleChange={handleChange} half/>
                        </>
                        )}
                        <MyInput name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <MyInput name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignUp && <MyInput name="confirmPassword" label="Repet password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container justify="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                    { isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                                </Button >
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = ( users = {authData: null }, action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action.data}));
            //console.log(action.data.token);
            //console.log(action.data.result.email);
        
            return {...users, authData:action?.data};
            
        case LOGOUT:
            localStorage.clear();

            return { ...users,authData: null};
        
        default:
            return users;
    }
};

export default authReducer;
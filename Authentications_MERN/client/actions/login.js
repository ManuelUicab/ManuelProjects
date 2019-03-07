import Axios from "axios";
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user) {
    //retorna al reducer auth
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    //llama a la accion setCurrentUser
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export const login = (data) => {

    return dispatch => {
        return Axios.post('/api/auth', data)
            .then(res => {
                const token = res.data.token;
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                //llama a la accion setCurrentUser
                dispatch(setCurrentUser(jwtDecode(token)));
            });
    }
}
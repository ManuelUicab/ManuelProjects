import Axios from "axios";

export const userSignupRequest = (userData) => {
    return dispatch => {
        return Axios.post('/api/users', userData);
    }

}

export const isUserExists = (email) => {
    return dispatch =>{
        return Axios.get(`/api/users/${email}`);
    }
}
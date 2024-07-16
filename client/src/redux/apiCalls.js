import { 
    loginFailure, 
    loginStart, 
    loginSuccess, 
    registerStart, 
    registerSuccess, 
    registerFailure,
    logoutSuccess,
    logoutFailure 
} from "./userRedux";
import { publicRequest } from '../requestMethod'

export const login = async (dispatch, user)=> {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/login", user);
        dispatch(loginSuccess(res.data));

    } catch(err) {
        dispatch(loginFailure());
    }
};


export const register = async (dispatch, user)=> {
    dispatch(registerStart());
    try {
        const res = await publicRequest.post("/register", user);
        dispatch(registerSuccess(res.data));

    } catch(err) {
        dispatch(registerFailure());
    }
};


export const logout = async (dispatch) => {
    try {
        dispatch(logoutSuccess());
    } catch(err) {
        dispatch(logoutFailure());
    }
} 

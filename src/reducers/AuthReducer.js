import { 
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGIN_USERNAME_REQUIRED,
    LOGIN_PASSWORD_REQUIRED
 } from '../values/types';

const INITIAL_STATE = { 
    username: '',
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERNAME_CHANGED:
            return { ...state, username: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.payload, password: '', loading: false };
        case LOGIN_USER:
            return { ...state, loading: true,  error: ''  };
        case LOGIN_USERNAME_REQUIRED:
            return { ...state, error: 'Username is required!', loading: false  };
        case LOGIN_PASSWORD_REQUIRED:
                return { ...state, error: 'Password is required!', loading: false  };
        default:
            return state;
    }
};
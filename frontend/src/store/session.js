import { csrfFetch } from './csrf';

// action consts
const SIGNUP_USER = 'users/signup';
const LOGIN_USER = 'session/login';
const LOGOUT_USER = 'session/logout';

// normal action creators
const setUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
};

// const signupUser = (signupInfo) => {
//     return {
//         type: SIGNUP_USER,
//         signupInfo
//     }
// }

// thunk action creators
export const login = (userCredentials) => async (dispatch) => {
    // expect userCredentials = {credential: 'sth', password: 'sth'}
    const options = {
        method: 'POST',
        body: JSON.stringify(userCredentials)
    };

    // console.log('options', options)
    const response = await csrfFetch('/api/session', options);

    if (response.ok) {
        const user = await response.json();
        // console.log('user', user)
        dispatch(setUser(user));
        return user;
    }
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');

    if (response.ok) {
        const user = await response.json();
        // console.log('user', user)
        dispatch(setUser(user));
        return user;
    }
};

export const signup = (signupInfo) => async (dispatch) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(signupInfo)
    };

    const response = await csrfFetch('/api/users', options);

    if (response.ok) {
        const user = await response.json();
        dispatch(setUser(user));
        return user;
    }
}

export const logout = () => {
    return {
        type: LOGOUT_USER
    }
}

const sessionReducer = (state = {user: null}, action) => {
    // console.log(action)
    switch (action.type) {
        case LOGIN_USER: {
            const newState = { user: null };
            const {id, username, email} = action.user;
            if (id) newState.user = { id, username, email };
            return newState;
        }
        case LOGOUT_USER: {
            return { user: null };
        }
        default: return state;
    }
};

export default sessionReducer;

// {
//     user: {
//         id,
//             email,
//             username,
//             createdAt,
//             updatedAt
//     }
// }
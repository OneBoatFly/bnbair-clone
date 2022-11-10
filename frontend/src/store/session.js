import { csrfFetch } from './csrf';

// action consts
const LOGIN_USER = 'session/login';
const LOGOUT_USER = 'session/logout';

// thunk action creators
const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
};

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
        dispatch(loginUser(user));
        return user;
    }
};

export const logout = () => {
    return {
        type: LOGOUT_USER
    }
}

const sessionReducer = (state = {user: null}, action) => {
    // console.log(action)
    switch (action.type) {
        case LOGIN_USER: {
            const newState = {};
            const {id, username, email} = action.user;
            newState.user = { id, username, email };
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